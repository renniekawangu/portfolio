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
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-16"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <motion.h1 className="text-4xl md:text-5xl font-extrabold mb-12 text-center text-white" variants={itemVariants}>My Projects</motion.h1>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants}>
          <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border border-gray-700 text-white" variants={itemVariants}>
            <h2 className="text-2xl font-semibold mb-3 text-gray-100">E-Commerce Store</h2>
            <p className="text-gray-300 mb-4">Full-stack e-commerce application built with React and Node.js, featuring secure payment processing and user authentication.</p>
            <a href="https://e-com-store-1ejc.onrender.com/" className="inline-block bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition duration-300">View Project</a>
          </motion.div>
          <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border border-gray-700 text-white" variants={itemVariants}>
            <h2 className="text-2xl font-semibold mb-3 text-gray-100">React2shell scanner/exploit</h2>
            <p className="text-gray-300 mb-4">React2shell is a NodeJS CLI scanner and exploit tool designed to identify vulnerabilities in web applications and perform automated exploitation.</p>
            <a href="https://github.com/renniekawangu/react2shell" className="inline-block bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition duration-300">View Project</a>
          </motion.div>
          <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border border-gray-700 text-white" variants={itemVariants}>
            <h2 className="text-2xl font-semibold mb-3 text-gray-100">School Management System</h2>
            <p className="text-gray-300 mb-4">A full-featured school management system built with modern web technologies to streamline administrative tasks and enhance communication. Built with EJS, Express, and MongoDB.</p>
            <a href="https://sms-kjd1.onrender.com/" className="inline-block bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition duration-300">View Project</a>
          </motion.div>
        </motion.div>
      </div>
    </motion.main>
  );
}