'use client'

import { motion } from 'framer-motion'

export default function PortfolioManager() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-bold text-white">Portfolio Manager</h2>
        <p className="text-gray-400 mt-1">Manage your projects, services, and other portfolio content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Projects Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-white">Projects</h3>
              <p className="text-gray-400 text-sm mt-1">Manage your project portfolio</p>
            </div>
            <span className="text-3xl">🎨</span>
          </div>
          <p className="text-gray-500 text-sm mb-4">
            Coming soon: Add, edit, and manage your project showcase with descriptions, images, and links.
          </p>
          <button disabled className="w-full px-4 py-2 bg-gray-700 text-gray-400 rounded-lg cursor-not-allowed opacity-50">
            Coming Soon
          </button>
        </div>

        {/* Services Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-white">Services</h3>
              <p className="text-gray-400 text-sm mt-1">Manage your service offerings</p>
            </div>
            <span className="text-3xl">⚙️</span>
          </div>
          <p className="text-gray-500 text-sm mb-4">
            Coming soon: Update your service descriptions, pricing, and availability information.
          </p>
          <button disabled className="w-full px-4 py-2 bg-gray-700 text-gray-400 rounded-lg cursor-not-allowed opacity-50">
            Coming Soon
          </button>
        </div>

        {/* Skills Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-white">Skills</h3>
              <p className="text-gray-400 text-sm mt-1">Manage your technical skills</p>
            </div>
            <span className="text-3xl">💡</span>
          </div>
          <p className="text-gray-500 text-sm mb-4">
            Coming soon: Add and organize your technical skills and proficiency levels.
          </p>
          <button disabled className="w-full px-4 py-2 bg-gray-700 text-gray-400 rounded-lg cursor-not-allowed opacity-50">
            Coming Soon
          </button>
        </div>

        {/* Contact Settings Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-white">Contact Settings</h3>
              <p className="text-gray-400 text-sm mt-1">Manage contact information</p>
            </div>
            <span className="text-3xl">📧</span>
          </div>
          <p className="text-gray-500 text-sm mb-4">
            Coming soon: Update your contact email, phone, and social media links.
          </p>
          <button disabled className="w-full px-4 py-2 bg-gray-700 text-gray-400 rounded-lg cursor-not-allowed opacity-50">
            Coming Soon
          </button>
        </div>
      </div>

      <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-400 mb-2">📋 Development Roadmap</h3>
        <ul className="space-y-2 text-blue-300 text-sm">
          <li>✓ Blog Post Management</li>
          <li>⏳ Projects Management</li>
          <li>⏳ Services Management</li>
          <li>⏳ Skills Management</li>
          <li>⏳ Contact Settings</li>
          <li>⏳ Analytics Dashboard</li>
        </ul>
      </div>
    </motion.div>
  )
}
