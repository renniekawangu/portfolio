'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePortfolioData } from '@/app/admin/data-context'
import { useState, useMemo } from 'react'

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
            Bug Bounty <span className="gradient-text">Writeups</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-gray-300">
            Detailed writeups of vulnerabilities I&apos;ve discovered and responsibly disclosed during bug bounty hunting engagements.
          </motion.p>
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
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto grid gap-8"
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
