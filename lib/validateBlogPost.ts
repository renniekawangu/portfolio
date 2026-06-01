/**
 * Blog Post Validation Utilities
 * Comprehensive schema validation and field checking
 */

import { BlogPost } from '@/app/blog/data'
import { sanitizeUrl, validateCVE, validateCVSS } from './sanitize'

export interface ValidationError {
  field: string
  message: string
  severity: 'error' | 'warning'
}

export interface ValidationResult {
  valid: boolean
  errors: ValidationError[]
  warnings: ValidationError[]
}

/**
 * Validates a complete blog post object
 */
export function validateBlogPost(post: Partial<BlogPost>): ValidationResult {
  const errors: ValidationError[] = []
  const warnings: ValidationError[] = []

  // Required fields
  if (!post.title || post.title.trim().length === 0) {
    errors.push({
      field: 'title',
      message: 'Title is required and cannot be empty',
      severity: 'error'
    })
  } else if (post.title.length > 200) {
    warnings.push({
      field: 'title',
      message: 'Title is longer than recommended (max 200 characters)',
      severity: 'warning'
    })
  }

  if (!post.slug || post.slug.trim().length === 0) {
    errors.push({
      field: 'slug',
      message: 'Slug is required and cannot be empty',
      severity: 'error'
    })
  } else if (!isValidSlug(post.slug)) {
    errors.push({
      field: 'slug',
      message: 'Slug must be lowercase with hyphens only (no spaces or special characters)',
      severity: 'error'
    })
  }

  if (!post.excerpt || post.excerpt.trim().length === 0) {
    errors.push({
      field: 'excerpt',
      message: 'Excerpt is required and cannot be empty',
      severity: 'error'
    })
  } else if (post.excerpt.length < 20) {
    warnings.push({
      field: 'excerpt',
      message: 'Excerpt is too short (minimum 20 characters)',
      severity: 'warning'
    })
  } else if (post.excerpt.length > 160) {
    warnings.push({
      field: 'excerpt',
      message: 'Excerpt is longer than recommended (max 160 characters)',
      severity: 'warning'
    })
  }

  if (!post.content || post.content.trim().length === 0) {
    errors.push({
      field: 'content',
      message: 'Content is required and cannot be empty',
      severity: 'error'
    })
  } else if (post.content.length < 100) {
    warnings.push({
      field: 'content',
      message: 'Content is very short (less than 100 characters)',
      severity: 'warning'
    })
  }

  // Date validation
  if (post.date) {
    if (!isValidDate(post.date)) {
      errors.push({
        field: 'date',
        message: 'Invalid date format. Use YYYY-MM-DD',
        severity: 'error'
      })
    } else if (new Date(post.date) > new Date()) {
      warnings.push({
        field: 'date',
        message: 'Date is in the future',
        severity: 'warning'
      })
    }
  }

  // Status validation
  if (post.status && !['draft', 'scheduled', 'published', 'archived'].includes(post.status)) {
    errors.push({
      field: 'status',
      message: 'Invalid status. Must be: draft, scheduled, published, or archived',
      severity: 'error'
    })
  }

  // Type validation
  if (post.type && !['writeup', 'news', 'story'].includes(post.type)) {
    errors.push({
      field: 'type',
      message: 'Invalid type. Must be: writeup, news, or story',
      severity: 'error'
    })
  }

  // Category validation
  if (post.category) {
    const validCategories = [
      'Web Security',
      'Access Control',
      'API Security',
      'Authentication',
      'Encryption',
      'News',
      'Story'
    ]
    if (!validCategories.includes(post.category)) {
      warnings.push({
        field: 'category',
        message: `Category "${post.category}" is not standard. Common categories: ${validCategories.join(', ')}`,
        severity: 'warning'
      })
    }
  }

  // Tags validation
  if (post.tags) {
    if (!Array.isArray(post.tags)) {
      errors.push({
        field: 'tags',
        message: 'Tags must be an array',
        severity: 'error'
      })
    } else if (post.tags.length > 10) {
      warnings.push({
        field: 'tags',
        message: 'Too many tags (max 10 recommended)',
        severity: 'warning'
      })
    } else if (post.tags.some(tag => typeof tag !== 'string' || tag.length === 0)) {
      errors.push({
        field: 'tags',
        message: 'Tags must be non-empty strings',
        severity: 'error'
      })
    }
  }

  // Difficulty validation (for writeups)
  if (post.type === 'writeup' && post.difficulty) {
    if (!['Low', 'Medium', 'High', 'Critical'].includes(post.difficulty)) {
      errors.push({
        field: 'difficulty',
        message: 'Invalid difficulty. Must be: Low, Medium, High, or Critical',
        severity: 'error'
      })
    }
  }

  // Bounty validation
  if (post.bountyAmount !== undefined) {
    if (typeof post.bountyAmount !== 'number' || post.bountyAmount < 0) {
      errors.push({
        field: 'bountyAmount',
        message: 'Bounty amount must be a non-negative number',
        severity: 'error'
      })
    }
  }

  // URL validations
  if (post.pocVideoUrl && !sanitizeUrl(post.pocVideoUrl)) {
    errors.push({
      field: 'pocVideoUrl',
      message: 'Invalid POC video URL',
      severity: 'error'
    })
  }

  if (post.reportUrl && !sanitizeUrl(post.reportUrl)) {
    errors.push({
      field: 'reportUrl',
      message: 'Invalid report URL',
      severity: 'error'
    })
  }

  if (post.canonicalUrl && !sanitizeUrl(post.canonicalUrl)) {
    errors.push({
      field: 'canonicalUrl',
      message: 'Invalid canonical URL',
      severity: 'error'
    })
  }

  if (post.ogImage && !sanitizeUrl(post.ogImage)) {
    errors.push({
      field: 'ogImage',
      message: 'Invalid OG image URL',
      severity: 'error'
    })
  }

  if (post.heroImage && !sanitizeUrl(post.heroImage)) {
    errors.push({
      field: 'heroImage',
      message: 'Invalid hero image URL',
      severity: 'error'
    })
  }

  // SEO validation
  if (post.seoTitle && post.seoTitle.length > 60) {
    warnings.push({
      field: 'seoTitle',
      message: 'SEO title is too long (max 60 characters for best results)',
      severity: 'warning'
    })
  }

  if (post.seoDescription && post.seoDescription.length > 160) {
    warnings.push({
      field: 'seoDescription',
      message: 'SEO description is too long (max 160 characters for best results)',
      severity: 'warning'
    })
  }

  // Security research metadata validation
  if (post.cve && !validateCVE(post.cve)) {
    errors.push({
      field: 'cve',
      message: 'Invalid CVE format. Use format: CVE-YYYY-NNNNN',
      severity: 'error'
    })
  }

  if (post.cvss !== undefined && !validateCVSS(post.cvss)) {
    errors.push({
      field: 'cvss',
      message: 'CVSS score must be a number between 0 and 10',
      severity: 'error'
    })
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  }
}

/**
 * Validates slug format
 */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
}

/**
 * Validates date format (YYYY-MM-DD)
 */
export function isValidDate(dateStr: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return false
  }

  const date = new Date(dateStr)
  return date instanceof Date && !isNaN(date.getTime())
}

/**
 * Sanitizes SEO fields
 */
export function sanitizeSeoPaths(seoData: {
  seoTitle?: string
  seoDescription?: string
}): {
  seoTitle?: string
  seoDescription?: string
} {
  const sanitized: {
    seoTitle?: string
    seoDescription?: string
  } = {}

  if (seoData.seoTitle) {
    sanitized.seoTitle = seoData.seoTitle.substring(0, 60).trim()
  }

  if (seoData.seoDescription) {
    sanitized.seoDescription = seoData.seoDescription.substring(0, 160).trim()
  }

  return sanitized
}

const validationUtils = {
  validateBlogPost,
  isValidSlug,
  isValidDate,
  sanitizeSeoPaths
}

export default validationUtils
