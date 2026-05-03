'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { usePortfolioData } from '@/app/admin/data-context'

export default function Projects() {
  const { projects: allProjects } = usePortfolioData()
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'completed' | 'in-progress' | 'planning'>('all')

  const filteredProjects = selectedStatus === 'all' 
    ? allProjects 
    : allProjects.filter(p => p.status === selectedStatus)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const statusColors = {
    'completed': 'bg-green-600/20 text-green-400 border-green-600/30',
    'in-progress': 'bg-blue-600/20 text-blue-400 border-blue-600/30',
    'planning': 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30'
  }

  return (
    <motion.main
      className="min-h-screen py-16 relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.h1 
          className="text-4xl md:text-5xl font-extrabold mb-4 text-center text-white" 
          variants={itemVariants}
        >
          My Projects
        </motion.h1>
        <motion.p 
          className="text-center text-gray-400 mb-12 max-w-2xl mx-auto" 
          variants={itemVariants}
        >
          A showcase of my recent work in web development and security tools
        </motion.p>

        {/* Status Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12" 
          variants={itemVariants}
        >
          {(['all', 'completed', 'in-progress', 'planning'] as const).map(status => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                selectedStatus === status
                  ? 'btn-gradient text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 border border-gray-700 hover:border-gray-600'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
          variants={containerVariants}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              className="group bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-gray-600 text-white transform hover:-translate-y-1 overflow-hidden flex flex-col h-full"
              variants={itemVariants}
            >
              {/* Project Image */}
              {project.image && (
                <div className="relative w-full h-48 overflow-hidden bg-gray-700">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />
                </div>
              )}

              <div className="p-6 flex flex-col h-full">
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[project.status]}`}>
                    {project.status.replace('-', ' ').charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-2 text-white">{project.title}</h3>
                <p className="text-gray-300 mb-4 flex-grow">{project.description}</p>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                      key={tech}
                      className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 btn-gradient text-white px-4 py-2 rounded-lg font-semibold text-center hover:shadow-lg transition-all duration-300"
                  >
                    View Project
                  </a>
                )}
              </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-lg">No projects found for this status</p>
          </motion.div>
        )}
      </div>
    </motion.main>
  )
}
