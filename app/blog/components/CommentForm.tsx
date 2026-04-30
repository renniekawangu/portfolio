'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface CommentFormProps {
  postSlug: string
  onCommentAdded?: () => void
}

export default function CommentForm({ postSlug, onCommentAdded }: CommentFormProps) {
  const [author, setAuthor] = useState('')
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postSlug,
          author,
          email,
          content
        })
      })

      if (response.ok) {
        setMessage({
          type: 'success',
          text: 'Comment submitted! It will appear after moderation.'
        })
        setAuthor('')
        setEmail('')
        setContent('')
        onCommentAdded?.()
      } else {
        const error = await response.json()
        setMessage({
          type: 'error',
          text: error.error || 'Failed to submit comment'
        })
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to submit comment. Please try again.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-lg p-6 border border-gray-700 mt-8"
    >
      <h3 className="text-xl font-bold text-white mb-4">Leave a Comment</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
          />
        </div>

        <textarea
          placeholder="Your comment (3-1000 characters)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          minLength={3}
          maxLength={1000}
          rows={4}
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 resize-none"
        />

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">
            {content.length}/1000 characters
          </p>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-orange-600 hover:bg-orange-500 disabled:bg-orange-800 text-white font-medium rounded transition-colors"
          >
            {loading ? 'Submitting...' : 'Submit Comment'}
          </button>
        </div>

        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-3 rounded text-sm ${
              message.type === 'success'
                ? 'bg-green-600/20 text-green-400 border border-green-600/30'
                : 'bg-red-600/20 text-red-400 border border-red-600/30'
            }`}
          >
            {message.text}
          </motion.div>
        )}
      </form>

      <p className="text-xs text-gray-500 mt-4">
        Comments are moderated before appearing. Please be respectful.
      </p>
    </motion.div>
  )
}
