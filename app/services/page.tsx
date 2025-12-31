'use client'

import { motion } from 'framer-motion'

export default function Services() {
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
          className="text-4xl md:text-5xl font-extrabold mb-4 text-center text-white" 
          variants={itemVariants}
        >
          My Services
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
          <motion.div 
            className="group bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-gray-600 text-white transform hover:-translate-y-1" 
            variants={itemVariants}
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">💻</div>
            <h2 className="text-2xl font-semibold mb-4 text-white">Full-Stack Development</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Building modern, responsive web applications using cutting-edge technologies like React, Next.js, Node.js, and Express. From frontend to backend, I deliver complete solutions.
            </p>
            <ul className="text-gray-400 text-sm space-y-2.5">
              <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">▹</span><span>Frontend Development (React, Next.js)</span></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">▹</span><span>Backend APIs (Node.js, Express, Flask)</span></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">▹</span><span>Database Design & Integration</span></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">▹</span><span>RESTful API Development</span></li>
            </ul>
          </motion.div>

          <motion.div 
            className="group bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-gray-600 text-white transform hover:-translate-y-1" 
            variants={itemVariants}
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🔐</div>
            <h2 className="text-2xl font-semibold mb-4 text-white">Cybersecurity & Penetration Testing</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Comprehensive security assessments to identify vulnerabilities in your web applications and APIs. Helping businesses secure their digital assets with thorough testing and detailed reports.
            </p>
            <ul className="text-gray-400 text-sm space-y-2.5">
              <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">▹</span><span>Web Application Penetration Testing</span></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">▹</span><span>API Security Testing</span></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">▹</span><span>Vulnerability Assessment</span></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">▹</span><span>Security Code Review</span></li>
            </ul>
          </motion.div>

          <motion.div 
            className="group bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-gray-600 text-white transform hover:-translate-y-1" 
            variants={itemVariants}
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🚀</div>
            <h2 className="text-2xl font-semibold mb-4 text-white">DevOps & Deployment</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Streamline your development workflow with automated CI/CD pipelines, cloud deployments, and infrastructure management. Get your applications to production faster and more reliably.
            </p>
            <ul className="text-gray-400 text-sm space-y-2.5">
              <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">▹</span><span>Cloud Deployment (AWS, Render, Vercel)</span></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">▹</span><span>CI/CD Pipeline Setup</span></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">▹</span><span>Docker & Containerization</span></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">▹</span><span>Performance Optimization</span></li>
            </ul>
          </motion.div>

          <motion.div 
            className="group bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-gray-600 text-white transform hover:-translate-y-1" 
            variants={itemVariants}
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🎨</div>
            <h2 className="text-2xl font-semibold mb-4 text-white">UI/UX Design & Implementation</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Creating beautiful, intuitive user interfaces with modern design principles. Transforming ideas into pixel-perfect, responsive designs that provide excellent user experiences.
            </p>
            <ul className="text-gray-400 text-sm space-y-2.5">
              <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">▹</span><span>Responsive Web Design</span></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">▹</span><span>Tailwind CSS Implementation</span></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">▹</span><span>Animation & Interactions</span></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">▹</span><span>Design System Development</span></li>
            </ul>
          </motion.div>

          <motion.div 
            className="group bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-gray-600 text-white transform hover:-translate-y-1" 
            variants={itemVariants}
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🔧</div>
            <h2 className="text-2xl font-semibold mb-4 text-white">Technical Consulting</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Expert guidance on technology stack selection, architecture design, and best practices. Help your team make informed decisions and avoid common pitfalls in software development.
            </p>
            <ul className="text-gray-400 text-sm space-y-2.5">
              <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">▹</span><span>Architecture Planning</span></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">▹</span><span>Technology Stack Selection</span></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">▹</span><span>Code Review & Optimization</span></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">▹</span><span>Development Best Practices</span></li>
            </ul>
          </motion.div>

          <motion.div 
            className="group bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-gray-600 text-white transform hover:-translate-y-1" 
            variants={itemVariants}
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📱</div>
            <h2 className="text-2xl font-semibold mb-4 text-white">API Development & Integration</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Design and build robust APIs or integrate third-party services into your applications. Ensuring secure, scalable, and well-documented API solutions for your business needs.
            </p>
            <ul className="text-gray-400 text-sm space-y-2.5">
              <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">▹</span><span>RESTful API Design</span></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">▹</span><span>API Integration</span></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">▹</span><span>Authentication & Authorization</span></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 mt-0.5">▹</span><span>API Documentation</span></li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt-16 text-center bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-12" 
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Work Together?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
            Let's discuss how I can help bring your project to life with professional development and security expertise.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-4 rounded-lg hover:from-orange-500 hover:to-orange-400 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            💬 Get in Touch
          </a>
        </motion.div>
      </div>
    </motion.main>
  )
}
