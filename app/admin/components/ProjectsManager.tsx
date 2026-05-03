'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePortfolioData } from '@/app/admin/data-context'
import { Project } from '../data/projects'
import ProjectForm from './ProjectForm'

export default function ProjectsManager() {
  const { projects: projectsList, addProject, updateProject, deleteProject } = usePortfolioData()
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProjects = projectsList.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddProject = (project: Project) => {
    if (editingProject) {
      updateProject({ ...project, id: editingProject.id })
      setEditingProject(null)
    } else {
      addProject(project)
    }
    setShowForm(false)
  }

  const handleDeleteProject = (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      deleteProject(id)
    }
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    setShowForm(true)
  }

  return (
    <div className="space-y-4 md:space-y-8">
      <div
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0"
      >
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Projects</h2>
          <p className="text-gray-400 mt-1 text-sm md:text-base">Manage your portfolio projects</p>
        </div>
        <button
          onClick={() => {
            setEditingProject(null)
            setShowForm(true)
          }}
          className="w-full md:w-auto btn-gradient text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg text-sm md:text-base"
        >
          + New Project
        </button>
      </div>

      <input
        type="text"
        placeholder="Search projects..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition duration-300 text-sm md:text-base"
      />

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
                  {editingProject ? 'Edit Project' : 'New Project'}
                </h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>
              <ProjectForm
                onSubmit={handleAddProject}
                initialProject={editingProject}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div layout className="space-y-3 md:space-y-4">
        <div className="text-xs md:text-sm text-gray-400 mb-4">
          {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
        </div>
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-gray-800 border border-gray-700 rounded-lg p-3 md:p-6 hover:border-gray-600 transition-all duration-300"
            >
              <div className="flex flex-col gap-4">
                {project.image && (
                  <div className="relative w-full h-40 rounded-lg overflow-hidden border border-gray-700">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none'
                      }}
                    />
                  </div>
                )}
                <div className="flex flex-col md:flex-row justify-between items-start gap-3 md:gap-4">
                  <div className="flex-1 w-full">
                    <div className="flex items-center gap-2 md:gap-3 mb-2">
                      <span className={`px-2 md:px-3 py-1 text-xs rounded-full border font-medium ${
                        project.status === 'completed' ? 'bg-green-600/20 text-green-400 border-green-600/30' :
                        project.status === 'in-progress' ? 'bg-blue-600/20 text-blue-400 border-blue-600/30' :
                        'bg-gray-600/20 text-gray-400 border-gray-600/30'
                      }`}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-400 mb-3 text-sm md:text-base line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1 md:gap-2 mb-3">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                    <button
                      onClick={() => handleEditProject(project)}
                      className="flex-1 md:flex-none px-3 md:px-2 py-2 bg-blue-600/20 text-blue-400 border border-blue-600/30 rounded-lg hover:bg-blue-600/30 transition-colors duration-300 text-xs md:text-sm font-semibold"
                      title="Edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="flex-1 md:flex-none px-3 md:px-2 py-2 bg-red-600/20 text-red-400 border border-red-600/30 rounded-lg hover:bg-red-600/30 transition-colors duration-300 text-xs md:text-sm font-semibold"
                      title="Delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
