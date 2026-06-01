/**
 * ZIP Archive Extractor for Blog Imports
 * Safely extracts ZIP files and prevents zip-slip attacks
 *
 * Note: Uses JSZip library (add to package.json)
 * npm install jszip
 */

export interface ExtractedFile {
  name: string
  content: string
  type: 'json' | 'markdown' | 'image' | 'unknown'
}

export interface ExtractionResult {
  success: boolean
  files: ExtractedFile[]
  errors: string[]
  imageCount: number
  postCount: number
}

/**
 * Validates that a path doesn't escape the archive (prevents zip-slip)
 */
export function isValidArchivePath(path: string): boolean {
  // Normalize path
  const normalized = path.replace(/\\/g, '/')

  // Check for path traversal
  if (normalized.includes('../') || normalized.includes('..\\') || normalized.startsWith('/')) {
    return false
  }

  // Check for suspicious patterns
  if (normalized.includes('..')) {
    return false
  }

  return true
}

/**
 * Determines file type from filename
 */
export function getFileType(filename: string): ExtractedFile['type'] {
  const ext = filename.toLowerCase().split('.').pop()

  switch (ext) {
    case 'json':
      return 'json'
    case 'md':
    case 'markdown':
      return 'markdown'
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'webp':
    case 'svg':
      return 'image'
    default:
      return 'unknown'
  }
}

/**
 * Extracts a ZIP file and returns blog posts and assets
 *
 * Expects ZIP structure like:
 * posts.zip
 * ├── post1.md
 * ├── post2.json
 * ├── images/
 * │   ├── exploit.png
 * │   └── dashboard.png
 */
export async function extractZipFile(file: File): Promise<ExtractionResult> {
  const errors: string[] = []
  const files: ExtractedFile[] = []

  try {
    // Dynamically import JSZip
    const JSZip = (await import('jszip')).default

    const zip = new JSZip()
    const loaded = await zip.loadAsync(file)

    // Track supported file types
    let imageCount = 0
    let postCount = 0

    // Iterate through files in ZIP
    for (const [path, fileObj] of Object.entries(loaded.files)) {
      const zipFile = fileObj

      // Skip directories
      if (zipFile.dir) {
        continue
      }

      // Validate path for security
      if (!isValidArchivePath(path)) {
        errors.push(`Security issue: Path traversal detected in "${path}"`)
        continue
      }

      const filename = path.split('/').pop()
      if (!filename) continue

      const fileType = getFileType(filename)

      // Skip unsupported files (except images which might be referenced)
      if (fileType === 'unknown') {
        continue
      }

      try {
        const content = await zipFile.async('string')

        // Validate file size (max 5MB per file)
        if (content.length > 5 * 1024 * 1024) {
          errors.push(`File "${filename}" exceeds max size (5MB)`)
          continue
        }

        if (fileType === 'image') {
          imageCount++
        } else if (fileType === 'json' || fileType === 'markdown') {
          postCount++
        }

        files.push({
          name: filename,
          content,
          type: fileType
        })
      } catch (err) {
        errors.push(`Failed to read file "${filename}": ${err instanceof Error ? err.message : String(err)}`)
      }
    }

    // Validate we found at least one post
    if (postCount === 0) {
      errors.unshift('No blog post files (.json or .md) found in archive')
      return {
        success: false,
        files: [],
        errors,
        imageCount: 0,
        postCount: 0
      }
    }

    return {
      success: true,
      files,
      errors,
      imageCount,
      postCount
    }
  } catch (err) {
    return {
      success: false,
      files: [],
      errors: [`Failed to extract ZIP: ${err instanceof Error ? err.message : String(err)}`],
      imageCount: 0,
      postCount: 0
    }
  }
}

/**
 * Remaps image paths in markdown content
 * Converts local paths to URLs
 */
export function remapImagePaths(
  markdown: string,
  imageFiles: ExtractedFile[],
  baseUploadPath: string = '/uploads/blog'
): { markdown: string; missingImages: string[] } {
  let remapped = markdown
  const missingImages: string[] = []

  // Find all markdown image references
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g
  let match

  while ((match = imageRegex.exec(markdown)) !== null) {
    const imagePath = match[2]

    // Skip URLs (already absolute)
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      continue
    }

    // Extract filename
    const filename = imagePath.split('/').pop()
    if (!filename) continue

    // Find matching file in extraction
    const imageFile = imageFiles.find(f => f.name.endsWith(filename))

    if (imageFile) {
      // Replace path with upload URL
      const newPath = `${baseUploadPath}/${filename}`
      remapped = remapped.replace(imagePath, newPath)
    } else {
      missingImages.push(imagePath)
    }
  }

  return { markdown: remapped, missingImages }
}

/**
 * Validates ZIP file before extraction
 */
export function validateZipFile(file: File): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  // Check file type
  if (file.type !== 'application/zip' && file.type !== 'application/x-zip-compressed') {
    if (!file.name.endsWith('.zip')) {
      errors.push('File must be a ZIP archive (.zip)')
    }
  }

  // Check file size (max 50MB)
  const maxSize = 50 * 1024 * 1024
  if (file.size > maxSize) {
    errors.push(`ZIP file is too large (max 50MB, got ${(file.size / 1024 / 1024).toFixed(2)}MB)`)
  }

  // Check for minimum size (at least 100 bytes)
  if (file.size < 100) {
    errors.push('ZIP file is too small or corrupted')
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

const zipUtils = {
  extractZipFile,
  remapImagePaths,
  validateZipFile,
  isValidArchivePath,
  getFileType
}

export default zipUtils
