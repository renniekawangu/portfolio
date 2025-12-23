'use client'

import { motion } from 'framer-motion'
import { FaLinkedin, FaGithub, FaFacebook, FaInstagram, FaEnvelope } from 'react-icons/fa'

export default function Contact() {
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
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center text-white" variants={itemVariants}>Contact Me</motion.h1>
        <motion.p className="text-xl text-center text-gray-300 mb-12" variants={itemVariants}>Feel free to reach out for collaborations, opportunities, or just to say hello!</motion.p>

        <motion.div className="bg-gray-800 p-8 rounded-lg shadow-lg" variants={itemVariants}>
          <form action="https://formspree.io/f/your-form-id" method="POST" className="mb-8">
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-200">Name</label>
              <input type="text" id="name" name="name" required className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-700 text-white" />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-200">Email</label>
              <input type="email" id="email" name="email" required className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-700 text-white" />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-200">Message</label>
              <textarea id="message" name="message" rows={5} required className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-700 text-white"></textarea>
            </div>
            <button type="submit" className="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-500 transition duration-300">Send Message</button>
          </form>

          <div>
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-100">Other Ways to Reach Me</h2>
            <div className="space-y-4 text-center">
              <p className="text-gray-300 flex items-center justify-center gap-2">
                <FaEnvelope className="text-gray-400" />renniekawangu@gmail.com
              </p>
              <p className="text-gray-300 flex items-center justify-center gap-2">
                <FaLinkedin className="text-gray-400" /><a href="https://www.linkedin.com/in/rennie-kawangu-7a3195280/" className="text-gray-400 hover:underline font-medium">LinkedIn</a>
              </p>
              <p className="text-gray-300 flex items-center justify-center gap-2">
                <FaGithub className="text-gray-400" /><a href="https://github.com/renniekawangu" className="text-gray-400 hover:underline font-medium">GitHub</a>
              </p>
              <p className="text-gray-300 flex items-center justify-center gap-2">
                <FaFacebook className="text-gray-400" /><a href="#" className="text-gray-400 hover:underline font-medium">Facebook</a>
              </p>
              <p className="text-gray-300 flex items-center justify-center gap-2">
                <FaInstagram className="text-gray-400" /><a href="#" className="text-gray-400 hover:underline font-medium">Instagram</a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}