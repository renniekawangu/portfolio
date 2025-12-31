'use client'

import { motion } from 'framer-motion'

export default function Projects() {
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
        <motion.h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center text-white" variants={itemVariants}>My Projects</motion.h1>
        <motion.p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto" variants={itemVariants}>A showcase of my recent work in web development and security tools</motion.p>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants}>
          <motion.div className="group bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-gray-600 text-white transform hover:-translate-y-1" variants={itemVariants}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🛒</span>
              <h2 className="text-2xl font-semibold text-gray-100">E-Commerce Store</h2>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">Full-stack e-commerce application built with React and Node.js, featuring secure payment processing and user authentication.</p>
            <a href="https://e-com-store-1ejc.onrender.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gray-700 text-white px-5 py-2.5 rounded-lg hover:bg-gray-600 transition-all duration-300 group-hover:bg-orange-600 font-medium">View Project <span className="group-hover:translate-x-1 transition-transform">→</span></a>
          </motion.div>
          <motion.div className="group bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-gray-600 text-white transform hover:-translate-y-1" variants={itemVariants}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🔍</span>
              <h2 className="text-2xl font-semibold text-gray-100">React2shell Scanner</h2>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">NodeJS CLI scanner and exploit tool designed to identify vulnerabilities in web applications and perform automated exploitation.</p>
            <a href="https://github.com/renniekawangu/react2shell" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gray-700 text-white px-5 py-2.5 rounded-lg hover:bg-gray-600 transition-all duration-300 group-hover:bg-orange-600 font-medium">View Project <span className="group-hover:translate-x-1 transition-transform">→</span></a>
          </motion.div>
          <motion.div className="group bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-gray-600 text-white transform hover:-translate-y-1" variants={itemVariants}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🎓</span>
              <h2 className="text-2xl font-semibold text-gray-100">School Management System</h2>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">A full-featured school management system built with EJS, Express, and MongoDB to streamline administrative tasks and enhance communication.</p>
            <a href="https://sms-kjd1.onrender.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gray-700 text-white px-5 py-2.5 rounded-lg hover:bg-gray-600 transition-all duration-300 group-hover:bg-orange-600 font-medium">View Project <span className="group-hover:translate-x-1 transition-transform">→</span></a>
          </motion.div>
        </motion.div>
      </div>
    </motion.main>
  );
}