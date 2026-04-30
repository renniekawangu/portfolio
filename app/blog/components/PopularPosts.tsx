'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { BlogPost } from '@/app/blog/data'

interface PopularPostsProps {
  posts: BlogPost[]
  limit?: number
  showTitle?: boolean
}

export default function PopularPosts({ posts, limit = 5, showTitle = true }: PopularPostsProps) {
  // Sort by views and get top posts
  const topPosts = [...posts]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .filter(post => post.views && post.views > 0)
    .slice(0, limit)

  if (topPosts.length === 0) {
    return null
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 md:p-8 border border-gray-700/50 md:col-span-1"
    >
      {showTitle && (
        <motion.h3 variants={itemVariants} className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="text-orange-400">🔥</span> Popular Writeups
        </motion.h3>
      )}
      
      <div className="space-y-4">
        {topPosts.map((post, idx) => (
          <motion.div key={post.id} variants={itemVariants} className="pb-4 border-b border-gray-700 last:border-b-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-orange-600/20 text-orange-400 text-xs font-bold">
                    {idx + 1}
                  </span>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium border ${
                    post.type === 'writeup' ? 'bg-red-600/20 text-red-400 border-red-600/30' :
                    post.type === 'news' ? 'bg-blue-600/20 text-blue-400 border-blue-600/30' :
                    'bg-purple-600/20 text-purple-400 border-purple-600/30'
                  }`}>
                    {post.type}
                  </span>
                </div>
                <Link href={`/blog/${post.slug}`} className="group">
                  <h4 className="font-semibold text-white group-hover:text-orange-400 transition-colors duration-300 line-clamp-2 text-sm md:text-base">
                    {post.title}
                  </h4>
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {post.views?.toLocaleString() || '0'}
              </span>
              <span>•</span>
              <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
