'use client'

import { useState } from 'react'
import { BlogPost } from '../../blog/data'
import BlogImportPreview from './BlogImportPreview'
import BlogImportSummary, { ImportSummaryData } from './BlogImportSummary'
import { parseFrontmatter, extractBlogMetadata } from '@/lib/parseYaml'
import { calculateReadTime, getReadTime } from '@/lib/calculateReadTime'
import { validateBlogPost } from '@/lib/validateBlogPost'
import { sanitizeJsonObject, sanitizeMarkdown, sanitizeUrl, validateFileSize, validateMimeType, createRateLimiter } from '@/lib/sanitize'
import { detectDuplicate } from '@/lib/detectDuplicates'
import { determineBestHeroImage } from '@/lib/heroImageHandler'
import { extractZipFile, validateZipFile } from '@/lib/zipExtractor'
import { recordImport } from '@/lib/importAnalytics'

interface BlogImporterProps {
  onImport: (posts: BlogPost[]) => void
  onCancel: () => void
  existingPosts?: BlogPost[]
}

const rateLimitImport = createRateLimiter(8, 60_000)

export default function BlogImporter({ onImport, onCancel, existingPosts = [] }: BlogImporterProps) {
  const [error, setError] = useState<string>('')
  const [warnings, setWarnings] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [previewPosts, setPreviewPosts] = useState<Partial<BlogPost>[]>([])
  const [duplicates, setDuplicates] = useState<Map<number, { similarity: number; conflictingTitle?: string }>>(new Map())
  const [summary, setSummary] = useState<ImportSummaryData | null>(null)
  const [stage, setStage] = useState<'upload' | 'preview' | 'summary'>('upload')

  const parseJsonFile = (content: string): Partial<BlogPost> => {
    try {
      const parsed = JSON.parse(content) as Record<string, unknown>
      const data = sanitizeJsonObject(parsed) as Record<string, unknown>

      if (!data.title || !data.slug || !data.excerpt || !data.content || typeof data.content !== 'string') {
        throw new Error('Missing required fields: title, slug, excerpt, content')
      }

      return {
        id: (data.id as string | number) || Date.now(),
        slug: String(data.slug),
        title: String(data.title),
        excerpt: String(data.excerpt),
        date: (data.date as string) || new Date().toISOString().split('T')[0],
        category: (data.category as string) || 'Web Security',
        content: sanitizeMarkdown(String(data.content)),
        readTime: getReadTime(String(data.content), data.readTime as string | undefined),
        type: ((data.type as BlogPost['type']) || 'writeup'),
        status: (data.status as BlogPost['status']) || 'draft',
        publishedAt: data.publishedAt as string | undefined,
        createdAt: (data.createdAt as string) || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        author: (data.author as string) || 'Site Owner',
        authorAvatar: sanitizeUrl(data.authorAvatar as string | undefined),
        authorRole: data.authorRole as string | undefined,
        seoTitle: (data.seoTitle as string) || String(data.title).substring(0, 60),
        seoDescription: ((data.seoDescription as string) || String(data.excerpt)).substring(0, 160),
        canonicalUrl: sanitizeUrl(data.canonicalUrl as string | undefined),
        ogImage: sanitizeUrl(data.ogImage as string | undefined),
        pocVideoUrl: sanitizeUrl(data.pocVideoUrl as string | undefined),
        reportUrl: sanitizeUrl(data.reportUrl as string | undefined),
        tags: Array.isArray(data.tags) ? (data.tags as string[]) : undefined,
        difficulty: data.difficulty as BlogPost['difficulty'] | undefined,
        bountyAmount: typeof data.bountyAmount === 'number' ? data.bountyAmount : undefined,
        cve: data.cve as string | undefined,
        cwe: data.cwe as string | undefined,
        cvss: typeof data.cvss === 'number' ? data.cvss : undefined,
        affectedProduct: data.affectedProduct as string | undefined,
        vendor: data.vendor as string | undefined,
        heroImage: determineBestHeroImage({
          heroImage: sanitizeUrl(data.heroImage as string | undefined),
          markdownContent: String(data.content),
          category: (data.category as string) || 'Web Security',
          title: String(data.title)
        })
      }
    } catch (err) {
      throw new Error(`Invalid JSON format: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  const parseMarkdownFile = (content: string, filename: string): Partial<BlogPost> => {
    const { metadata, content: markdownBody } = parseFrontmatter(content)
    const meta = extractBlogMetadata(metadata)
    const sanitizedContent = sanitizeMarkdown(markdownBody)

    const slug = (meta.slug as string) || filename.replace(/\.md$/, '').toLowerCase().replace(/\s+/g, '-')
    const title = (meta.title as string) || filename.replace(/\.md$/, '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

    const excerptMatch = sanitizedContent.match(/^[^#\n][\s\S]*?(?=\n\n|\n#|$)/)
    const excerpt = (meta.excerpt as string) || (excerptMatch ? excerptMatch[0].substring(0, 160).trim() : title)

    return {
      id: (meta.id as string | number) || Date.now(),
      slug,
      title,
      excerpt,
      date: (meta.date as string) || new Date().toISOString().split('T')[0],
      category: (meta.category as string) || 'Web Security',
      content: sanitizedContent,
      readTime: getReadTime(sanitizedContent, meta.readTime as string | undefined),
      type: ((meta.type as BlogPost['type']) || 'writeup'),
      status: (meta.status as BlogPost['status']) || 'draft',
      publishedAt: meta.publishedAt as string | undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: (meta.author as string) || 'Site Owner',
      authorAvatar: sanitizeUrl(meta.authorAvatar as string | undefined),
      authorRole: meta.authorRole as string | undefined,
      tags: Array.isArray(meta.tags) ? (meta.tags as string[]) : undefined,
      difficulty: meta.difficulty as BlogPost['difficulty'] | undefined,
      bountyAmount: typeof meta.bountyAmount === 'number' ? meta.bountyAmount : undefined,
      cve: meta.cve as string | undefined,
      cwe: meta.cwe as string | undefined,
      cvss: typeof meta.cvss === 'number' ? meta.cvss : undefined,
      affectedProduct: meta.affectedProduct as string | undefined,
      vendor: meta.vendor as string | undefined,
      seoTitle: ((meta.seoTitle as string) || title).substring(0, 60),
      seoDescription: ((meta.seoDescription as string) || excerpt).substring(0, 160),
      canonicalUrl: sanitizeUrl(meta.canonicalUrl as string | undefined),
      ogImage: sanitizeUrl(meta.ogImage as string | undefined),
      pocVideoUrl: sanitizeUrl(meta.pocVideoUrl as string | undefined),
      reportUrl: sanitizeUrl(meta.reportUrl as string | undefined),
      heroImage: determineBestHeroImage({
        heroImage: sanitizeUrl(meta.heroImage as string | undefined),
        markdownContent: sanitizedContent,
        category: (meta.category as string) || 'Web Security',
        title
      })
    }
  }

  const detectDuplicatesForPreview = (posts: Partial<BlogPost>[]) => {
    const map = new Map<number, { similarity: number; conflictingTitle?: string }>()
    posts.forEach((post, index) => {
      if (!post.slug || !post.title || !post.content || !post.excerpt) return
      const result = detectDuplicate(
        {
          slug: post.slug,
          title: post.title,
          content: post.content,
          excerpt: post.excerpt
        },
        existingPosts.map(p => ({
          id: p.id,
          slug: p.slug,
          title: p.title,
          content: p.content,
          excerpt: p.excerpt
        }))
      )
      if (result.isDuplicate) {
        map.set(index, {
          similarity: result.similarity,
          conflictingTitle: result.conflictingTitle
        })
      }
    })
    setDuplicates(map)
  }

  const processFiles = async (files: FileList | File[]) => {
    if (!rateLimitImport()) {
      throw new Error('Too many import attempts. Please wait a moment and retry.')
    }

    const nextWarnings: string[] = []
    const importedPosts: Partial<BlogPost>[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      if (!validateMimeType(file)) {
        nextWarnings.push(`Skipped ${file.name}: unsupported MIME type`)
        continue
      }

      if (!validateFileSize(file, 10)) {
        nextWarnings.push(`Skipped ${file.name}: file exceeds 10MB size limit`)
        continue
      }

      const isZip = file.name.toLowerCase().endsWith('.zip')
      const isJson = file.name.toLowerCase().endsWith('.json')
      const isMd = file.name.toLowerCase().endsWith('.md')

      if (!isZip && !isJson && !isMd) {
        nextWarnings.push(`Skipped ${file.name}: only .json, .md, and .zip are supported`)
        continue
      }

      if (isZip) {
        const zipCheck = validateZipFile(file)
        if (!zipCheck.valid) {
          throw new Error(zipCheck.errors.join('; '))
        }
        const extracted = await extractZipFile(file)
        if (!extracted.success) {
          throw new Error(extracted.errors.join('; '))
        }
        nextWarnings.push(...extracted.errors)

        for (const extractedFile of extracted.files) {
          if (extractedFile.type === 'json') {
            importedPosts.push(parseJsonFile(extractedFile.content))
          }
          if (extractedFile.type === 'markdown') {
            importedPosts.push(parseMarkdownFile(extractedFile.content, extractedFile.name))
          }
        }
        continue
      }

      const content = await file.text()
      if (isJson) {
        importedPosts.push(parseJsonFile(content))
      }
      if (isMd) {
        importedPosts.push(parseMarkdownFile(content, file.name))
      }
    }

    if (importedPosts.length === 0) {
      throw new Error('No valid posts were found in the selected files.')
    }

    setWarnings(nextWarnings)
    setPreviewPosts(importedPosts)
    detectDuplicatesForPreview(importedPosts)
    setStage('preview')
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setLoading(true)
    setError('')
    setWarnings([])

    try {
      await processFiles(files)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while parsing files')
    } finally {
      setLoading(false)
      e.target.value = ''
    }
  }

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (loading) return

    const files = e.dataTransfer.files
    if (!files || files.length === 0) return

    setLoading(true)
    setError('')
    setWarnings([])

    try {
      await processFiles(files)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while parsing dropped files')
    } finally {
      setLoading(false)
    }
  }

  const finalizeImport = (selectedPosts: Partial<BlogPost>[]) => {
    const finalPosts: BlogPost[] = []
    const finalWarnings: string[] = [...warnings]
    const finalErrors: string[] = []

    selectedPosts.forEach((post, index) => {
      const validation = validateBlogPost(post)
      if (!validation.valid || !post.title || !post.slug || !post.excerpt || !post.content) {
        finalErrors.push(`Post ${index + 1}: ${validation.errors.map(e => e.message).join(', ')}`)
        return
      }

      finalPosts.push({
        id: post.id || Date.now() + index,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        date: post.date || new Date().toISOString().split('T')[0],
        category: post.category || 'Web Security',
        content: post.content,
        readTime: post.readTime || calculateReadTime(post.content),
        type: post.type || 'writeup',
        status: post.status || 'draft',
        publishedAt: post.publishedAt,
        createdAt: post.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        author: post.author || 'Site Owner',
        authorAvatar: post.authorAvatar,
        authorRole: post.authorRole,
        seoTitle: (post.seoTitle || post.title).substring(0, 60),
        seoDescription: (post.seoDescription || post.excerpt).substring(0, 160),
        canonicalUrl: post.canonicalUrl,
        ogImage: post.ogImage || post.heroImage,
        cve: post.cve,
        cwe: post.cwe,
        cvss: post.cvss,
        affectedProduct: post.affectedProduct,
        vendor: post.vendor,
        pocVideoUrl: post.pocVideoUrl,
        reportUrl: post.reportUrl,
        tags: post.tags,
        difficulty: post.difficulty,
        bountyAmount: post.bountyAmount,
        heroImage: post.heroImage
      })
    })

    if (finalPosts.length > 0) {
      onImport(finalPosts)
    }

    recordImport({
      fileCount: previewPosts.length,
      successCount: finalPosts.length,
      failureCount: finalErrors.length,
      duplicateCount: duplicates.size,
      categories: Array.from(new Set(finalPosts.map(p => p.category))),
      tags: Array.from(new Set(finalPosts.flatMap(p => p.tags || []))),
      totalWords: finalPosts.reduce((sum, p) => sum + p.content.split(/\s+/).length, 0),
      errors: finalErrors
    })

    setSummary({
      success: finalErrors.length === 0,
      totalFiles: previewPosts.length,
      successCount: finalPosts.length,
      failureCount: finalErrors.length,
      duplicateCount: duplicates.size,
      skippedCount: Math.max(previewPosts.length - finalPosts.length, 0),
      errors: finalErrors,
      warnings: finalWarnings
    })
    setStage('summary')
  }

  if (stage === 'preview') {
    return (
      <BlogImportPreview
        posts={previewPosts}
        duplicates={duplicates}
        onCancel={() => {
          setStage('upload')
          setPreviewPosts([])
          setDuplicates(new Map())
        }}
        onConfirm={finalizeImport}
      />
    )
  }

  if (stage === 'summary' && summary) {
    return (
      <BlogImportSummary
        data={summary}
        onClose={onCancel}
      />
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 md:p-4">
      <div className="w-full max-w-lg bg-gray-800 rounded-xl border border-gray-700 p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-white">Import Blog Posts</h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {/* Instructions */}
          <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4">
            <p className="text-sm text-gray-300 mb-3">
              <span className="font-semibold text-white">Supported Formats:</span>
            </p>
            <ul className="text-xs text-gray-400 space-y-2 ml-2">
              <li>
                <span className="text-orange-400 font-semibold">JSON:</span> Include all blog post fields as JSON object
              </li>
              <li>
                <span className="text-orange-400 font-semibold">Markdown:</span> Content file with optional frontmatter YAML
              </li>
              <li>
                <span className="text-orange-400 font-semibold">ZIP:</span> Bundle .json/.md with image assets for batch import
              </li>
            </ul>
          </div>

          {/* Example Formats */}
          <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4">
            <p className="text-sm text-gray-300 font-semibold mb-2">Example JSON Format:</p>
            <pre className="text-xs bg-gray-900 p-2 rounded overflow-x-auto text-gray-300">
{`{
  "title": "Post Title",
  "slug": "post-slug",
  "excerpt": "Brief summary",
  "content": "# Full markdown content",
  "date": "2024-12-15",
  "category": "Web Security",
  "type": "writeup"
}`}
            </pre>
          </div>

          <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4">
            <p className="text-sm text-gray-300 font-semibold mb-2">Example Markdown Format:</p>
            <pre className="text-xs bg-gray-900 p-2 rounded overflow-x-auto text-gray-300">
{`---
title: Post Title
slug: post-slug
category: Web Security
date: 2024-12-15
type: writeup
tags: Security, API, Auth
---

# Full markdown content goes here
Content with **markdown** formatting.`}
            </pre>
          </div>

          {/* Error / Warnings */}
          {error && (
            <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
          {warnings.length > 0 && (
            <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-3">
              <p className="text-yellow-300 text-sm font-semibold mb-1">Warnings</p>
              {warnings.slice(0, 3).map((warn, idx) => (
                <p key={idx} className="text-yellow-200 text-xs">• {warn}</p>
              ))}
            </div>
          )}

          {/* File Input */}
          <div
            onDragOver={(e) => {
              e.preventDefault()
              setDragActive(true)
            }}
            onDragLeave={(e) => {
              e.preventDefault()
              setDragActive(false)
            }}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
              dragActive ? 'border-orange-500 bg-orange-500/10' : 'border-gray-600'
            }`}
          >
            <label className="cursor-pointer">
              <div className="flex flex-col items-center gap-2">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-sm font-semibold text-white">
                  {loading ? 'Processing...' : 'Click to select files or drag & drop'}
                </span>
                <span className="text-xs text-gray-400">
                  {loading ? 'Please wait' : 'JSON, Markdown, or ZIP files (up to 10 files)'}
                </span>
              </div>
              <input
                type="file"
                multiple
                accept=".json,.md,.zip"
                onChange={handleFileSelect}
                disabled={loading}
                className="hidden"
              />
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-300 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
