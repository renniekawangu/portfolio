'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function About() {
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
    <motion.div
      className="min-h-screen py-16 relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-center text-white" variants={itemVariants}>Skills & Expertise</motion.h2>
        <motion.p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto" variants={itemVariants}>A comprehensive overview of my technical capabilities and specializations</motion.p>
      <motion.div className="mb-16" variants={containerVariants}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-700 hover:border-gray-600 text-white transition-all duration-300 hover:shadow-xl" variants={itemVariants}>
            <motion.h3 className="text-2xl font-semibold mb-6 text-center text-white flex items-center justify-center gap-2" variants={itemVariants}><span className="text-3xl">💻</span> Full-Stack Development</motion.h3>
            <motion.ul className="space-y-3" variants={containerVariants}>
              <motion.li variants={itemVariants} className="text-gray-300 flex items-start gap-2"><span className="text-orange-500 mt-1">▹</span><span>Frontend: HTML5, CSS3, JavaScript, React</span></motion.li>
              <motion.li variants={itemVariants} className="text-gray-300 flex items-start gap-2"><span className="text-orange-500 mt-1">▹</span><span>Backend: Node.js, Express, Flask</span></motion.li>
              <motion.li variants={itemVariants} className="text-gray-300 flex items-start gap-2"><span className="text-orange-500 mt-1">▹</span><span>Databases: SQLite, MySQL, PostgreSQL</span></motion.li>
              <motion.li variants={itemVariants} className="text-gray-300 flex items-start gap-2"><span className="text-orange-500 mt-1">▹</span><span>RESTful API design & integration</span></motion.li>
              <motion.li variants={itemVariants} className="text-gray-300 flex items-start gap-2"><span className="text-orange-500 mt-1">▹</span><span>Authentication & Authorization (JWT, Sessions, Tokens)</span></motion.li>
              <motion.li variants={itemVariants} className="text-gray-300 flex items-start gap-2"><span className="text-orange-500 mt-1">▹</span><span>Secure file uploads & data handling</span></motion.li>
            </motion.ul>
          </motion.div>

          <motion.div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-700 hover:border-gray-600 text-white transition-all duration-300 hover:shadow-xl" variants={itemVariants}>
            <motion.h3 className="text-2xl font-semibold mb-6 text-center text-white flex items-center justify-center gap-2" variants={itemVariants}><span className="text-3xl">🔐</span> Cybersecurity & Bug Bounty</motion.h3>
            <motion.ul className="space-y-3" variants={containerVariants}>
              <motion.li variants={itemVariants} className="text-gray-300 flex items-start gap-2"><span className="text-orange-500 mt-1">▹</span><span>Web Application Penetration Testing</span></motion.li>
              <motion.li variants={itemVariants} className="text-gray-300 flex items-start gap-2"><span className="text-orange-500 mt-1">▹</span><span>API Security Testing</span></motion.li>
              <motion.li variants={itemVariants} className="text-gray-300 flex items-start gap-2"><span className="text-orange-500 mt-1">▹</span><span>Broken Access Control (BOLA/BIDOR)</span></motion.li>
              <motion.li variants={itemVariants} className="text-gray-300 flex items-start gap-2"><span className="text-orange-500 mt-1">▹</span><span>Privilege Escalation & Authorization Flaws</span></motion.li>
              <motion.li variants={itemVariants} className="text-gray-300 flex items-start gap-2"><span className="text-orange-500 mt-1">▹</span><span>Authentication & Session Management Vulnerabilities</span></motion.li>
              <motion.li variants={itemVariants} className="text-gray-300 flex items-start gap-2"><span className="text-orange-500 mt-1">▹</span><span>OWASP Top 10</span></motion.li>
              <motion.li variants={itemVariants} className="text-gray-300 flex items-start gap-2"><span className="text-orange-500 mt-1">▹</span><span>Burp Suite, Postman, Nmap</span></motion.li>
              <motion.li variants={itemVariants} className="text-gray-300 flex items-start gap-2"><span className="text-orange-500 mt-1">▹</span><span>Responsible Vulnerability Disclosure</span></motion.li>
            </motion.ul>
          </motion.div>

          <motion.div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-700 hover:border-gray-600 text-white transition-all duration-300 hover:shadow-xl" variants={itemVariants}>
            <motion.h3 className="text-2xl font-semibold mb-6 text-center text-white flex items-center justify-center gap-2" variants={itemVariants}><span className="text-3xl">🛠️</span> Tools & Technologies</motion.h3>
            <motion.ul className="space-y-3" variants={containerVariants}>
              <motion.li variants={itemVariants} className="text-gray-300 flex items-start gap-2"><span className="text-orange-500 mt-1">▹</span><span>Git & GitHub</span></motion.li>
              <motion.li variants={itemVariants} className="text-gray-300 flex items-start gap-2"><span className="text-orange-500 mt-1">▹</span><span>Linux (Kali Linux)</span></motion.li>
              <motion.li variants={itemVariants} className="text-gray-300 flex items-start gap-2"><span className="text-orange-500 mt-1">▹</span><span>Docker (basic)</span></motion.li>
              <motion.li variants={itemVariants} className="text-gray-300 flex items-start gap-2"><span className="text-orange-500 mt-1">▹</span><span>CI/CD fundamentals</span></motion.li>
              <motion.li variants={itemVariants} className="text-gray-300 flex items-start gap-2"><span className="text-orange-500 mt-1">▹</span><span>Secure coding best practices</span></motion.li>
            </motion.ul>
          </motion.div>
        </div>
      </motion.div>

      <motion.div className="text-center mb-16" variants={itemVariants}>
        <a href="/assets/resume/resume.pdf" download className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-orange-500 hover:to-orange-400 transition-all duration-300 shadow-lg hover:shadow-xl text-lg transform hover:-translate-y-0.5">
          📄 Download My Resume
        </a>
      </motion.div>

      <motion.h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-center text-white" variants={itemVariants}>Achievements & Certifications</motion.h2>
      <motion.p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto" variants={itemVariants}>Recognition and certifications earned through continuous learning and practical application</motion.p>
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8" variants={containerVariants}>
        <motion.div className="group border border-gray-700 p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm text-white hover:border-gray-600 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1" variants={itemVariants}>
          <div className="overflow-hidden rounded-lg mb-4">
            <Image src="/assets/achivements/cyberSec-1.png" alt="Certificate 1" width={400} height={192} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-white">Cyber Security</h3>
          <p className="mb-3 text-gray-400 text-sm">Issued by <a href="https://wilsescybersecurity.com/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 transition-colors">Wilses Cyber Solution</a></p>
          <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors text-sm font-medium inline-flex items-center gap-1">View Certificate <span className="group-hover:translate-x-1 transition-transform">→</span></a>
        </motion.div>
        <motion.div className="group border border-gray-700 p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm text-white hover:border-gray-600 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1" variants={itemVariants}>
          <div className="overflow-hidden rounded-lg mb-4">
            <Image src="/assets/achivements/fullStackDev-1.png" alt="Certificate 2" width={400} height={192} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-white">Full Stack Web Developer</h3>
          <p className="mb-3 text-gray-400 text-sm">Issued by <a href="https://www.scienceexplorationzambia.com" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 transition-colors">Science Exploration Zambia</a></p>
          <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors text-sm font-medium inline-flex items-center gap-1">View Certificate <span className="group-hover:translate-x-1 transition-transform">→</span></a>
        </motion.div>
        <motion.div className="group border border-gray-700 p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm text-white hover:border-gray-600 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1" variants={itemVariants}>
          <div className="overflow-hidden rounded-lg mb-4">
            <Image src="/assets/achivements/wwCtf25-1.png" alt="Certificate 3" width={400} height={192} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-white">World Wide CTF 2025</h3>
          <p className="mb-3 text-gray-400 text-sm">Issued by <a href="https://www.linkedin.com/company/worldwideflags" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 transition-colors">World Wide Flags</a></p>
          <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors text-sm font-medium inline-flex items-center gap-1">View Certificate <span className="group-hover:translate-x-1 transition-transform">→</span></a>
        </motion.div>
         <motion.div className="group border border-gray-700 p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm text-white hover:border-gray-600 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1" variants={itemVariants}>
          <div className="overflow-hidden rounded-lg mb-4">
            <Image src="/assets/achivements/bugbounty.jpeg" alt="Certificate 4" width={400} height={192} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-white">Bug Bounty</h3>
          <p className="mb-3 text-gray-400 text-sm">Issued by <a href="https://zedbounty.com" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 transition-colors">Zedbounty</a></p>
          <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors text-sm font-medium inline-flex items-center gap-1">View Certificate <span className="group-hover:translate-x-1 transition-transform">→</span></a>
        </motion.div>
      </motion.div>
      </div>
    </motion.div>
  );
}