'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePortfolioData } from '@/app/admin/data-context'
import { useState, useMemo } from 'react'
import PopularPosts from './components/PopularPosts'

export default function Blog() {
  const { blogPosts } = usePortfolioData()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<'all' | 'writeup' | 'news' | 'story'>('all')

  // Get unique categories and tags
  const categories = useMemo(() => {
    return Array.from(new Set(blogPosts.map(p => p.category)))
  }, [blogPosts])

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    blogPosts.forEach(post => {
      post.tags?.forEach(tag => tags.add(tag))
    })
    return Array.from(tags)
  }, [blogPosts])

  // Filter posts
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory = !selectedCategory || post.category === selectedCategory
      const matchesTag = !selectedTag || post.tags?.includes(selectedTag)
      const matchesType = selectedType === 'all' || post.type === selectedType
      
      return matchesSearch && matchesCategory && matchesTag && matchesType
    })
  }, [blogPosts, searchQuery, selectedCategory, selectedTag, selectedType])
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
            Cyber security news updates, stories and detailed writeups of vulnerabilities all over the world.
          </motion.p>

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

            {/* Categories */}
            <div>
              <p className="text-sm font-semibold text-gray-400 mb-3">Categories</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === null
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === cat
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <p className="text-sm font-semibold text-gray-400 mb-3">Tags</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedTag === null
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  All Tags
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedTag === tag
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-gray-500 mt-4">
            {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} found
          </p>
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
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700/50 hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 group"
              >
              <div className="flex flex-col gap-4">
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
                  {post.views !== undefined && (
                    <span className="flex items-center gap-1 text-sm text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {post.views.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </motion.article>
            ))}
          </motion.div>

          {/* Sidebar with Popular Posts */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="lg:col-span-1"
          >
            <PopularPosts posts={blogPosts} limit={5} showTitle={true} />

            {/* Categories Widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700/50 mt-8"
            >
              <h3 className="text-lg font-bold text-white mb-4">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/blog/category/${encodeURIComponent(cat.toLowerCase().replace(/\s+/g, '-'))}`}
                    className="px-3 py-1 rounded-lg text-sm font-medium bg-gray-700 hover:bg-orange-600 text-gray-300 hover:text-white transition-all duration-300"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </motion.div>
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
