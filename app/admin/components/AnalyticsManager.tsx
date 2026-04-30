'use client'

import { motion } from 'framer-motion'

export default function AnalyticsManager() {
  const stats = [
    { label: 'Blog Posts', value: '3', trend: '+1' },
    { label: 'Projects', value: '2', trend: '+0' },
    { label: 'Services', value: '3', trend: '+0' },
    { label: 'Skills', value: '4', trend: '+1' }
  ]

  const activities = [
    { action: 'Blog post published', item: 'SQL Injection Vulnerability', date: '2 days ago' },
    { action: 'Project updated', item: 'E-commerce Platform', date: '5 days ago' },
    { action: 'Settings modified', item: 'Contact Information', date: '1 week ago' }
  ]

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-white">Analytics Dashboard</h2>
        <p className="text-gray-400 mt-1">Overview of your portfolio statistics and activities</p>
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
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
              </div>
            </div>
            <p className="text-green-400 text-sm font-semibold">{stat.trend}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Activity Feed */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-800 border border-gray-700 rounded-lg p-6"
      >
        <h3 className="text-xl font-bold text-white mb-6">Recent Activities</h3>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-start gap-4 pb-4 border-b border-gray-700 last:border-b-0 last:pb-0"
            >
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold">{activity.action}</p>
                <p className="text-gray-400 text-sm">{activity.item}</p>
              </div>
              <span className="text-gray-500 text-sm whitespace-nowrap">{activity.date}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Tips */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-6"
      >
        <h3 className="text-lg font-bold text-blue-400 mb-3">Tips</h3>
        <ul className="space-y-2 text-blue-300 text-sm">
          <li>Keep your blog posts updated with the latest security findings</li>
          <li>Showcase completed projects to attract clients</li>
          <li>Update your skills as you learn new technologies</li>
          <li>Maintain accurate contact information for professional inquiries</li>
        </ul>
      </motion.div>
    </div>
  )
}
