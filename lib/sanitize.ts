/**
 * Security Sanitization Utilities for Blog Import System
 * Prevents XSS, script injection, and other malicious content
 */

/**
 * Sanitizes markdown content to prevent XSS attacks
 * - Removes HTML script tags and event handlers
 * - Strips dangerous HTML elements
 * - Validates URLs
 */
export function sanitizeMarkdown(content: string): string {
  let sanitized = content

  // Remove script tags and content
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')

  // Remove event handlers (onclick, onload, etc.)
  sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
  sanitized = sanitized.replace(/on\w+\s*=\s*[^\s>]*/gi, '')

  // Remove iframe tags (except whitelisted sources like Google Drive, YouTube)
  sanitized = sanitized.replace(
    /<iframe(?!.*?(drive\.google\.com|youtube\.com|youtu\.be))[\s\S]*?<\/iframe>/gi,
    ''
  )

  // Remove SVG-based XSS attacks
  sanitized = sanitized.replace(/<svg[\s\S]*?<\/svg>/gi, '')

  // Remove style tags with malicious content
  sanitized = sanitized.replace(/<style[\s\S]*?<\/style>/gi, '')

  // Remove data: URIs and javascript: URIs
  sanitized = sanitized.replace(/(\b(?:href|src|data)\s*=\s*["'])(?:data:|javascript:)/gi, '$1')

  return sanitized
}

/**
 * Validates and sanitizes URLs
 * Returns null if URL is invalid or malicious
 */
export function sanitizeUrl(url: string | undefined): string | undefined {
  if (!url) return undefined

  try {
    // Try to parse as URL
    const urlObj = new URL(url)

    // Whitelist allowed protocols
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      console.warn(`Blocked URL with protocol: ${urlObj.protocol}`)
      return undefined
    }

    return url
  } catch {
    console.warn(`Invalid URL: ${url}`)
    return undefined
  }
}

/**
 * Sanitizes JSON to prevent prototype pollution and injection attacks
 */
export function sanitizeJsonObject(obj: Record<string, unknown>): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {}

  // Dangerous keys that could cause prototype pollution
  const dangerousKeys = ['__proto__', 'constructor', 'prototype']

  for (const [key, value] of Object.entries(obj)) {
    // Skip dangerous keys
    if (dangerousKeys.includes(key)) {
      console.warn(`Blocked dangerous key: ${key}`)
      continue
    }

    // Sanitize based on value type
    if (typeof value === 'string') {
      sanitized[key] = sanitizeMarkdown(value)
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      sanitized[key] = sanitizeJsonObject(value as Record<string, unknown>)
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map(v => (typeof v === 'string' ? sanitizeMarkdown(v) : v))
    } else {
      sanitized[key] = value
    }
  }

  return sanitized
}

/**
 * Validates file MIME type to prevent upload abuse
 */
export function validateMimeType(file: File): boolean {
  const allowedTypes = [
    'application/json',
    'text/markdown',
    'text/plain',
    'application/zip',
    'application/x-zip-compressed',
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif'
  ]

  return allowedTypes.includes(file.type) || file.name.match(/\.(json|md|zip|jpg|jpeg|png|webp|gif)$/i) !== null
}

/**
 * Validates file size to prevent DoS attacks
 */
export function validateFileSize(file: File, maxSizeMB: number = 10): boolean {
  const maxBytes = maxSizeMB * 1024 * 1024
  return file.size <= maxBytes
}

/**
 * Escapes HTML special characters
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, char => map[char])
}

/**
 * Validates CVE format (CVE-YYYY-NNNNN)
 */
export function validateCVE(cve: string | undefined): boolean {
  if (!cve) return true // Optional field
  return /^CVE-\d{4}-\d{4,}$/i.test(cve)
}

/**
 * Validates CVSS score (0-10)
 */
export function validateCVSS(cvss: number | undefined): boolean {
  if (cvss === undefined) return true // Optional field
  return typeof cvss === 'number' && cvss >= 0 && cvss <= 10
}

/**
 * Strips dangerous HTML and keeps only safe markdown-compatible HTML
 */
export function stripDangerousHtml(html: string): string {
  let safe = html

  // Remove all script tags
  safe = safe.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')

  // Remove event handlers
  safe = safe.replace(/\s+on\w+\s*=\s*["'][^"']*["']/gi, '')
  safe = safe.replace(/\s+on\w+\s*=\s*[^\s>]*/gi, '')

  // Remove style tags
  safe = safe.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')

  // Remove iframe, embed, object tags
  safe = safe.replace(/<(iframe|embed|object|link|meta|base)[^>]*>/gi, '')

  // Remove dangerous attributes from remaining tags
  safe = safe.replace(/\s(formaction|onfocus|onblur|onchange|onsubmit|oninput)\s*=/gi, ' ')

  return safe
}

/**
 * Rate limiting helper for import operations
 * Returns true if action is allowed
 */
export const createRateLimiter = (maxRequests: number, windowMs: number) => {
  const requests: number[] = []

  return (): boolean => {
    const now = Date.now()
    // Remove old requests outside the window
    while (requests.length > 0 && requests[0] < now - windowMs) {
      requests.shift()
    }

    if (requests.length >= maxRequests) {
      return false
    }

    requests.push(now)
    return true
  }
}

const sanitizeUtils = {
  sanitizeMarkdown,
  sanitizeUrl,
  sanitizeJsonObject,
  validateMimeType,
  validateFileSize,
  escapeHtml,
  validateCVE,
  validateCVSS,
  stripDangerousHtml,
  createRateLimiter
}

export default sanitizeUtils
