'use client'

import { useState } from 'react'
import { BlogPost } from '../../blog/data'
import { motion } from 'framer-motion'

interface BlogFormProps {
  onSubmit: (post: BlogPost) => void
  initialPost?: BlogPost | null
}

export default function BlogForm({ onSubmit, initialPost }: BlogFormProps) {
  const [formData, setFormData] = useState<BlogPost>(
    initialPost || {
      id: 0,
      slug: '',
      title: '',
      excerpt: '',
      date: new Date().toISOString().split('T')[0],
      category: 'Web Security',
      content: '',
      readTime: '5 min read'
    }
  )

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.excerpt.trim()) newErrors.excerpt = 'Excerpt is required'
    if (!formData.content.trim()) newErrors.content = 'Content is required'
    if (!formData.slug.trim()) newErrors.slug = 'Slug is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    handleChange(e)
    if (!initialPost) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(title)
      }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
      {/* Title */}
      <div>
        <label className="block text-xs md:text-sm font-semibold text-white mb-1 md:mb-2">Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleTitleChange}
          placeholder="Post title"
          className={`w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition duration-300 text-sm md:text-base ${
            errors.title ? 'border-red-600 focus:border-red-600 focus:ring-red-600' : 'border-gray-600 focus:border-orange-500 focus:ring-orange-500'
          }`}
        />
        {errors.title && <p className="text-red-400 text-xs md:text-sm mt-1">{errors.title}</p>}
      </div>

      {/* Slug */}
      <div>
        <label className="block text-xs md:text-sm font-semibold text-white mb-1 md:mb-2">Slug *</label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          placeholder="post-slug"
          className={`w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition duration-300 text-sm md:text-base ${
            errors.slug ? 'border-red-600 focus:border-red-600 focus:ring-red-600' : 'border-gray-600 focus:border-orange-500 focus:ring-orange-500'
          }`}
        />
        {errors.slug && <p className="text-red-400 text-xs md:text-sm mt-1">{errors.slug}</p>}
        <p className="text-xs text-gray-500 mt-1">URL-friendly version of the title</p>
      </div>

      {/* Excerpt */}
      <div>
        <label className="block text-xs md:text-sm font-semibold text-white mb-1 md:mb-2">Excerpt *</label>
        <textarea
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          placeholder="Brief summary of the post"
          rows={2}
          className={`w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition duration-300 resize-none text-sm md:text-base ${
            errors.excerpt ? 'border-red-600 focus:border-red-600 focus:ring-red-600' : 'border-gray-600 focus:border-orange-500 focus:ring-orange-500'
          }`}
        />
        {errors.excerpt && <p className="text-red-400 text-xs md:text-sm mt-1">{errors.excerpt}</p>}
      </div>

      {/* Category & Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <div>
          <label className="block text-xs md:text-sm font-semibold text-white mb-1 md:mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition duration-300 text-sm md:text-base"
          >
            <option>Web Security</option>
            <option>Access Control</option>
            <option>API Security</option>
            <option>Authentication</option>
            <option>Encryption</option>
          </select>
        </div>

        <div>
          <label className="block text-xs md:text-sm font-semibold text-white mb-1 md:mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition duration-300 text-sm md:text-base"
          />
        </div>
      </div>

      {/* Read Time */}
      <div>
        <label className="block text-xs md:text-sm font-semibold text-white mb-1 md:mb-2">Read Time</label>
        <input
          type="text"
          name="readTime"
          value={formData.readTime}
          onChange={handleChange}
          placeholder="5 min read"
          className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition duration-300 text-sm md:text-base"
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-xs md:text-sm font-semibold text-white mb-1 md:mb-2">Content (Markdown) *</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Write your blog post content here. You can use markdown."
          rows={8}
          className={`w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition duration-300 font-mono text-xs md:text-sm resize-none ${
            errors.content ? 'border-red-600 focus:border-red-600 focus:ring-red-600' : 'border-gray-600 focus:border-orange-500 focus:ring-orange-500'
          }`}
        />
        {errors.content && <p className="text-red-400 text-xs md:text-sm mt-1">{errors.content}</p>}
        <p className="text-xs text-gray-500 mt-1">Supports markdown formatting: # heading, ## subheading, - lists, etc.</p>
      </div>

      {/* POC Video and Report Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <div>
          <label className="block text-xs md:text-sm font-semibold text-white mb-1 md:mb-2">POC Video (Google Drive Link)</label>
          <input
            type="url"
            name="pocVideoUrl"
            value={formData.pocVideoUrl || ''}
            onChange={handleChange}
            placeholder="https://drive.google.com/file/d/..."
            className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition duration-300 text-sm md:text-base"
          />
          <p className="text-xs text-gray-500 mt-1">Link to proof-of-concept video demonstration</p>
        </div>

        <div>
          <label className="block text-xs md:text-sm font-semibold text-white mb-1 md:mb-2">Report (Google Drive Link)</label>
          <input
            type="url"
            name="reportUrl"
            value={formData.reportUrl || ''}
            onChange={handleChange}
            placeholder="https://drive.google.com/file/d/..."
            className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition duration-300 text-sm md:text-base"
          />
          <p className="text-xs text-gray-500 mt-1">Link to detailed security report</p>
        </div>
      </div>

      {/* Submit */}
      <div className="flex flex-col md:flex-row gap-2 md:gap-3 pt-2 md:pt-4">
        <button
          type="submit"
          className="flex-1 btn-gradient text-white py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg text-sm md:text-base"
        >
          {initialPost ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </form>
  )
}
