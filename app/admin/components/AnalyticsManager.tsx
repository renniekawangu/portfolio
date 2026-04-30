'use client'

import { motion } from 'framer-motion'
import { usePortfolioData } from '@/app/admin/data-context'
import { useState, useEffect } from 'react'

interface ViewStats {
  [slug: string]: number
}

export default function AnalyticsManager() {
  const { blogPosts, projects, services, skills } = usePortfolioData()
  const [viewStats, setViewStats] = useState<ViewStats>({})
  const [loading, setLoading] = useState(true)

  // Fetch view analytics
  useEffect(() => {
    const fetchViews = async () => {
      try {
        const response = await fetch('/api/analytics/views')
        const data = await response.json()
        setViewStats(data)
      } catch (error) {
        console.error('Failed to fetch views:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchViews()
  }, [])

  const totalViews = Object.values(viewStats).reduce((sum, views) => sum + views, 0)
  const averageViews = blogPosts.length > 0 ? Math.round(totalViews / blogPosts.length) : 0

  const stats = [
    { label: 'Blog Posts', value: blogPosts.length.toString() },
    { label: 'Total Views', value: totalViews.toLocaleString() },
    { label: 'Average Views/Post', value: averageViews.toLocaleString() },
    { label: 'Projects', value: projects.length.toString() }
  ]

  const topPosts = blogPosts
    .map(post => ({
      ...post,
      views: viewStats[post.slug] || 0
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 5)

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-white">Analytics Dashboard</h2>
        <p className="text-gray-400 mt-1">View engagement metrics and portfolio statistics</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6 hover:border-orange-500/30 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl md:text-4xl font-bold text-orange-400 mt-2">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Top Posts */}
      {!loading && topPosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-700 bg-gray-900">
            <h3 className="text-xl font-bold text-white">🔥 Top Performing Posts</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700 bg-gray-900/50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Rank</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Type</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-300">Views</th>
                </tr>
              </thead>
              <tbody>
                {topPosts.map((post, idx) => (
                  <tr key={post.id} className="border-b border-gray-700 hover:bg-gray-700/30 transition-colors">
                    <td className="px-6 py-3 text-sm font-semibold text-orange-400">#{idx + 1}</td>
                    <td className="px-6 py-3 text-sm text-white max-w-xs truncate">{post.title}</td>
                    <td className="px-6 py-3 text-sm">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium border ${
                        post.type === 'writeup' ? 'bg-red-600/20 text-red-400 border-red-600/30' :
                        post.type === 'news' ? 'bg-blue-600/20 text-blue-400 border-blue-600/30' :
                        'bg-purple-600/20 text-purple-400 border-purple-600/30'
                      }`}>
                        {post.type}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm font-semibold text-orange-400 text-right">
                      {post.views.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Quick Tips */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-green-600/10 border border-green-600/30 rounded-lg p-6"
      >
        <h3 className="text-lg font-bold text-green-400 mb-3">View Tracking</h3>
        <ul className="space-y-2 text-green-300 text-sm">
          <li>✓ Real-time view tracking for all blog posts</li>
          <li>✓ Views update automatically when posts are visited</li>
          <li>✓ Analytics stored in data/views.json</li>
          <li>✓ View data includes timestamps and user agent info</li>
        </ul>
      </motion.div>
    </div>
  )
}
