'use client'

import { motion } from 'framer-motion'
import { usePortfolioData } from '@/app/admin/data-context'

export default function Services() {
  const { services } = usePortfolioData()

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

  return (
    <motion.main
      className="min-h-screen py-16 relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.h1 
          className="gradient-text text-4xl md:text-5xl font-extrabold mb-4 text-center text-white" 
          variants={itemVariants}
        >
          Services
        </motion.h1>
        <motion.p 
          className="text-center text-gray-400 mb-12 max-w-2xl mx-auto" 
          variants={itemVariants}
        >
          Professional services tailored to bring your ideas to life with quality and security at the forefront
        </motion.p>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
          variants={containerVariants}
        >
          {services.map((service) => (
            <motion.div 
              key={service.id}
              className="group theme-panel p-8 text-white transition-all duration-300 transform hover:-translate-y-1" 
              variants={itemVariants}
            >
              <h2 className="text-2xl font-semibold mb-4 text-white">{service.name}</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {service.description}
              </p>
              {service.pricing && (
                <div className="pt-4 border-t border-gray-700">
                  <p className="text-[#2E9BFF] font-semibold">{service.pricing}</p>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="theme-panel mt-16 text-center p-12" 
          variants={itemVariants}
        >
          <h2 className="gradient-text text-3xl md:text-4xl font-bold text-white mb-4">Ready to Work Together?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
            Let&apos;s discuss how I can help bring your project to life with professional development and security expertise.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center gap-2 btn-gradient text-white px-8 py-4 transition-all duration-300 font-semibold transform hover:-translate-y-0.5"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </motion.main>
  )
}
