/**
 * Hero Image Handler for Blog Posts
 * Auto-generates fallback images and finds images in markdown
 */

/**
 * Extracts the first image URL from markdown content
 */
export function extractFirstImageFromMarkdown(content: string): string | undefined {
  // Find markdown image syntax: ![alt](url)
  const markdownImageRegex = /!\[.*?\]\((.*?)\)/
  const match = content.match(markdownImageRegex)

  if (match && match[1]) {
    return match[1]
  }

  // Find HTML image tags
  const htmlImageRegex = /<img[^>]+src=["']([^"']+)["']/
  const htmlMatch = content.match(htmlImageRegex)

  if (htmlMatch && htmlMatch[1]) {
    return htmlMatch[1]
  }

  return undefined
}

/**
 * Category-to-color mapping for gradient generation
 */
const categoryColors: Record<string, { from: string; to: string }> = {
  'Web Security': { from: '#FF6B6B', to: '#FF8C42' },
  'Access Control': { from: '#4ECDC4', to: '#44AF69' },
  'API Security': { from: '#6C5CE7', to: '#A29BFE' },
  'Authentication': { from: '#FF9FF3', to: '#FF6B9D' },
  'Encryption': { from: '#74B9FF', to: '#0984E3' },
  'News': { from: '#FDCB6E', to: '#E17055' },
  'Story': { from: '#55EFC4', to: '#0ABDE3' }
}

/**
 * Gets colors for a category
 */
function getCategoryColors(category: string): { from: string; to: string } {
  return categoryColors[category] || categoryColors['Web Security']
}

/**
 * Generates a gradient banner SVG as a data URL
 */
export function generateGradientBanner(
  category: string,
  title: string,
  width: number = 1200,
  height: number = 630
): string {
  const colors = getCategoryColors(category)

  // Escape special characters for SVG
  const safeTitle = title
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

  // Truncate title if too long
  const truncatedTitle = safeTitle.length > 50 ? safeTitle.substring(0, 47) + '...' : safeTitle

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colors.from};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${colors.to};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#grad)"/>
      <text
        x="50%"
        y="50%"
        font-family="system-ui, -apple-system, sans-serif"
        font-size="56"
        font-weight="bold"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="white"
        text-shadow="2px 2px 4px rgba(0,0,0,0.3)"
        word-wrap="break-word"
      >
        ${truncatedTitle}
      </text>
      <text
        x="50%"
        y="${height - 60}"
        font-family="system-ui, -apple-system, sans-serif"
        font-size="18"
        text-anchor="middle"
        fill="rgba(255,255,255,0.8)"
      >
        ${category}
      </text>
    </svg>
  `

  const encoded = typeof window !== 'undefined'
    ? window.btoa(unescape(encodeURIComponent(svg)))
    : Buffer.from(svg).toString('base64')
  return `data:image/svg+xml;base64,${encoded}`
}

/**
 * Determines the best hero image for a post
 */
export function determineBestHeroImage(options: {
  heroImage?: string
  markdownContent?: string
  category?: string
  title?: string
}): string {
  const { heroImage, markdownContent, category = 'Web Security', title = 'Blog Post' } = options

  // Use provided hero image if valid
  if (heroImage && isValidImageUrl(heroImage)) {
    return heroImage
  }

  // Try to find image in markdown
  if (markdownContent) {
    const markdownImage = extractFirstImageFromMarkdown(markdownContent)
    if (markdownImage && isValidImageUrl(markdownImage)) {
      return markdownImage
    }
  }

  // Generate gradient banner as fallback
  return generateGradientBanner(category, title)
}

/**
 * Validates if a URL is a proper image URL
 */
function isValidImageUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    const protocol = urlObj.protocol.toLowerCase()

    // Allow http, https, and data URLs
    if (!['http:', 'https:', 'data:'].includes(protocol)) {
      return false
    }

    // Check for image extensions
    if (!url.match(/data:image|\.(?:jpg|jpeg|png|webp|gif|svg)$/i)) {
      return false
    }

    return true
  } catch {
    return false
  }
}

/**
 * Generates SEO-friendly OG image (defaults to hero image)
 */
export function generateOgImage(heroImage: string): string {
  return heroImage // OG image is same as hero image
}

/**
 * Gets a responsive image configuration
 */
export function getImageConfig(
  imageUrl: string
): {
  src: string
  alt: string
  width: number
  height: number
  aspectRatio: string
} {
  return {
    src: imageUrl,
    alt: 'Blog post hero image',
    width: 1200,
    height: 630,
    aspectRatio: '16 / 9'
  }
}

const heroImageUtils = {
  extractFirstImageFromMarkdown,
  generateGradientBanner,
  determineBestHeroImage,
  generateOgImage,
  getImageConfig
}

export default heroImageUtils
