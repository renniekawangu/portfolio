'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { blogPosts } from './data'

export default function Blog() {
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const categoryColors: { [key: string]: string } = {
    'Web Security': 'bg-red-600/20 text-red-400 border-red-600/30',
    'Access Control': 'bg-orange-600/20 text-orange-400 border-orange-600/30',
    'API Security': 'bg-blue-600/20 text-blue-400 border-blue-600/30',
  }

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto mb-16"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block bg-orange-600/10 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold border border-orange-600/20">Blog</span>
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-extrabold mb-6 text-white">
            Bug Bounty <span className="gradient-text">Writeups</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-gray-300">
            Detailed writeups of vulnerabilities I've discovered and responsibly disclosed during bug bounty hunting engagements.
          </motion.p>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto grid gap-8"
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700/50 hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 group"
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${categoryColors[post.category] || 'bg-purple-600/20 text-purple-400 border-purple-600/30'}`}>
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-400">
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                  <span className="text-sm text-gray-500 ml-auto">{post.readTime}</span>
                </div>

                <Link href={`/blog/${post.slug}`} className="group">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-orange-400 hover:text-orange-300 transition-colors duration-300 font-semibold group"
                >
                  Read More
                  <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Empty State */}
        {blogPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto text-center py-16"
          >
            <p className="text-gray-400 text-lg">No blog posts yet. Check back soon!</p>
          </motion.div>
        )}
      </div>
    </main>
  )
}
