'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePortfolioData } from '@/app/admin/data-context'
import { Service } from '../data/services'
import ServiceForm from './ServiceForm'

export default function ServicesManager() {
  const { services: servicesList, addService, updateService, deleteService } = usePortfolioData()
  const [showForm, setShowForm] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)

  const handleAddService = (service: Service) => {
    if (editingService) {
      updateService({ ...service, id: editingService.id })
      setEditingService(null)
    } else {
      addService(service)
    }
    setShowForm(false)
  }

  const handleDeleteService = (id: number) => {
    if (confirm('Are you sure you want to delete this service?')) {
      deleteService(id)
    }
  }

  const handleEditService = (service: Service) => {
    setEditingService(service)
    setShowForm(true)
  }

  return (
    <div className="space-y-4 md:space-y-8">
      <div
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0"
      >
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Services</h2>
          <p className="text-gray-400 mt-1 text-sm md:text-base">Manage your service offerings</p>
        </div>
        <button
          onClick={() => {
            setEditingService(null)
            setShowForm(true)
          }}
          className="w-full md:w-auto btn-gradient text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg text-sm md:text-base"
        >
          + New Service
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 md:p-4"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[95vh] md:max-h-[90vh] overflow-y-auto bg-gray-800 rounded-xl border border-gray-700 p-4 md:p-8"
            >
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  {editingService ? 'Edit Service' : 'New Service'}
                </h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>
              <ServiceForm
                onSubmit={handleAddService}
                initialService={editingService}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
        <AnimatePresence>
          {servicesList.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-gray-800 border border-gray-700 rounded-lg p-4 md:p-6 hover:border-gray-600 transition-all duration-300"
            >
              <div className="flex justify-between items-start gap-3 md:gap-4 mb-4">
                <div className="flex items-start gap-3 md:gap-4 flex-1 min-w-0">
                  <span className="text-2xl md:text-4xl flex-shrink-0">{service.icon}</span>
                  <div className="min-w-0">
                    <h3 className="text-lg md:text-xl font-bold text-white break-words">{service.name}</h3>
                    <p className="text-gray-400 text-xs md:text-sm mt-1 line-clamp-2">{service.description}</p>
                  </div>
                </div>
                <div className="flex gap-1 md:gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEditService(service)}
                    className="px-2 md:px-3 py-2 bg-blue-600/20 text-blue-400 border border-blue-600/30 rounded-lg hover:bg-blue-600/30 text-xs md:text-sm font-semibold"
                    title="Edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteService(service.id)}
                    className="px-2 md:px-3 py-2 bg-red-600/20 text-red-400 border border-red-600/30 rounded-lg hover:bg-red-600/30 text-xs md:text-sm font-semibold"
                    title="Delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {service.pricing && (
                <p className="text-orange-400 font-semibold text-sm md:text-base">{service.pricing}</p>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
