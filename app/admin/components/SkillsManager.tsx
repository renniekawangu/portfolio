'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePortfolioData } from '@/app/admin/data-context'
import { Skill } from '../data/skills'
import SkillForm from './SkillForm'

export default function SkillsManager() {
  const { skills: skillsList, addSkill, updateSkill, deleteSkill } = usePortfolioData()
  const [showForm, setShowForm] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)

  const handleAddSkill = (skill: Skill) => {
    if (editingSkill) {
      updateSkill({ ...skill, id: editingSkill.id })
      setEditingSkill(null)
    } else {
      addSkill(skill)
    }
    setShowForm(false)
  }

  const handleDeleteSkill = (id: number) => {
    if (confirm('Are you sure you want to delete this skill category?')) {
      deleteSkill(id)
    }
  }

  const handleEditSkill = (skill: Skill) => {
    setEditingSkill(skill)
    setShowForm(true)
  }

  const proficiencyColors = {
    'beginner': 'bg-blue-600/20 text-blue-400 border-blue-600/30',
    'intermediate': 'bg-green-600/20 text-green-400 border-green-600/30',
    'advanced': 'bg-orange-600/20 text-orange-400 border-orange-600/30',
    'expert': 'bg-red-600/20 text-red-400 border-red-600/30'
  }

  return (
    <div className="space-y-4 md:space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0"
      >
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Skills</h2>
          <p className="text-gray-400 mt-1 text-sm md:text-base">Manage your technical skills and expertise</p>
        </div>
        <button
          onClick={() => {
            setEditingSkill(null)
            setShowForm(true)
          }}
          className="w-full md:w-auto btn-gradient text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg text-sm md:text-base"
        >
          + New Category
        </button>
      </motion.div>

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
                  {editingSkill ? 'Edit Skill Category' : 'New Skill Category'}
                </h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>
              <SkillForm
                onSubmit={handleAddSkill}
                initialSkill={editingSkill}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div layout className="space-y-3 md:space-y-4">
        <AnimatePresence>
          {skillsList.map((skill) => (
            <motion.div
              key={skill.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="bg-gray-800 border border-gray-700 rounded-lg p-3 md:p-6 hover:border-gray-600 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row justify-between items-start gap-3 md:gap-4 mb-4">
                <div className="flex-1 w-full">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3 mb-3">
                    <h3 className="text-lg md:text-xl font-bold text-white">{skill.category}</h3>
                    <span className={`px-2 md:px-3 py-1 text-xs rounded-full border font-medium ${proficiencyColors[skill.proficiency]}`}>
                      {skill.proficiency.charAt(0).toUpperCase() + skill.proficiency.slice(1)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 md:gap-2">
                    {skill.skills.map((s) => (
                      <span key={s} className="px-2 md:px-3 py-1 bg-gray-700 text-gray-300 text-xs md:text-sm rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <button
                    onClick={() => handleEditSkill(skill)}
                    className="flex-1 md:flex-none px-3 md:px-2 py-2 bg-blue-600/20 text-blue-400 border border-blue-600/30 rounded-lg hover:bg-blue-600/30 text-xs md:text-sm font-semibold"
                    title="Edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteSkill(skill.id)}
                    className="flex-1 md:flex-none px-3 md:px-2 py-2 bg-red-600/20 text-red-400 border border-red-600/30 rounded-lg hover:bg-red-600/30 text-xs md:text-sm font-semibold"
                    title="Delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
