'use client'

import { useState } from 'react'
import { Skill } from '../data/skills'

interface SkillFormProps {
  onSubmit: (skill: Skill) => void
  initialSkill?: Skill | null
}

export default function SkillForm({ onSubmit, initialSkill }: SkillFormProps) {
  const [formData, setFormData] = useState<Skill>(
    initialSkill || {
      id: 0,
      category: '',
      skills: [],
      proficiency: 'intermediate'
    }
  )

  const [skillInput, setSkillInput] = useState('')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.category.trim()) newErrors.category = 'Category is required'
    if (formData.skills.length === 0) newErrors.skills = 'At least one skill is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }))
      setSkillInput('')
    }
  }

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-white mb-2">Category *</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="e.g., Frontend, Backend, Security"
          className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition duration-300 ${
            errors.category ? 'border-red-600 focus:border-red-600 focus:ring-red-600' : 'border-gray-600 focus:border-orange-500 focus:ring-orange-500'
          }`}
        />
        {errors.category && <p className="text-red-400 text-sm mt-1">{errors.category}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-white mb-2">Skills *</label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
            placeholder="Add skill"
            className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
          <button
            type="button"
            onClick={addSkill}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-colors"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.skills.map((skill) => (
            <span key={skill} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm flex items-center gap-2">
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="text-red-400 hover:text-red-300 font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        {errors.skills && <p className="text-red-400 text-sm mt-1">{errors.skills}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-white mb-2">Proficiency Level</label>
        <select
          name="proficiency"
          value={formData.proficiency}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
          <option value="expert">Expert</option>
        </select>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 btn-gradient text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
        >
          {initialSkill ? 'Update Category' : 'Create Category'}
        </button>
      </div>
    </form>
  )
}
