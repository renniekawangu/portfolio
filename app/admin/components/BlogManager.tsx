'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePortfolioData } from '@/app/admin/data-context'
import BlogForm from './BlogForm'
import BlogImporter from './BlogImporter'
import ImportAnalytics from './ImportAnalytics'
import { BlogPost } from '../../blog/data'

export default function BlogManager() {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = usePortfolioData()
  const [showForm, setShowForm] = useState(false)
  const [showImporter, setShowImporter] = useState(false)
  const [showImportAnalytics, setShowImportAnalytics] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddPost = async (post: BlogPost) => {
    if (editingPost) {
      await updateBlogPost({ ...post, id: editingPost.id })
      setEditingPost(null)
    } else {
      await addBlogPost(post)
    }
    setShowForm(false)
  }

  const handleImportPosts = async (posts: BlogPost[]) => {
    try {
      for (const post of posts) {
        await addBlogPost(post)
      }
      setShowImporter(false)
    } catch (err) {
      console.error('Error importing posts:', err)
    }
  }

  const handleDeletePost = async (id: number | string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      await deleteBlogPost(id)
    }
  }

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingPost(null)
  }

  return (
    <div className="space-y-4 md:space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Blog Posts</h2>
          <p className="text-gray-400 mt-1 text-sm md:text-base">Create, edit, and manage your blog posts</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button
            onClick={() => setShowImportAnalytics(true)}
            className="flex-1 md:flex-none bg-purple-600 hover:bg-purple-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 text-sm md:text-base"
          >
            Imports 📊
          </button>
          <button
            onClick={() => {
              setEditingPost(null)
              setShowForm(true)
            }}
            className="flex-1 md:flex-none btn-gradient text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg text-sm md:text-base"
          >
            + New Post
          </button>
          <button
            onClick={() => setShowImporter(true)}
            className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 text-sm md:text-base"
          >
            Import
          </button>
        </div>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition duration-300 text-sm md:text-base"
      />

      {/* Importer Modal */}
      <AnimatePresence>
        {showImporter && (
          <BlogImporter
            onImport={handleImportPosts}
            onCancel={() => setShowImporter(false)}
            existingPosts={blogPosts}
          />
        )}
      </AnimatePresence>

      {/* Import Analytics */}
      <AnimatePresence>
        {showImportAnalytics && (
          <ImportAnalytics onClose={() => setShowImportAnalytics(false)} />
        )}
      </AnimatePresence>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 md:p-4"
            onClick={handleCloseForm}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[95vh] md:max-h-[90vh] overflow-y-auto bg-gray-800 rounded-xl border border-gray-700 p-4 md:p-8"
            >
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  {editingPost ? 'Edit Post' : 'New Blog Post'}
                </h3>
                <button
                  onClick={handleCloseForm}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>
              <BlogForm
                onSubmit={handleAddPost}
                initialPost={editingPost}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Posts List */}
      <div className="space-y-3 md:space-y-4">
        <div className="text-xs md:text-sm text-gray-400 mb-4">
          {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}
        </div>
        <AnimatePresence>
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-gray-800 border border-gray-700 rounded-lg p-3 md:p-6 hover:border-gray-600 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row justify-between items-start gap-3 md:gap-4">
                {post.heroImage && (
                  <div className="w-full md:w-40 flex-shrink-0 overflow-hidden rounded-lg border border-gray-700/60 bg-gray-900/60">
                    <img
                      src={post.heroImage}
                      alt={`${post.title} hero`}
                      className="h-32 w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="flex-1 w-full">
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                    <span className="px-2 md:px-3 py-1 bg-orange-600/20 text-orange-400 text-xs rounded-full border border-orange-600/30">
                      {post.category}
                    </span>
                    <span className={`px-2 md:px-3 py-1 text-xs rounded-full border ${
                      post.status === 'published'
                        ? 'bg-green-600/20 text-green-400 border-green-600/30'
                        : post.status === 'scheduled'
                          ? 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30'
                          : post.status === 'archived'
                            ? 'bg-gray-600/20 text-gray-400 border-gray-600/30'
                            : 'bg-blue-600/20 text-blue-400 border-blue-600/30'
                    }`}>
                      {post.status || 'draft'}
                    </span>
                    <span className="text-xs md:text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">{post.title}</h3>
                  <p className="text-gray-400 mb-3 text-sm md:text-base line-clamp-2">{post.excerpt}</p>
                  <span className="text-xs md:text-sm text-gray-500">{post.readTime}</span>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <button
                    onClick={() => handleEditPost(post)}
                    className="flex-1 md:flex-none px-3 md:px-2 py-2 bg-blue-600/20 text-blue-400 border border-blue-600/30 rounded-lg hover:bg-blue-600/30 transition-colors duration-300 text-xs md:text-sm font-semibold"
                    title="Edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="flex-1 md:flex-none px-3 md:px-2 py-2 bg-red-600/20 text-red-400 border border-red-600/30 rounded-lg hover:bg-red-600/30 transition-colors duration-300 text-xs md:text-sm font-semibold"
                    title="Delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-sm md:text-base">No posts found</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
