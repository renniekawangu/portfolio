/**
 * YAML Frontmatter Parser for Blog Posts
 * Supports arrays, nested metadata, and backward compatibility with comma-separated values
 */

interface ParsedFrontmatter {
  metadata: Record<string, unknown>
  content: string
  errors: string[]
}

/**
 * Parses YAML-style frontmatter from markdown
 * Supports arrays and nested structures
 *
 * Example:
 * ---
 * title: My Post
 * tags:
 *   - Security
 *   - API
 * ---
 * # Content
 */
export function parseFrontmatter(text: string): ParsedFrontmatter {
  const errors: string[] = []

  // Check for frontmatter markers
  if (!text.startsWith('---')) {
    return {
      metadata: {},
      content: text,
      errors
    }
  }

  // Find closing marker
  const endMarker = text.indexOf('\n---', 4)
  if (endMarker === -1) {
    return {
      metadata: {},
      content: text,
      errors: ['No closing --- marker found for frontmatter']
    }
  }

  const frontmatterText = text.substring(4, endMarker).trim()
  const content = text.substring(endMarker + 5).trim()

  const metadata = parseYamlBlock(frontmatterText, errors)

  return {
    metadata,
    content,
    errors
  }
}

/**
 * Parses YAML-style key-value pairs
 * Supports:
 * - Simple values: key: value
 * - Quoted strings: key: "value with spaces"
 * - Numbers: count: 42
 * - Booleans: active: true
 * - Arrays: tags: [item1, item2] or tags:\n  - item1\n  - item2
 * - Nested objects (basic support)
 */
function parseYamlBlock(text: string, errors: string[]): Record<string, unknown> {
  const metadata: Record<string, unknown> = {}
  const lines = text.split('\n')

  let currentKey = ''
  let currentArray: string[] = []
  let isInArray = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    if (!trimmed || trimmed.startsWith('#')) {
      continue
    }

    // Detect indentation-based array items
    if (isInArray && line.startsWith('  ') && trimmed.startsWith('-')) {
      const value = trimmed.substring(1).trim()
      currentArray.push(unquoteString(value))
      continue
    }

    // End of array
    if (isInArray && !line.startsWith('  ')) {
      metadata[currentKey] = currentArray
      isInArray = false
      currentArray = []
    }

    // Key-value pair
    if (line.includes(':') && !line.trim().startsWith('-')) {
      const colonIndex = line.indexOf(':')
      const key = line.substring(0, colonIndex).trim()
      const valueStr = line.substring(colonIndex + 1).trim()

      if (!key) continue

      currentKey = key

      // Inline array: tags: [item1, item2]
      if (valueStr.startsWith('[') && valueStr.endsWith(']')) {
        const arrayContent = valueStr.substring(1, valueStr.length - 1)
        const items = arrayContent.split(',').map(item => unquoteString(item.trim()))
        metadata[key] = items
        isInArray = false
        continue
      }

      // Start of indented array
      if (valueStr === '' || valueStr === '-') {
        currentArray = []
        if (valueStr === '-') {
          currentArray.push('')
        }
        isInArray = true
        continue
      }

      // Regular value
      metadata[key] = parseValue(unquoteString(valueStr))
      isInArray = false
      continue
    }

    // Record malformed lines for diagnostics
    if (!trimmed.startsWith('-')) {
      errors.push(`Malformed frontmatter line: ${trimmed}`)
    }
  }

  // Handle case where file ends with array
  if (isInArray && currentArray.length > 0) {
    metadata[currentKey] = currentArray
  }

  return metadata
}

/**
 * Removes quotes from strings and handles escape sequences
 */
function unquoteString(str: string): string {
  if (!str) return str

  // Remove outer quotes
  if ((str.startsWith('"') && str.endsWith('"')) || (str.startsWith("'") && str.endsWith("'"))) {
    str = str.substring(1, str.length - 1)
  }

  // Handle common escape sequences
  str = str.replace(/\\n/g, '\n')
  str = str.replace(/\\t/g, '\t')
  str = str.replace(/\\"/g, '"')
  str = str.replace(/\\'/g, "'")
  str = str.replace(/\\\\/g, '\\')

  return str
}

/**
 * Parses YAML values to appropriate types
 */
function parseValue(value: string): unknown {
  if (!value) return value

  const lower = value.toLowerCase()

  // Booleans
  if (lower === 'true') return true
  if (lower === 'false') return false

  // Null
  if (lower === 'null' || lower === 'nil' || lower === '~') return null

  // Numbers
  if (/^-?\d+(\.\d+)?$/.test(value)) {
    return parseFloat(value)
  }

  // Strings
  return value
}

/**
 * Converts frontmatter metadata to BlogPost fields
 * Handles backward compatibility with comma-separated tags
 */
export function extractBlogMetadata(metadata: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(metadata)) {
    // Handle tags - convert comma-separated string to array
    if (key === 'tags' && typeof value === 'string') {
      result[key] = value.split(',').map(tag => tag.trim())
      continue
    }

    // Handle numeric fields
    if ((key === 'bountyAmount' || key === 'cvss') && typeof value === 'string') {
      const num = parseFloat(value as string)
      result[key] = isNaN(num) ? value : num
      continue
    }

    // Keep other values as-is
    result[key] = value
  }

  return result
}

/**
 * Validates that required frontmatter fields are present
 */
export function validateFrontmatterFields(metadata: Record<string, unknown>): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (!metadata.title) errors.push('Missing required field: title')
  if (!metadata.slug) errors.push('Missing required field: slug')

  return {
    valid: errors.length === 0,
    errors
  }
}

const yamlUtils = {
  parseFrontmatter,
  extractBlogMetadata,
  validateFrontmatterFields
}

export default yamlUtils
