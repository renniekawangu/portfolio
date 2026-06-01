'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePortfolioData } from '@/app/admin/data-context'
import { useState, useMemo } from 'react'
import PopularPosts from './components/PopularPosts'

export default function Blog() {
  const { blogPosts } = usePortfolioData()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<'all' | 'writeup' | 'news' | 'story'>('all')
  const [selectedTag, setSelectedTag] = useState<string>('all')

  const sortedPosts = useMemo(() => {
    return [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [blogPosts])

  const availableTags = useMemo(() => {
    return Array.from(new Set(blogPosts.flatMap(post => post.tags || []))).sort((a, b) => a.localeCompare(b))
  }, [blogPosts])

  const stats = useMemo(() => ({
    total: blogPosts.length,
    writeups: blogPosts.filter(post => post.type === 'writeup').length,
    news: blogPosts.filter(post => post.type === 'news').length,
    stories: blogPosts.filter(post => post.type === 'story').length,
  }), [blogPosts])

  // Filter posts
  const filteredPosts = useMemo(() => {
    return sortedPosts.filter(post => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesType = selectedType === 'all' || post.type === selectedType
      const matchesTag = selectedTag === 'all' || (post.tags || []).includes(selectedTag)
      
      return matchesSearch && matchesType && matchesTag
    })
  }, [sortedPosts, searchQuery, selectedType, selectedTag])

  const hasActiveFilters = searchQuery.length > 0 || selectedType !== 'all' || selectedTag !== 'all'

  const resetFilters = () => {
    setSearchQuery('')
    setSelectedType('all')
    setSelectedTag('all')
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
            b34st Web <span className="gradient-text">BLOG</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-gray-300">
            Real-world cybersecurity stories, vulnerability breakdowns, and deep dives into how modern systems get exploited—and secured.
          </motion.p>

          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {[
              { label: 'Posts', value: stats.total },
              { label: 'Writeups', value: stats.writeups },
              { label: 'News', value: stats.news },
              { label: 'Stories', value: stats.stories },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-gray-700 bg-gray-900/60 px-4 py-4">
                <p className="text-2xl font-bold text-white">{item.value}</p>
                <p className="text-sm text-gray-400">{item.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Navigation Links */}
          <motion.div variants={itemVariants} className="flex gap-4 mt-6">
            <Link
              href="/blog/archive"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300 text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Archive
            </Link>
          </motion.div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto mb-12"
        >
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          {/* Category and Tag Filters */}
          <div className="space-y-4">
            {/* Post Type */}
            <div>
              <p className="text-sm font-semibold text-gray-400 mb-3">Content Type</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedType('all')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedType === 'all'
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  All Posts
                </button>
                <button
                  onClick={() => setSelectedType('writeup')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedType === 'writeup'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  Writeups
                </button>
                <button
                  onClick={() => setSelectedType('news')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedType === 'news'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  News
                </button>
                <button
                  onClick={() => setSelectedType('story')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedType === 'story'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  Stories
                </button>
              </div>
            </div>

            {/* Tags */}
            {availableTags.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gray-400 mb-3">Tags</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedTag('all')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedTag === 'all'
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    All Tags
                  </button>
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedTag === tag
                          ? 'bg-orange-600 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Results count */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <p className="text-sm text-gray-500">
              {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} found
            </p>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        </motion.div>

        {/* Main Content Grid with Sidebar */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Posts Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="lg:col-span-2 grid gap-8"
          >
            {blogPosts.length > 0 ? (
              filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <motion.article
                    key={post.id}
                    variants={itemVariants}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700/50 hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 group"
                  >
                    <div className="flex flex-col gap-4">
                      {post.heroImage && (
                        <div className="overflow-hidden rounded-xl border border-gray-700/60 bg-gray-900/60">
                          <img
                            src={post.heroImage}
                            alt={`${post.title} hero`}
                            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="flex flex-wrap items-center gap-3">
                        {/* Post Type Badge */}
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
                            ${post.bountyAmount.toLocaleString()}
                          </span>
                        )}
                        <span className="text-sm text-gray-400 ml-auto">
                          {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                        <span className="text-sm text-gray-500">{post.readTime}</span>
                      </div>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span key={tag} className="inline-block px-2 py-1 rounded text-xs bg-gray-700/50 text-gray-300">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <Link href={`/blog/${post.slug}`} className="group">
                        <h2 className="text-xl md:text-2xl font-semibold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300 line-clamp-2">
                          {post.title}
                        </h2>
                      </Link>

                      <p className="text-gray-400 text-base leading-relaxed mb-4 line-clamp-3">
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
                      </div>
                    </div>
                  </motion.article>
                ))
              ) : (
                <motion.div
                  variants={itemVariants}
                  className="rounded-2xl border border-dashed border-gray-700 bg-gray-900/60 p-10 text-center"
                >
                  <h2 className="text-2xl font-bold text-white mb-3">No posts match your filters</h2>
                  <p className="text-gray-400 mb-6">
                    Try a different tag or content type, or clear the filters to see the full archive.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-500 transition-colors"
                  >
                    Reset filters
                  </button>
                </motion.div>
              )
            ) : null}
          </motion.div>

          {/* Sidebar with Popular Posts */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="lg:col-span-1"
          >
            <PopularPosts posts={blogPosts} limit={5} showTitle={true} />
          </motion.div>
        </div>

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
