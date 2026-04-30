'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Comment {
  _id: string
  author: string
  email: string
  content: string
  createdAt: string
  status: string
}

interface CommentsListProps {
  postSlug: string
  refreshTrigger?: number
}

export default function CommentsList({ postSlug, refreshTrigger }: CommentsListProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?slug=${postSlug}`)
      if (response.ok) {
        const data = await response.json()
        setComments(Array.isArray(data) ? data : [])
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error)
      setComments([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [postSlug, refreshTrigger])

  if (loading) {
    return (
      <div className="mt-8 text-center text-gray-400">
        Loading comments...
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="mt-8"
    >
      <h3 className="text-2xl font-bold text-white mb-6">
        Comments ({comments.length})
      </h3>

      {comments.length === 0 ? (
        <p className="text-gray-400">No comments yet. Be the first to comment!</p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment, index) => (
            <motion.div
              key={comment._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-orange-500/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-white">{comment.author}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">{comment.content}</p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
