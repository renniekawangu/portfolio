'use client'

import { useState } from 'react'
import { BlogPost } from '../../blog/data'

interface BlogImporterProps {
  onImport: (posts: BlogPost[]) => void
  onCancel: () => void
}

export default function BlogImporter({ onImport, onCancel }: BlogImporterProps) {
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const parseJsonFile = (content: string): BlogPost => {
    try {
      const data = JSON.parse(content)
      
      // Validate required fields
      if (!data.title || !data.slug || !data.excerpt || !data.content) {
        throw new Error('Missing required fields: title, slug, excerpt, content')
      }

      // Generate ID based on timestamp if not provided
      const id = data.id || Date.now()
      
      return {
        id,
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt,
        date: data.date || new Date().toISOString().split('T')[0],
        category: data.category || 'Web Security',
        content: data.content,
        readTime: data.readTime || '5 min read',
        type: data.type || 'writeup',
        pocVideoUrl: data.pocVideoUrl,
        reportUrl: data.reportUrl,
        tags: data.tags,
        difficulty: data.difficulty,
        bountyAmount: data.bountyAmount,
        heroImage: data.heroImage
      }
    } catch (err) {
      throw new Error(`Invalid JSON format: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  const parseMarkdownFile = (content: string, filename: string): BlogPost => {
    // Extract frontmatter (YAML-like format at the top)
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
    const match = content.match(frontmatterRegex)

    let metadata: Record<string, string> = {}
    let markdownContent = content

    if (match) {
      const frontmatterText = match[1]
      markdownContent = match[2]

      // Parse simple YAML-like frontmatter
      frontmatterText.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':')
        if (key && valueParts.length > 0) {
          const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '')
          metadata[key.trim()] = value
        }
      })
    }

    // Generate slug from filename if not in frontmatter
    const slug = metadata.slug || filename.replace(/\.md$/, '').toLowerCase().replace(/\s+/g, '-')

    // Generate title from filename if not in frontmatter
    const title = metadata.title || filename.replace(/\.md$/, '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

    // Extract first paragraph as excerpt if not in frontmatter
    const excerptMatch = markdownContent.match(/^[^#\n][\s\S]*?(?=\n\n|\n#|$)/)
    const excerpt = metadata.excerpt || (excerptMatch ? excerptMatch[0].substring(0, 160).trim() : 'No excerpt provided')

    // Parse comma-separated tags
    const tags = metadata.tags ? metadata.tags.split(',').map(t => t.trim()) : undefined

    const id = metadata.id ? parseInt(metadata.id, 10) : Date.now()

    return {
      id,
      slug,
      title,
      excerpt,
      date: metadata.date || new Date().toISOString().split('T')[0],
      category: metadata.category || 'Web Security',
      content: markdownContent,
      readTime: metadata.readTime || '5 min read',
      type: (metadata.type as 'writeup' | 'news' | 'story') || 'writeup',
      pocVideoUrl: metadata.pocVideoUrl,
      reportUrl: metadata.reportUrl,
      tags,
      difficulty: metadata.difficulty as 'Low' | 'Medium' | 'High' | 'Critical' | undefined,
      bountyAmount: metadata.bountyAmount ? parseInt(metadata.bountyAmount, 10) : undefined,
      heroImage: metadata.heroImage
    }
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setLoading(true)
    setError('')

    try {
      const importedPosts: BlogPost[] = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const isJson = file.name.endsWith('.json')
        const isMd = file.name.endsWith('.md')

        if (!isJson && !isMd) {
          throw new Error(`Unsupported file type: ${file.name}. Only .json and .md files are supported.`)
        }

        const content = await file.text()

        if (isJson) {
          const post = parseJsonFile(content)
          importedPosts.push(post)
        } else if (isMd) {
          const post = parseMarkdownFile(content, file.name)
          importedPosts.push(post)
        }
      }

      if (importedPosts.length > 0) {
        onImport(importedPosts)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while parsing files')
    } finally {
      setLoading(false)
      // Reset input
      e.target.value = ''
    }
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

          {/* Error */}
          {error && (
            <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* File Input */}
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
            <label className="cursor-pointer">
              <div className="flex flex-col items-center gap-2">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-sm font-semibold text-white">
                  {loading ? 'Processing...' : 'Click to select files or drag & drop'}
                </span>
                <span className="text-xs text-gray-400">
                  {loading ? 'Please wait' : 'JSON or Markdown files (up to 10 files)'}
                </span>
              </div>
              <input
                type="file"
                multiple
                accept=".json,.md"
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
