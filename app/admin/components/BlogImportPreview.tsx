'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BlogPost } from '../../blog/data'
import { validateBlogPost } from '@/lib/validateBlogPost'

interface BlogImportPreviewProps {
  posts: Partial<BlogPost>[]
  onConfirm: (posts: Partial<BlogPost>[]) => void
  onCancel: () => void
  duplicates?: Map<number, { similarity: number; conflictingTitle?: string }>
}

export default function BlogImportPreview({ posts, onConfirm, onCancel, duplicates = new Map() }: BlogImportPreviewProps) {
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(
    new Set(posts.map((_, i) => i).filter(i => !duplicates.has(i)))
  )
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const toggleSelect = (index: number) => {
    const newSelected = new Set(selectedIndices)
    if (newSelected.has(index)) {
      newSelected.delete(index)
    } else {
      newSelected.add(index)
    }
    setSelectedIndices(newSelected)
  }

  const toggleAll = () => {
    if (selectedIndices.size === posts.length) {
      setSelectedIndices(new Set())
    } else {
      setSelectedIndices(new Set(posts.map((_, i) => i)))
    }
  }

  const handleConfirm = () => {
    const selectedPosts = posts.filter((_, i) => selectedIndices.has(i))
    onConfirm(selectedPosts)
  }

  const stats = {
    total: posts.length,
    selected: selectedIndices.size,
    duplicates: duplicates.size,
    errors: posts.filter((p) => !validateBlogPost(p).valid).length
  }
  const hasErrors = stats.errors > 0

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 md:p-4 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-4xl bg-gray-800 rounded-xl border border-gray-700 p-4 md:p-8 my-8"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">Import Preview</h3>
            <p className="text-gray-400 mt-1 text-sm md:text-base">
              Review and select posts to import ({stats.selected} / {stats.total} selected)
            </p>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-6">
          <div className="bg-gray-700 rounded-lg p-3 md:p-4">
            <div className="text-xs md:text-sm text-gray-400">Total Posts</div>
            <div className="text-lg md:text-2xl font-bold text-white">{stats.total}</div>
          </div>
          <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-3 md:p-4">
            <div className="text-xs md:text-sm text-blue-400">Selected</div>
            <div className="text-lg md:text-2xl font-bold text-blue-400">{stats.selected}</div>
          </div>
          <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-3 md:p-4">
            <div className="text-xs md:text-sm text-yellow-400">Duplicates</div>
            <div className="text-lg md:text-2xl font-bold text-yellow-400">{stats.duplicates}</div>
          </div>
          <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-3 md:p-4">
            <div className="text-xs md:text-sm text-red-400">Issues</div>
            <div className="text-lg md:text-2xl font-bold text-red-400">{stats.errors}</div>
          </div>
        </div>

        {/* Select All */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-700">
          <input
            type="checkbox"
            checked={selectedIndices.size === posts.length}
            onChange={toggleAll}
            className="w-4 h-4 rounded cursor-pointer"
          />
          <label className="text-sm md:text-base text-gray-300 cursor-pointer">
            {selectedIndices.size === posts.length ? 'Deselect all' : 'Select all'}
          </label>
        </div>

        {/* Posts List */}
        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
          <AnimatePresence>
            {posts.map((post, index) => {
              const validation = validateBlogPost(post)
              const isDuplicate = duplicates.has(index)
              const isSelected = selectedIndices.has(index)

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`border rounded-lg p-4 transition-all duration-300 ${
                    isDuplicate
                      ? 'bg-yellow-600/10 border-yellow-600/30'
                      : validation.valid
                        ? 'bg-gray-700/50 border-gray-600'
                        : 'bg-red-600/10 border-red-600/30'
                  }`}
                >
                  <div className="flex gap-4">
                    {/* Checkbox */}
                    <div className="flex-shrink-0 pt-1">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(index)}
                        disabled={isDuplicate}
                        className="w-5 h-5 rounded cursor-pointer"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-base md:text-lg font-semibold text-white truncate">
                            {post.title || '[No Title]'}
                          </h4>
                          {post.slug && (
                            <p className="text-xs md:text-sm text-gray-400 mt-1">{post.slug}</p>
                          )}
                        </div>
                        <div className="flex-shrink-0">
                          {isDuplicate && (
                            <span className="px-2 py-1 bg-yellow-600/20 text-yellow-400 text-xs rounded-full border border-yellow-600/30">
                              ⚠ Duplicate
                            </span>
                          )}
                          {!validation.valid && (
                            <span className="px-2 py-1 bg-red-600/20 text-red-400 text-xs rounded-full border border-red-600/30">
                              ✗ Issues
                            </span>
                          )}
                          {validation.valid && !isDuplicate && (
                            <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full border border-green-600/30">
                              ✓ Valid
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Metadata */}
                      <div className="flex flex-wrap gap-2 mb-3 text-xs md:text-sm">
                        {post.category && (
                          <span className="px-2 py-1 bg-orange-600/20 text-orange-400 rounded border border-orange-600/30">
                            {post.category}
                          </span>
                        )}
                        {post.type && (
                          <span className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded border border-blue-600/30">
                            {post.type}
                          </span>
                        )}
                        {post.difficulty && (
                          <span className="px-2 py-1 bg-purple-600/20 text-purple-400 rounded border border-purple-600/30">
                            {post.difficulty}
                          </span>
                        )}
                      </div>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="text-xs md:text-sm text-gray-400 line-clamp-2 mb-3">{post.excerpt}</p>
                      )}

                      {/* Errors */}
                      {!validation.valid && (
                        <div className="bg-red-600/20 border border-red-600/30 rounded p-2 mb-3">
                          {validation.errors.slice(0, 2).map((error, i) => (
                            <p key={i} className="text-xs text-red-400">
                              • {error.message}
                            </p>
                          ))}
                          {validation.errors.length > 2 && (
                            <p className="text-xs text-red-400 mt-1">• +{validation.errors.length - 2} more issues</p>
                          )}
                        </div>
                      )}

                      {/* Duplicate Info */}
                      {isDuplicate && duplicates.get(index) && (
                        <div className="bg-yellow-600/20 border border-yellow-600/30 rounded p-2">
                          <p className="text-xs text-yellow-400">
                            Duplicate detected ({duplicates.get(index)!.similarity}% match): {duplicates.get(index)!.conflictingTitle}
                          </p>
                        </div>
                      )}

                      {/* Expand Button */}
                      <button
                        onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                        className="text-xs text-blue-400 hover:text-blue-300 mt-2"
                      >
                        {expandedIndex === index ? '▼ Hide details' : '▶ Show details'}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {expandedIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-4 pt-4 border-t border-gray-600"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-400">
                          {post.date && <div>📅 Date: {post.date}</div>}
                          {post.readTime && <div>⏱️ Read time: {post.readTime}</div>}
                          {post.tags && post.tags.length > 0 && (
                            <div className="md:col-span-2">
                              🏷️ Tags: {post.tags.join(', ')}
                            </div>
                          )}
                          {post.seoTitle && (
                            <div className="md:col-span-2">
                              🔍 SEO Title: {post.seoTitle}
                            </div>
                          )}
                          {post.seoDescription && (
                            <div className="md:col-span-2">
                              📝 SEO Description: {post.seoDescription}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex gap-3 mt-6 pt-6 border-t border-gray-700">
          <button
            onClick={onCancel}
            className="flex-1 md:flex-none px-4 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-300"
          >
            Cancel
          </button>
          {hasErrors && (
            <div className="flex-1 text-xs md:text-sm text-red-400 flex items-center">
              Fix all issues before importing.
            </div>
          )}
          <button
            onClick={handleConfirm}
            disabled={stats.selected === 0 || hasErrors}
            className="flex-1 md:flex-none px-6 py-2 btn-gradient text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg"
          >
            Import {stats.selected > 0 ? `(${stats.selected})` : ''}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
