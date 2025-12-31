'use client'

import { motion } from 'framer-motion'

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.main
      className="min-h-screen flex items-center relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 py-16 relative z-10">
        <section className="text-center max-w-5xl mx-auto">
          <motion.div className="mb-6" variants={itemVariants}>
            <span className="inline-block bg-orange-600/10 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold border border-orange-600/20">Full-Stack Developer & Security Specialist</span>
          </motion.div>
          <motion.h1 className="text-5xl md:text-7xl font-extrabold mb-8 text-white leading-tight" variants={itemVariants}>
            Hi, I'm <span className="gradient-text">Rennie Kawangu</span>
          </motion.h1>
          <motion.p className="text-xl md:text-2xl text-gray-300 mb-6 leading-relaxed max-w-3xl mx-auto" variants={itemVariants}>
            I'm a Full-Stack Web Developer, Cybersecurity Specialist, and Bug Bounty Hunter with a strong passion for building secure, scalable, and high-performance web applications.
          </motion.p>
          <motion.p className="text-lg text-gray-400 mb-12 leading-relaxed max-w-3xl mx-auto" variants={itemVariants}>
            With hands-on experience in offensive security, I actively discover and responsibly disclose vulnerabilities such as Broken Access Control, Privilege Escalation, and API Security Issues. I approach security with a practical, attacker-mindset, ensuring applications are resilient against modern threats.
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center" variants={itemVariants}>
            <a href="/assets/resume/resume.pdf" download className="group btn-gradient text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2">
               Download Resume
            </a>
            <a href="/about" className="group bg-gray-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2">
               About Me
            </a>
            <a href="/projects" className="group border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-lg font-semibold hover:bg-gray-700 hover:border-gray-500 hover:text-white transition-all duration-300 flex items-center gap-2">
               View Projects
            </a>
          </motion.div>
        </section>
      </div>
    </motion.main>
  );
}
