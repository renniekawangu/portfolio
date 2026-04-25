'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { blogPosts } from '../data'
import { notFound } from 'next/navigation'
import { use } from 'react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default function BlogPost({ params }: PageProps) {
  const { slug } = use(params)
  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    notFound()
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
          <motion.div variants={itemVariants} className="mb-6">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${categoryColors[post.category] || 'bg-purple-600/20 text-purple-400 border-purple-600/30'}`}>
              {post.category}
            </span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold mb-4 text-white leading-tight">
            {post.title}
          </motion.h1>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6 text-gray-400 mb-12 pb-8 border-b border-gray-700">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
              {post.readTime}
            </span>
          </motion.div>

          {/* Post Content */}
          <motion.div
            variants={itemVariants}
            className="prose prose-invert max-w-none text-gray-300"
            dangerouslySetInnerHTML={{
              __html: post.content
                .split('\n').map(line => {
                  // Handle markdown-style headings
                  if (line.startsWith('# ')) {
                    return `<h1 class="text-3xl font-bold text-white mt-8 mb-4">${line.slice(2)}</h1>`
                  }
                  if (line.startsWith('## ')) {
                    return `<h2 class="text-2xl font-bold text-white mt-6 mb-3">${line.slice(3)}</h2>`
                  }
                  if (line.startsWith('### ')) {
                    return `<h3 class="text-xl font-bold text-white mt-4 mb-2">${line.slice(4)}</h3>`
                  }
                  if (line.startsWith('- ')) {
                    return `<li class="ml-4">${line.slice(2)}</li>`
                  }
                  if (line.startsWith('`')) {
                    return `<code class="bg-gray-800 px-2 py-1 rounded text-orange-400">${line.slice(1, -1)}</code>`
                  }
                  if (line.trim() === '') {
                    return '<br />'
                  }
                  return `<p class="mb-4 leading-relaxed">${line}</p>`
                })
                .join('\n')
                .replace(/<code[^>]*>[\s\S]*?<\/code>/g, (match) => {
                  return `<code class="bg-gray-800 px-2 py-1 rounded text-orange-400">${match.slice(23, -7)}</code>`
                })
            }}
          />

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
                    className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300 group"
                  >
                    <h4 className="font-semibold text-white group-hover:text-orange-400 transition-colors duration-300 mb-2">
                      {relatedPost.title}
                    </h4>
                    <p className="text-sm text-gray-400">{relatedPost.excerpt}</p>
                  </Link>
                ))}
            </div>
          </motion.div>
        </motion.article>
      </div>
    </main>
  )
}
