'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { services as initialServices, Service } from '../data/services'
import ServiceForm from './ServiceForm'

export default function ServicesManager() {
  const [servicesList, setServicesList] = useState<Service[]>(initialServices)
  const [showForm, setShowForm] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)

  const handleAddService = (service: Service) => {
    if (editingService) {
      setServicesList(servicesList.map(s => s.id === service.id ? service : s))
      setEditingService(null)
    } else {
      setServicesList([{ ...service, id: Math.max(...servicesList.map(s => s.id), 0) + 1 }, ...servicesList])
    }
    setShowForm(false)
  }

  const handleDeleteService = (id: number) => {
    if (confirm('Are you sure you want to delete this service?')) {
      setServicesList(servicesList.filter(s => s.id !== id))
    }
  }

  const handleEditService = (service: Service) => {
    setEditingService(service)
    setShowForm(true)
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h2 className="text-3xl font-bold text-white">Services</h2>
          <p className="text-gray-400 mt-1">Manage your service offerings</p>
        </div>
        <button
          onClick={() => {
            setEditingService(null)
            setShowForm(true)
          }}
          className="btn-gradient text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
        >
          + New Service
        </button>
      </motion.div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-800 rounded-xl border border-gray-700 p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">
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

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {servicesList.map((service) => (
            <motion.div
              key={service.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-all duration-300"
            >
              <div className="flex justify-between items-start gap-4 mb-4">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{service.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-white">{service.name}</h3>
                    <p className="text-gray-400 text-sm mt-1">{service.description}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditService(service)}
                    className="p-2 bg-blue-600/20 text-blue-400 border border-blue-600/30 rounded-lg hover:bg-blue-600/30"
                    title="Edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteService(service.id)}
                    className="p-2 bg-red-600/20 text-red-400 border border-red-600/30 rounded-lg hover:bg-red-600/30"
                    title="Delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {service.pricing && (
                <p className="text-orange-400 font-semibold">{service.pricing}</p>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
