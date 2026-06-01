/**
 * Duplicate Detection System for Blog Imports
 * Detects duplicates by slug, title, content hash, and excerpt similarity
 */

export interface DuplicateResult {
  isDuplicate: boolean
  type: 'slug' | 'title' | 'content' | 'excerpt' | 'none'
  similarity: number // 0-100
  conflictingId?: string | number
  conflictingTitle?: string
  suggestion?: string
}

/**
 * Generates a hash of content for comparison
 */
export function hashContent(content: string): string {
  // Browser-safe non-cryptographic hash (sufficient for similarity detection)
  const input = content.toLowerCase()
  let hash = 5381
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 33) ^ input.charCodeAt(i)
  }
  return (hash >>> 0).toString(16)
}

/**
 * Calculates similarity between two strings (0-100)
 * Uses a simple Levenshtein distance approach
 */
export function calculateSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase()
  const s2 = str2.toLowerCase()

  if (s1 === s2) return 100

  const longer = s1.length > s2.length ? s1 : s2
  const shorter = s1.length > s2.length ? s2 : s1

  if (longer.length === 0) return 100

  const editDistance = getLevenshteinDistance(longer, shorter)
  return Math.round(((longer.length - editDistance) / longer.length) * 100)
}

/**
 * Calculates Levenshtein distance between two strings
 */
function getLevenshteinDistance(s1: string, s2: string): number {
  const costs: number[] = []

  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j
      } else if (j > 0) {
        let newValue = costs[j - 1]
        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1
        }
        costs[j - 1] = lastValue
        lastValue = newValue
      }
    }
    if (i > 0) costs[s2.length] = lastValue
  }

  return costs[s2.length]
}

/**
 * Detects if a post is a duplicate of existing posts
 */
export function detectDuplicate(
  post: {
    slug: string
    title: string
    content: string
    excerpt: string
  },
  existingPosts: Array<{
    id: string | number
    slug: string
    title: string
    content: string
    excerpt: string
  }>,
  options: {
    slugThreshold?: number
    titleThreshold?: number
    contentThreshold?: number
    excerptThreshold?: number
  } = {}
): DuplicateResult {
  const {
    titleThreshold = 85, // Allow 15% difference
    contentThreshold = 90, // Allow 10% difference
    excerptThreshold = 80 // Allow 20% difference
  } = options

  for (const existing of existingPosts) {
    // Exact slug match
    if (post.slug.toLowerCase() === existing.slug.toLowerCase()) {
      return {
        isDuplicate: true,
        type: 'slug',
        similarity: 100,
        conflictingId: existing.id,
        conflictingTitle: existing.title,
        suggestion: `A post with slug "${post.slug}" already exists.`
      }
    }

    // Title similarity
    const titleSimilarity = calculateSimilarity(post.title, existing.title)
    if (titleSimilarity >= titleThreshold) {
      return {
        isDuplicate: true,
        type: 'title',
        similarity: titleSimilarity,
        conflictingId: existing.id,
        conflictingTitle: existing.title,
        suggestion: `Found similar title (${titleSimilarity}% match): "${existing.title}"`
      }
    }

    // Content similarity
    const contentSimilarity = calculateSimilarity(
      hashContent(post.content),
      hashContent(existing.content)
    )
    if (contentSimilarity >= contentThreshold) {
      return {
        isDuplicate: true,
        type: 'content',
        similarity: contentSimilarity,
        conflictingId: existing.id,
        conflictingTitle: existing.title,
        suggestion: `Found similar content (${contentSimilarity}% match) in "${existing.title}"`
      }
    }

    // Excerpt similarity
    const excerptSimilarity = calculateSimilarity(post.excerpt, existing.excerpt)
    if (excerptSimilarity >= excerptThreshold) {
      return {
        isDuplicate: true,
        type: 'excerpt',
        similarity: excerptSimilarity,
        conflictingId: existing.id,
        conflictingTitle: existing.title,
        suggestion: `Found similar excerpt (${excerptSimilarity}% match) in "${existing.title}"`
      }
    }
  }

  return {
    isDuplicate: false,
    type: 'none',
    similarity: 0
  }
}

/**
 * Bulk duplicate detection
 */
export function detectDuplicatesInBatch(
  posts: Array<{
    slug: string
    title: string
    content: string
    excerpt: string
  }>,
  existingPosts: Array<{
    id: string | number
    slug: string
    title: string
    content: string
    excerpt: string
  }>
): Array<DuplicateResult> {
  return posts.map(post => detectDuplicate(post, existingPosts))
}

/**
 * Finds internal duplicates within imported posts
 */
export function findInternalDuplicates(
  posts: Array<{
    slug: string
    title: string
    content: string
    excerpt: string
  }>
): Map<number, DuplicateResult> {
  const internalDuplicates = new Map<number, DuplicateResult>()

  for (let i = 0; i < posts.length; i++) {
    // Add id to remaining posts for compatibility
    const remainingPostsWithIds = posts.slice(i + 1).map((p, idx) => ({
      ...p,
      id: i + idx + 1
    }))
    const result = detectDuplicate(posts[i], remainingPostsWithIds)
    if (result.isDuplicate) {
      internalDuplicates.set(i, result)
    }
  }

  return internalDuplicates
}

const duplicateDetectionUtils = {
  hashContent,
  calculateSimilarity,
  detectDuplicate,
  detectDuplicatesInBatch,
  findInternalDuplicates
}

export default duplicateDetectionUtils
