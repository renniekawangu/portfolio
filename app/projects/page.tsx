'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'

interface Project {
  title: string
  description: string
  url: string
  images: string[]
  type: 'link' | 'github'
}

export default function Projects() {
  const projects: Project[] = [
    {
      title: 'E-Commerce Store',
      description: 'Full-stack e-commerce application built with React and Node.js, featuring secure payment processing and user authentication.',
      url: 'https://e-com-store-1ejc.onrender.com/',
      images: [
        '/assets/projects/ecom/ecom.jpg',
        '/assets/projects/ecom/products.png',
        '/assets/projects/ecom/login.png',
        '/assets/projects/ecom/admin_dashboard.png',
        '/assets/projects/ecom/profile.png',
        '/assets/projects/ecom/about.png',
        '/assets/projects/ecom/contact.png'
      ],
      type: 'link'
    },
    {
      title: 'React2shell Scanner',
      description: 'NodeJS CLI scanner and exploit tool designed to identify vulnerabilities in web applications and perform automated exploitation.',
      url: 'https://github.com/renniekawangu/react2shell',
      images: [
        '/assets/projects/react2shell/react2shell.jpg',
        '/assets/projects/react2shell/demo.jpg'
      ],
      type: 'github'
    },
    {
      title: 'School Management System',
      description: 'A full-featured school management system built with EJS, Express, and MongoDB to streamline administrative tasks and enhance communication.',
      url: 'https://sms-kjd1.onrender.com/',
      images: [
        '/assets/projects/sms/capri.jpg',
        '/assets/projects/sms/login.png',
        '/assets/projects/sms/admin_dashboard.png',
        '/assets/projects/sms/admin_dashboard1.png',
        '/assets/projects/sms/head_teacher_dashboard.png',
        '/assets/projects/sms/head_teacher_dashboard1.png',
        '/assets/projects/sms/teacher_dashboard.png',
        '/assets/projects/sms/student_dashboard.png',
        '/assets/projects/sms/accounts_dashboard.png',
        '/assets/projects/sms/profile.png',
        '/assets/projects/sms/about.png',
        '/assets/projects/sms/contact.png'
      ],
      type: 'link'
    }
  ]

  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null)
  const [imageIndices, setImageIndices] = useState<Record<number, number>>({})

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

  const nextImage = (projectIndex: number) => {
    setImageIndices(prev => ({
      ...prev,
      [projectIndex]: ((prev[projectIndex] || 0) + 1) % projects[projectIndex].images.length
    }))
  }

  const prevImage = (projectIndex: number) => {
    setImageIndices(prev => ({
      ...prev,
      [projectIndex]: ((prev[projectIndex] || 0) - 1 + projects[projectIndex].images.length) % projects[projectIndex].images.length
    }))
  }

  return (
    <motion.main
      className="min-h-screen py-16 relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center text-white" variants={itemVariants}>My Projects</motion.h1>
        <motion.p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto" variants={itemVariants}>A showcase of my recent work in web development and security tools</motion.p>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants}>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="group bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-gray-600 text-white transform hover:-translate-y-1 overflow-hidden flex flex-col h-full"
              variants={itemVariants}
            >
              {/* Image Container */}
              <div className="relative w-full bg-gray-900 overflow-hidden">
                {/* Main Image */}
                <div className="relative w-full h-56 cursor-pointer overflow-hidden" onClick={() => setSelectedProjectIndex(index)}>
                  <Image
                    src={project.images[imageIndices[index] || 0]}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-medium bg-orange-600 px-4 py-2 rounded-lg">View Gallery</span>
                  </div>
                </div>

                {/* Thumbnail Gallery */}
                {project.images.length > 1 && (
                  <div className="flex gap-2 p-2 bg-gray-900/80 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
                    {project.images.map((img, imgIndex) => (
                      <button
                        key={imgIndex}
                        onClick={(e) => {
                          e.stopPropagation()
                          setImageIndices(prev => ({ ...prev, [index]: imgIndex }))
                        }}
                        className={`relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden transition-all ${
                          (imageIndices[index] || 0) === imgIndex
                            ? 'ring-2 ring-orange-500 scale-105'
                            : 'opacity-60 hover:opacity-100'
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${project.title} ${imgIndex + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Content Container */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3">
                  <h2 className="text-2xl font-semibold text-gray-100">{project.title}</h2>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed flex-grow">{project.description}</p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gray-700 text-white px-5 py-2.5 rounded-lg hover:bg-gray-600 transition-all duration-300 group-hover:bg-orange-600 font-medium w-fit"
                >
                  View Live Project <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Image Modal */}
      {selectedProjectIndex !== null && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedProjectIndex(null)}
        >
          <motion.div
            className="relative max-w-5xl w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProjectIndex(null)}
              className="absolute -top-12 right-0 text-white text-3xl hover:text-orange-500 transition-colors z-50"
            >
              ✕
            </button>

            {/* Main Image */}
            <div className="relative w-full h-[60vh] bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={projects[selectedProjectIndex].images[imageIndices[selectedProjectIndex] || 0]}
                alt={projects[selectedProjectIndex].title}
                fill
                className="object-contain"
              />
              
              {projects[selectedProjectIndex].images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      prevImage(selectedProjectIndex)
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-full transition-all shadow-lg hover:scale-110"
                  >
                    ←
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage(selectedProjectIndex)
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-full transition-all shadow-lg hover:scale-110"
                  >
                    →
                  </button>

                  {/* Image Counter */}
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {(imageIndices[selectedProjectIndex] || 0) + 1} / {projects[selectedProjectIndex].images.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {projects[selectedProjectIndex].images.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-orange-600 scrollbar-track-gray-800">
                {projects[selectedProjectIndex].images.map((img, imgIndex) => (
                  <button
                    key={imgIndex}
                    onClick={() => setImageIndices(prev => ({ ...prev, [selectedProjectIndex]: imgIndex }))}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
                      (imageIndices[selectedProjectIndex] || 0) === imgIndex
                        ? 'ring-2 ring-orange-500 scale-105'
                        : 'opacity-50 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${projects[selectedProjectIndex].title} ${imgIndex + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="text-center text-gray-300 mt-4">
              <h3 className="text-xl font-semibold">{projects[selectedProjectIndex].title}</h3>
              <p className="text-sm text-gray-400 mt-1">{projects[selectedProjectIndex].description}</p>
            </div>
          </motion.div>
        </div>
      )}
    </motion.main>
  );
}