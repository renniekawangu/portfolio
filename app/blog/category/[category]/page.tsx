'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePortfolioData } from '@/app/admin/data-context'
import { notFound } from 'next/navigation'
import { use, useState, useEffect } from 'react'

interface PageProps {
  params: Promise<{ category: string }>
}

interface ViewStats {
  [slug: string]: number
}

const categoryDescriptions: { [key: string]: string } = {
  'Web Security': 'Exploring vulnerabilities in web applications including SQL injection, XSS, CSRF, and other OWASP Top 10 issues.',
  'Access Control': 'Diving into authentication and authorization flaws, broken access controls, and privilege escalation.',
  'API Security': 'Security challenges specific to APIs including insecure direct object references, rate limiting, and more.',
  'Authentication': 'Deep dives into authentication mechanisms, session management, and identity verification systems.',
  'Encryption': 'Exploring cryptographic implementations, weak encryption, and data protection issues.',
  'News': 'Latest updates, achievements, and announcements from the security research journey.',
  'Story': 'Personal experiences, career insights, and lessons learned in cybersecurity.'
}

export default function CategoryPage({ params }: PageProps) {
  const { category: encodedCategory } = use(params)
  const category = decodeURIComponent(encodedCategory).replace(/-/g, ' ')
  const { blogPosts } = usePortfolioData()
  const [viewStats, setViewStats] = useState<ViewStats>({})

  // Fetch real views from API
  useEffect(() => {
    const fetchViews = async () => {
      try {
        const response = await fetch('/api/analytics/views')
        const data = await response.json()
        setViewStats(data)
      } catch (error) {
        console.error('Failed to fetch views:', error)
      }
    }
    fetchViews()
  }, [])

  const categoryPosts = blogPosts.filter(p => p.category === category)

  if (categoryPosts.length === 0) {
    notFound()
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  // Get color for category
  const getCategoryColor = (cat: string) => {
    const colors: { [key: string]: string } = {
      'Web Security': 'from-red-600 to-red-700',
      'Access Control': 'from-orange-600 to-orange-700',
      'API Security': 'from-blue-600 to-blue-700',
      'Authentication': 'from-purple-600 to-purple-700',
      'Encryption': 'from-green-600 to-green-700',
      'News': 'from-cyan-600 to-cyan-700',
      'Story': 'from-pink-600 to-pink-700'
    }
    return colors[cat] || 'from-orange-600 to-orange-700'
  }

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-gradient-to-r ${getCategoryColor(category)} rounded-xl p-8 md:p-12 mb-16 text-white`}
        >
          <Link href="/blog" className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-4">
            <span className="mr-2">←</span> Back to Blog
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{category}</h1>
          <p className="text-lg text-white/90 max-w-2xl">
            {categoryDescriptions[category] || `Explore all posts in the ${category} category.`}
          </p>
          <p className="text-white/80 mt-4 text-sm">
            {categoryPosts.length} post{categoryPosts.length !== 1 ? 's' : ''} in this category
          </p>
        </motion.div>

        {/* Posts Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid gap-8"
        >
          {categoryPosts
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((post) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700/50 hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 group"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border bg-${category === 'Web Security' ? 'red' : category === 'Access Control' ? 'orange' : 'purple'}-600/20 text-${category === 'Web Security' ? 'red' : category === 'Access Control' ? 'orange' : 'purple'}-400 border-${category === 'Web Security' ? 'red' : category === 'Access Control' ? 'orange' : 'purple'}-600/30`}>
                      {category}
                    </span>
                    {post.type === 'writeup' && post.difficulty && (
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${
                        post.difficulty === 'Critical' ? 'bg-red-600/20 text-red-400 border-red-600/30' :
                        post.difficulty === 'High' ? 'bg-orange-600/20 text-orange-400 border-orange-600/30' :
                        post.difficulty === 'Medium' ? 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30' :
                        'bg-green-600/20 text-green-400 border-green-600/30'
                      }`}>
                        {post.difficulty}
                      </span>
                    )}
                    {post.type === 'writeup' && post.bountyAmount && (
                      <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-green-600/20 text-green-400 border border-green-600/30">
                        ${post.bountyAmount.toLocaleString()}
                      </span>
                    )}
                    <span className="text-sm text-gray-400 ml-auto">
                      {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`} className="group">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-orange-400 hover:text-orange-300 transition-colors duration-300 font-semibold group"
                    >
                      Read More
                      <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
                    </Link>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {(viewStats[post.slug] || 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
        </motion.div>
      </div>
    </main>
  )
}
