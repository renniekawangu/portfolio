'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Comment {
  _id: string
  author: string
  email: string
  content: string
  postSlug: string
  status: 'approved' | 'pending' | 'rejected'
  createdAt: string
}

interface CommentManagerProps {
  adminPassword: string
}

export default function CommentManager({ adminPassword }: CommentManagerProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending')
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const fetchComments = async () => {
    setLoading(true)
    try {
      // Fetch all comments (in a real app, you'd want pagination)
      const response = await fetch('/api/comments')
      if (response.ok) {
        const data = await response.json()
        setComments(Array.isArray(data) ? data : [])
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [])

  const handleStatusChange = async (commentId: string, newStatus: 'approved' | 'pending' | 'rejected') => {
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': adminPassword
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        setComments(comments.map(c => 
          c._id === commentId ? { ...c, status: newStatus } : c
        ))
        setMessage({
          type: 'success',
          text: `Comment ${newStatus}`
        })
        setTimeout(() => setMessage(null), 2000)
      } else {
        setMessage({
          type: 'error',
          text: 'Failed to update comment'
        })
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to update comment'
      })
    }
  }

  const handleDelete = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return

    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'x-admin-password': adminPassword
        }
      })

      if (response.ok) {
        setComments(comments.filter(c => c._id !== commentId))
        setMessage({
          type: 'success',
          text: 'Comment deleted'
        })
        setTimeout(() => setMessage(null), 2000)
      } else {
        setMessage({
          type: 'error',
          text: 'Failed to delete comment'
        })
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to delete comment'
      })
    }
  }

  const filteredComments = filter === 'all' 
    ? comments 
    : comments.filter(c => c.status === filter)

  const statusCounts = {
    all: comments.length,
    pending: comments.filter(c => c.status === 'pending').length,
    approved: comments.filter(c => c.status === 'approved').length,
    rejected: comments.filter(c => c.status === 'rejected').length
  }

  return (
    <div className="space-y-6">
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

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 bg-gray-800 p-2 rounded-lg">
        {(['all', 'pending', 'approved', 'rejected'] as const).map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded font-medium transition-colors ${
              filter === status
                ? 'bg-orange-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)} ({statusCounts[status]})
          </button>
        ))}
      </div>

      {/* Comments List */}
      {loading ? (
        <div className="text-center text-gray-400">Loading comments...</div>
      ) : filteredComments.length === 0 ? (
        <div className="text-center text-gray-400">No {filter !== 'all' ? filter : ''} comments</div>
      ) : (
        <div className="space-y-4">
          {filteredComments.map((comment) => (
            <motion.div
              key={comment._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800 border border-gray-700 rounded-lg p-4 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-white">{comment.author}</p>
                  <p className="text-sm text-gray-400">{comment.email}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Post: <span className="text-orange-400">{comment.postSlug}</span>
                  </p>
                </div>
                <span className={`inline-block px-3 py-1 rounded text-xs font-medium ${
                  comment.status === 'approved' ? 'bg-green-600/20 text-green-400' :
                  comment.status === 'pending' ? 'bg-yellow-600/20 text-yellow-400' :
                  'bg-red-600/20 text-red-400'
                }`}>
                  {comment.status}
                </span>
              </div>

              <p className="text-gray-300 bg-gray-700/50 p-3 rounded">{comment.content}</p>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                
                <div className="flex gap-2">
                  {comment.status !== 'approved' && (
                    <button
                      onClick={() => handleStatusChange(comment._id, 'approved')}
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
                    >
                      Approve
                    </button>
                  )}
                  {comment.status !== 'rejected' && (
                    <button
                      onClick={() => handleStatusChange(comment._id, 'rejected')}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                    >
                      Reject
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(comment._id)}
                    className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
