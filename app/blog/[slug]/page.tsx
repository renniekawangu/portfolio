'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePortfolioData } from '@/app/admin/data-context'
import { notFound } from 'next/navigation'
import { use, useState, useEffect, useMemo } from 'react'
import CommentForm from '../components/CommentForm'
import CommentsList from '../components/CommentsList'

interface PageProps {
  params: Promise<{ slug: string }>
}

interface TableOfContentsItem {
  id: string
  text: string
  level: number
}

export default function BlogPost({ params }: PageProps) {
  const { slug } = use(params)
  const { blogPosts } = usePortfolioData()
  const post = blogPosts.find(p => p.slug === slug)
  const [copied, setCopied] = useState(false)
  const [views, setViews] = useState(0)
  const [commentRefresh, setCommentRefresh] = useState(0)

  if (!post) {
    notFound()
  }

  // Track views on mount via API
  useEffect(() => {
    const trackView = async () => {
      try {
        const response = await fetch('/api/analytics/views', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug })
        })
        const data = await response.json()
        setViews(data.views || 0)
      } catch (error) {
        console.error('Failed to track view:', error)
      }
    }
    trackView()
  }, [slug])

  // Fetch current views on component mount
  useEffect(() => {
    const fetchViews = async () => {
      try {
        const response = await fetch(`/api/analytics/views?slug=${slug}`)
        const data = await response.json()
        setViews(data.views || 0)
      } catch (error) {
        console.error('Failed to fetch views:', error)
      }
    }
    fetchViews()
  }, [slug])

  const toc = useMemo<TableOfContentsItem[]>(() => {
    const headings = post.content.split('\n').filter(line => line.startsWith('#'))
    return headings.map((heading, idx) => {
      const level = heading.match(/^#+/)?.[0].length || 1
      const text = heading.replace(/^#+\s/, '')
      const id = `heading-${idx}`
      return { id, text, level }
    })
  }, [post.content])

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = `Check out: ${post.title}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
      '_blank'
    )
  }

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      '_blank'
    )
  }

  const categoryColors: { [key: string]: string } = {
    'Web Security': 'bg-red-600/20 text-red-400 border-red-600/30',
    'Access Control': 'bg-orange-600/20 text-orange-400 border-orange-600/30',
    'API Security': 'bg-blue-600/20 text-blue-400 border-blue-600/30',
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center text-orange-400 hover:text-orange-300 transition-colors duration-300 font-semibold group"
          >
            <span className="mr-2 group-hover:-translate-x-2 transition-transform duration-300">←</span>
            Back to Blog
          </Link>
        </motion.div>

        {/* Post Header */}
        <motion.article
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <motion.div variants={itemVariants} className="mb-6 flex flex-wrap items-center gap-3">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border uppercase tracking-wide ${
              post.type === 'writeup' ? 'bg-red-600/20 text-red-400 border-red-600/30' :
              post.type === 'news' ? 'bg-blue-600/20 text-blue-400 border-blue-600/30' :
              'bg-purple-600/20 text-purple-400 border-purple-600/30'
            }`}>
              {post.type}
            </span>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${categoryColors[post.category] || 'bg-purple-600/20 text-purple-400 border-purple-600/30'}`}>
              {post.category}
            </span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold mb-4 text-white leading-tight">
            {post.title}
          </motion.h1>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6 text-gray-400 mb-12 pb-8 border-b border-gray-700">
            {post.difficulty && (
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${
                post.difficulty === 'Critical' ? 'bg-red-600/20 text-red-400 border-red-600/30' :
                post.difficulty === 'High' ? 'bg-orange-600/20 text-orange-400 border-orange-600/30' :
                post.difficulty === 'Medium' ? 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30' :
                'bg-green-600/20 text-green-400 border-green-600/30'
              }`}>
                {post.difficulty}
              </span>
            )}
            {post.bountyAmount && (
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-green-600/20 text-green-400 border border-green-600/30">
                ${post.bountyAmount.toLocaleString()} bounty
              </span>
            )}
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
              {post.readTime}
            </span>
            <span className="flex items-center gap-2 ml-auto text-orange-400 font-semibold">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {views.toLocaleString()}
            </span>
          </motion.div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span key={tag} className="inline-block px-3 py-1 rounded-full text-sm bg-gray-800 text-gray-300 border border-gray-700">
                  #{tag}
                </span>
              ))}
            </motion.div>
          )}

          {/* Share Buttons */}
          <motion.div variants={itemVariants} className="flex gap-3 mb-8 pb-8 border-b border-gray-700">
            <button
              onClick={shareOnTwitter}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 font-semibold"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
              </svg>
              Share
            </button>
            <button
              onClick={shareOnLinkedIn}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors duration-300 font-semibold"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              Share
            </button>
            <button
              onClick={handleCopyLink}
              className={`inline-flex items-center gap-2 px-4 py-2 ${
                copied ? 'bg-green-600' : 'bg-gray-700 hover:bg-gray-600'
              } text-white rounded-lg transition-colors duration-300 font-semibold`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </motion.div>

          {/* Table of Contents */}
          {toc.length > 0 && (
            <motion.div variants={itemVariants} className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mb-12">
              <h3 className="text-lg font-bold text-white mb-4">Table of Contents</h3>
              <ul className="space-y-2">
                {toc.filter(item => item.level <= 2).map((item) => (
                  <li key={item.id} className={`${item.level > 1 ? 'ml-4' : ''}`}>
                    <a
                      href={`#${item.id}`}
                      className="text-orange-400 hover:text-orange-300 transition-colors duration-300 text-sm"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Post Content */}
          <motion.div
            variants={itemVariants}
            className="prose prose-invert max-w-none"
          >
            <div className="text-gray-300 space-y-4">
              {post.content.split('\n\n').map((paragraph, idx) => {
                // Handle code blocks with syntax highlighting
                if (paragraph.startsWith('```')) {
                  const match = paragraph.match(/```([a-z]*)\n([\s\S]*?)```/)
                  if (match) {
                    const language = match[1] || 'code'
                    const codeContent = match[2].trim()
                    
                    return (
                      <div key={idx} className="my-6">
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 border-b border-gray-700 rounded-t-lg">
                          <span className="text-xs font-semibold text-gray-500 uppercase">{language || 'code'}</span>
                        </div>
                        <pre className="bg-gray-900 border border-gray-800 border-t-0 rounded-b-lg p-4 overflow-x-auto">
                          <code className="text-sm font-mono text-gray-300 leading-relaxed whitespace-pre">
                            {codeContent}
                          </code>
                        </pre>
                      </div>
                    )
                  }
                }
                
                // Handle headings
                if (paragraph.startsWith('# ')) {
                  const headingIndex = toc.findIndex(item => item.text === paragraph.slice(2))
                  return <h1 id={headingIndex >= 0 ? toc[headingIndex].id : undefined} key={idx} className="text-3xl font-bold text-white mt-8 mb-4">{paragraph.slice(2)}</h1>
                }
                if (paragraph.startsWith('## ')) {
                  const headingIndex = toc.findIndex(item => item.text === paragraph.slice(3))
                  return <h2 id={headingIndex >= 0 ? toc[headingIndex].id : undefined} key={idx} className="text-2xl font-bold text-white mt-6 mb-3">{paragraph.slice(3)}</h2>
                }
                if (paragraph.startsWith('### ')) {
                  const headingIndex = toc.findIndex(item => item.text === paragraph.slice(4))
                  return <h3 id={headingIndex >= 0 ? toc[headingIndex].id : undefined} key={idx} className="text-xl font-bold text-white mt-4 mb-2">{paragraph.slice(4)}</h3>
                }
                
                // Handle bullet lists
                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n').filter(line => line.startsWith('- '))
                  return (
                    <ul key={idx} className="list-disc list-inside space-y-2 my-4 text-gray-300">
                      {items.map((item, i) => (
                        <li key={i} className="ml-4">{item.slice(2)}</li>
                      ))}
                    </ul>
                  )
                }
                
                // Handle paragraphs with basic text formatting
                return (
                  <p key={idx} className="mb-4 leading-relaxed text-gray-300">
                    {paragraph.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g).map((part, i) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={i} className="font-bold text-white">{part.slice(2, -2)}</strong>
                      }
                      if (part.startsWith('*') && part.endsWith('*')) {
                        return <em key={i} className="italic">{part.slice(1, -1)}</em>
                      }
                      if (part.startsWith('`') && part.endsWith('`')) {
                        return <code key={i} className="bg-gray-800 px-2 py-1 rounded text-orange-400 text-sm">{part.slice(1, -1)}</code>
                      }
                      return part
                    })}
                  </p>
                )
              })}
            </div>
          </motion.div>

          {/* Related Posts */}
          <motion.div variants={itemVariants} className="mt-16 pt-8 border-t border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6">More Writeups</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {blogPosts
                .filter(p => p.id !== post.id)
                .slice(0, 2)
                .map(relatedPost => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-300 group border border-gray-700 hover:border-orange-600/30"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        {relatedPost.difficulty && (
                          <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                            relatedPost.difficulty === 'Critical' ? 'bg-red-600/20 text-red-400' :
                            relatedPost.difficulty === 'High' ? 'bg-orange-600/20 text-orange-400' :
                            'bg-yellow-600/20 text-yellow-400'
                          }`}>
                            {relatedPost.difficulty}
                          </span>
                        )}
                        {relatedPost.bountyAmount && (
                          <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-green-600/20 text-green-400">
                            ${relatedPost.bountyAmount.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <h4 className="font-semibold text-white group-hover:text-orange-400 transition-colors duration-300">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-gray-400">{relatedPost.excerpt}</p>
                      <div className="text-xs text-gray-500 flex justify-between">
                        <span>{new Date(relatedPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </motion.div>

          {/* Comments Section */}
          <motion.div variants={itemVariants} className="mt-16 pt-8 border-t border-gray-700">
            <CommentsList postSlug={slug} refreshTrigger={commentRefresh} />
            <CommentForm 
              postSlug={slug} 
              onCommentAdded={() => setCommentRefresh(prev => prev + 1)}
            />
          </motion.div>
        </motion.article>
      </div>
    </main>
  )
}
