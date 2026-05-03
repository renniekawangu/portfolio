'use client'

import { useState } from 'react'
import { Project } from '../data/projects'

interface ProjectFormProps {
  onSubmit: (project: Project) => void
  initialProject?: Project | null
}

export default function ProjectForm({ onSubmit, initialProject }: ProjectFormProps) {
  const [formData, setFormData] = useState<Project>(
    initialProject || {
      id: 0,
      title: '',
      description: '',
      technologies: [],
      link: '',
      status: 'planning'
    }
  )

  const [techInput, setTechInput] = useState('')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (formData.technologies.length === 0) newErrors.technologies = 'At least one technology is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()]
      }))
      setTechInput('')
    }
  }

  const removeTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-white mb-2">Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Project title"
          className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition duration-300 ${
            errors.title ? 'border-red-600 focus:border-red-600 focus:ring-red-600' : 'border-gray-600 focus:border-orange-500 focus:ring-orange-500'
          }`}
        />
        {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-white mb-2">Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Project description"
          rows={4}
          className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition duration-300 resize-none ${
            errors.description ? 'border-red-600 focus:border-red-600 focus:ring-red-600' : 'border-gray-600 focus:border-orange-500 focus:ring-orange-500'
          }`}
        />
        {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-white mb-2">Technologies *</label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
            placeholder="Add technology (e.g., React, Node.js)"
            className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
          <button
            type="button"
            onClick={addTechnology}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-colors"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.technologies.map((tech) => (
            <span key={tech} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm flex items-center gap-2">
              {tech}
              <button
                type="button"
                onClick={() => removeTechnology(tech)}
                className="text-red-400 hover:text-red-300 font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        {errors.technologies && <p className="text-red-400 text-sm mt-1">{errors.technologies}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-white mb-2">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          >
            <option value="planning">Planning</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-white mb-2">Project Link</label>
          <input
            type="url"
            name="link"
            value={formData.link || ''}
            onChange={handleChange}
            placeholder="https://example.com"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-white mb-2">GitHub URL</label>
          <input
            type="url"
            name="github"
            value={formData.github || ''}
            onChange={handleChange}
            placeholder="https://github.com/..."
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-white mb-2">Image URL</label>
        <input
          type="url"
          name="image"
          value={formData.image || ''}
          onChange={handleChange}
          placeholder="https://example.com/project-image.jpg"
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
        />
        {formData.image && (
          <div className="mt-3 relative w-full h-48 rounded-lg overflow-hidden border border-gray-600">
            <img
              src={formData.image}
              alt="Project preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22200%22 viewBox=%220 0 400 200%22%3E%3Crect width=%22400%22 height=%22200%22 fill=%22%23374151%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-family=%22sans-serif%22 font-size=%2216%22 fill=%22%239CA3AF%22%3EImage not found%3C/text%3E%3C/svg%3E'
              }}
            />
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 btn-gradient text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
        >
          {initialProject ? 'Update Project' : 'Create Project'}
        </button>
      </div>
    </form>
  )
}
