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

  const getCategoryBadge = (cat: string) => {
    const colors: { [key: string]: string } = {
      'Web Security': 'bg-red-600/20 text-red-400 border-red-600/30',
      'Access Control': 'bg-[#2E9BFF]/15 text-[#7CC4FF] border-[#2E9BFF]/30',
      'API Security': 'bg-blue-600/20 text-blue-400 border-blue-600/30',
      'Authentication': 'bg-purple-600/20 text-purple-400 border-purple-600/30',
      'Encryption': 'bg-green-600/20 text-green-400 border-green-600/30',
      'News': 'bg-cyan-600/20 text-cyan-400 border-cyan-600/30',
      'Story': 'bg-pink-600/20 text-pink-400 border-pink-600/30'
    }
    return colors[cat] || 'bg-[#2E9BFF]/15 text-[#7CC4FF] border-[#2E9BFF]/30'
  }

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="theme-panel mb-16 p-8 text-white md:p-12"
        >
          <Link href="/blog" className="mb-4 inline-flex items-center text-[#2E9BFF] transition-colors hover:text-[#7CC4FF]">
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
                className="theme-panel p-8 transition-all duration-300 group"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getCategoryBadge(category)}`}>
                      {category}
                    </span>
                    {post.type === 'writeup' && post.difficulty && (
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${
                        post.difficulty === 'Critical' ? 'bg-red-600/20 text-red-400 border-red-600/30' :
                        post.difficulty === 'High' ? 'bg-[#2E9BFF]/15 text-[#7CC4FF] border-[#2E9BFF]/30' :
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
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-[#7CC4FF] transition-colors duration-300">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-[#2E9BFF] hover:text-[#7CC4FF] transition-colors duration-300 font-semibold group"
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
