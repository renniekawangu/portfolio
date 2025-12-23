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
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 py-16">
        <section className="text-center max-w-4xl mx-auto">
          <motion.h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white" variants={itemVariants}>
            Welcome to My Portfolio
          </motion.h1>
          <motion.p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed" variants={itemVariants}>
            I am a Full-Stack Web Developer, Cybersecurity Specialist, and Bug Bounty Hunter with a strong passion for building secure, scalable, and high-performance web applications. I specialize in developing modern web systems while identifying and mitigating real-world security vulnerabilities before they can be exploited.
          </motion.p>
          <motion.p className="text-lg text-gray-400 mb-12 leading-relaxed" variants={itemVariants}>
            With hands-on experience in offensive security, I actively discover and responsibly disclose vulnerabilities such as Broken Access Control (BOLA/BIDOR), Privilege Escalation, Authentication Flaws, API Security Issues, and Client-Side Trust Vulnerabilities. I approach security with a practical, attacker-mindset, ensuring applications are resilient against modern threats.
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={itemVariants}>
            <a href="/about" className="bg-gray-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-600 transition duration-300 shadow-lg">
              Learn More About Me
            </a>
            <a href="/projects" className="border-2 border-gray-500 text-gray-300 px-8 py-3 rounded-full font-semibold hover:bg-gray-500 hover:text-white transition duration-300">
              View My Projects
            </a>
          </motion.div>
        </section>
      </div>
    </motion.main>
  );
}
