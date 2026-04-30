'use client'

import { useState } from 'react'
import { Service } from '../data/services'
import { motion } from 'framer-motion'

interface ServiceFormProps {
  onSubmit: (service: Service) => void
  initialService?: Service | null
}

export default function ServiceForm({ onSubmit, initialService }: ServiceFormProps) {
  const [formData, setFormData] = useState<Service>(
    initialService || {
      id: 0,
      name: '',
      description: '',
      icon: '💼',
      pricing: ''
    }
  )

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.name.trim()) newErrors.name = 'Service name is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <label className="block text-sm font-semibold text-white mb-2">Service Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Web Development"
          className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition duration-300 ${
            errors.name ? 'border-red-600 focus:border-red-600 focus:ring-red-600' : 'border-gray-600 focus:border-orange-500 focus:ring-orange-500'
          }`}
        />
        {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <label className="block text-sm font-semibold text-white mb-2">Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Service description"
          rows={4}
          className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition duration-300 resize-none ${
            errors.description ? 'border-red-600 focus:border-red-600 focus:ring-red-600' : 'border-gray-600 focus:border-orange-500 focus:ring-orange-500'
          }`}
        />
        {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <label className="block text-sm font-semibold text-white mb-2">Icon Emoji</label>
        <input
          type="text"
          name="icon"
          value={formData.icon}
          onChange={handleChange}
          placeholder="💼"
          maxLength={2}
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-center text-2xl"
        />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <label className="block text-sm font-semibold text-white mb-2">Pricing</label>
        <input
          type="text"
          name="pricing"
          value={formData.pricing}
          onChange={handleChange}
          placeholder="e.g., Custom Quote, $99/month"
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
        />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 btn-gradient text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
        >
          {initialService ? 'Update Service' : 'Create Service'}
        </button>
      </motion.div>
    </form>
  )
}
