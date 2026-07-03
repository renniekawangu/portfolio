'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePortfolioData } from '@/app/admin/data-context'
import { useMemo, useState, useEffect } from 'react'

interface ViewStats {
  [slug: string]: number
}

export default function Archive() {
  const { blogPosts } = usePortfolioData()
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
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

  // Group posts by year and month
  const groupedPosts = useMemo(() => {
    const groups: { [key: string]: { [key: string]: typeof blogPosts } } = {}
    
    blogPosts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .forEach(post => {
        const date = new Date(post.date)
        const year = date.getFullYear().toString()
        const month = date.toLocaleDateString('en-US', { month: 'long' })
        
        if (!groups[year]) groups[year] = {}
        if (!groups[year][month]) groups[year][month] = []
        groups[year][month].push(post)
      })
    
    return groups
  }, [blogPosts])

  const years = Object.keys(groupedPosts).sort((a, b) => Number(b) - Number(a))
  const filteredGroups = selectedYear 
    ? { [selectedYear.toString()]: groupedPosts[selectedYear.toString()] }
    : groupedPosts

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
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
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
            <span className="inline-block rounded-lg border border-[#2E9BFF]/20 bg-[#2E9BFF]/10 px-4 py-2 text-sm font-semibold text-[#7CC4FF]">
              Archive
            </span>
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-extrabold mb-6 text-white">
            Blog <span className="gradient-text">Archive</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-gray-300">
            Browse all {blogPosts.length} posts by date. Discover insights from across the timeline.
          </motion.p>
        </motion.div>

        {/* Year Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedYear(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedYear === null
                  ? 'bg-[#2E9BFF] text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              All Years
            </button>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(Number(year))}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedYear === Number(year)
                    ? 'bg-[#2E9BFF] text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Showing {Object.values(filteredGroups).reduce((acc, months) => acc + Object.values(months).reduce((a, posts) => a + posts.length, 0), 0)} posts
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          {Object.entries(filteredGroups)
            .sort(([a], [b]) => Number(b) - Number(a))
            .map(([year, months]) => (
              <motion.div key={year} variants={itemVariants} className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-3xl font-bold text-white">{year}</h2>
                  <div className="flex-1 h-1 bg-gradient-to-r from-[#2E9BFF] to-transparent rounded-full"></div>
                </div>

                <div className="space-y-0">
                  {Object.entries(months)
                    .sort(([, aPosts], [, bPosts]) => {
                      const aDate = new Date(aPosts[0].date)
                      const bDate = new Date(bPosts[0].date)
                      return bDate.getTime() - aDate.getTime()
                    })
                    .map(([month, posts]) => (
                      <div key={`${year}-${month}`} className="mb-12">
                        <h3 className="text-lg font-semibold text-[#7CC4FF] mb-4 flex items-center gap-2">
                          <span className="w-2 h-2 bg-[#2E9BFF] rounded-full"></span>
                          {month}
                        </h3>

                        <div className="space-y-3 pl-4 border-l-2 border-gray-700">
                          {posts.map((post) => (
                            <Link
                              key={post.id}
                              href={`/blog/${post.slug}`}
                              className="group block p-4 rounded-lg bg-gray-800/30 hover:bg-gray-800/60 transition-all duration-300 border border-gray-700/30 hover:border-[#2E9BFF]/50"
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <h4 className="font-semibold text-white group-hover:text-[#7CC4FF] transition-colors duration-300 mb-2">
                                    {post.title}
                                  </h4>
                                  <p className="text-sm text-gray-400">{post.excerpt}</p>
                                </div>
                                <div className="flex flex-col items-end gap-2 whitespace-nowrap">
                                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium border ${
                                    post.type === 'writeup' ? 'bg-red-600/20 text-red-400 border-red-600/30' :
                                    post.type === 'news' ? 'bg-blue-600/20 text-blue-400 border-blue-600/30' :
                                    'bg-purple-600/20 text-purple-400 border-purple-600/30'
                                  }`}>
                                    {post.type}
                                  </span>
                                  <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    {(viewStats[post.slug] || 0).toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </motion.div>
            ))}
        </motion.div>
      </div>
    </main>
  )
}
