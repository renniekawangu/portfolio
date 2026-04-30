'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context'
import { motion } from 'framer-motion'
import BlogManager from '../components/BlogManager'
import ProjectsManager from '../components/ProjectsManager'
import ServicesManager from '../components/ServicesManager'
import SkillsManager from '../components/SkillsManager'
import ContactSettingsManager from '../components/ContactSettingsManager'
import AnalyticsManager from '../components/AnalyticsManager'

type Tab = 'blog' | 'projects' | 'services' | 'skills' | 'contact' | 'analytics'

export default function AdminDashboard() {
  const { isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('blog')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded && !isAuthenticated) {
      router.push('/admin/login')
    }
  }, [isLoaded, isAuthenticated, router])

  const handleLogout = () => {
    logout()
    router.push('/admin/login')
  }

  if (!isLoaded || !isAuthenticated) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Loading...</div>
  }

  return (
    <main className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm">Manage your portfolio content</p>
          </motion.div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600/20 text-red-400 border border-red-600/30 rounded-lg hover:bg-red-600/30 transition-colors duration-300 font-semibold"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-0 overflow-x-auto">
            {[
              { id: 'blog', label: 'Blog Posts', icon: '📝' },
              { id: 'projects', label: 'Projects', icon: '🎨' },
              { id: 'services', label: 'Services', icon: '⚙️' },
              { id: 'skills', label: 'Skills', icon: '💡' },
              { id: 'contact', label: 'Contact', icon: '📧' },
              { id: 'analytics', label: 'Analytics', icon: '📊' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`px-6 py-4 font-semibold transition-all duration-300 border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-orange-400 border-orange-400'
                    : 'text-gray-400 border-transparent hover:text-gray-300'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="container mx-auto px-4 py-8"
      >
        {activeTab === 'blog' && <BlogManager />}
        {activeTab === 'projects' && <ProjectsManager />}
        {activeTab === 'services' && <ServicesManager />}
        {activeTab === 'skills' && <SkillsManager />}
        {activeTab === 'contact' && <ContactSettingsManager />}
        {activeTab === 'analytics' && <AnalyticsManager />}
      </motion.div>
    </main>
  )
}
