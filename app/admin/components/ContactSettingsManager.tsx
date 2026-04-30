'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { contactSettings as initialSettings, ContactSettings } from '../data/contact'

export default function ContactSettingsManager() {
  const [settings, setSettings] = useState<ContactSettings>(initialSettings)
  const [isEditing, setIsEditing] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSettings(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async () => {
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h2 className="text-3xl font-bold text-white">Contact Settings</h2>
          <p className="text-gray-400 mt-1">Update your contact information and social links</p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="btn-gradient text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
          >
            Edit Settings
          </button>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 border border-gray-700 rounded-lg p-8 space-y-6"
      >
        {isEditing ? (
          <>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <label className="block text-sm font-semibold text-white mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <label className="block text-sm font-semibold text-white mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={settings.phone || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <label className="block text-sm font-semibold text-white mb-2">GitHub</label>
              <input
                type="url"
                name="github"
                value={settings.github || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <label className="block text-sm font-semibold text-white mb-2">LinkedIn</label>
              <input
                type="url"
                name="linkedin"
                value={settings.linkedin || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <label className="block text-sm font-semibold text-white mb-2">Twitter</label>
              <input
                type="url"
                name="twitter"
                value={settings.twitter || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </motion.div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSave}
                className="flex-1 btn-gradient text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 px-4 py-3 bg-gray-700 text-gray-300 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>

            <AnimatePresence>
              {saveSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 bg-green-600/20 border border-green-600/30 rounded-lg text-green-400 text-center font-semibold"
                >
                  ✓ Settings saved successfully!
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p className="text-lg text-white font-semibold">{settings.email}</p>
            </div>
            {settings.phone && (
              <div>
                <p className="text-sm text-gray-400">Phone</p>
                <p className="text-lg text-white font-semibold">{settings.phone}</p>
              </div>
            )}
            {settings.github && (
              <div>
                <p className="text-sm text-gray-400">GitHub</p>
                <a href={settings.github} target="_blank" rel="noopener noreferrer" className="text-lg text-orange-400 hover:text-orange-300 font-semibold">
                  {settings.github}
                </a>
              </div>
            )}
            {settings.linkedin && (
              <div>
                <p className="text-sm text-gray-400">LinkedIn</p>
                <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="text-lg text-orange-400 hover:text-orange-300 font-semibold">
                  {settings.linkedin}
                </a>
              </div>
            )}
            {settings.twitter && (
              <div>
                <p className="text-sm text-gray-400">Twitter</p>
                <a href={settings.twitter} target="_blank" rel="noopener noreferrer" className="text-lg text-orange-400 hover:text-orange-300 font-semibold">
                  {settings.twitter}
                </a>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  )
}
