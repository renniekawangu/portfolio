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
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-16"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <motion.h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-center text-white" variants={itemVariants}>Skills</motion.h2>
      <motion.div className="mb-16" variants={containerVariants}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white" variants={itemVariants}>
            <motion.h3 className="text-2xl font-semibold mb-4 text-center text-gray-300" variants={itemVariants}>💻 Full-Stack Development</motion.h3>
            <motion.ul className="space-y-2" variants={containerVariants}>
              <motion.li variants={itemVariants} className="text-gray-300">Frontend: HTML5, CSS3, JavaScript, React</motion.li>
              <motion.li variants={itemVariants} className="text-gray-300">Backend: Node.js, Express, Flask</motion.li>
              <motion.li variants={itemVariants} className="text-gray-300">Databases: SQLite, MySQL, PostgreSQL</motion.li>
              <motion.li variants={itemVariants} className="text-gray-300">RESTful API design & integration</motion.li>
              <motion.li variants={itemVariants} className="text-gray-300">Authentication & Authorization (JWT, Sessions, Tokens)</motion.li>
              <motion.li variants={itemVariants} className="text-gray-300">Secure file uploads & data handling</motion.li>
            </motion.ul>
          </motion.div>

          <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white" variants={itemVariants}>
            <motion.h3 className="text-2xl font-semibold mb-4 text-center text-gray-300" variants={itemVariants}>🔐 Cybersecurity & Bug Bounty</motion.h3>
            <motion.ul className="space-y-2" variants={containerVariants}>
              <motion.li variants={itemVariants} className="text-gray-300">Web Application Penetration Testing</motion.li>
              <motion.li variants={itemVariants} className="text-gray-300">API Security Testing</motion.li>
              <motion.li variants={itemVariants} className="text-gray-300">Broken Access Control (BOLA/BIDOR)</motion.li>
              <motion.li variants={itemVariants} className="text-gray-300">Privilege Escalation & Authorization Flaws</motion.li>
              <motion.li variants={itemVariants} className="text-gray-300">Authentication & Session Management Vulnerabilities</motion.li>
              <motion.li variants={itemVariants} className="text-gray-300">OWASP Top 10</motion.li>
              <motion.li variants={itemVariants} className="text-gray-300">Burp Suite, Postman, Nmap</motion.li>
              <motion.li variants={itemVariants} className="text-gray-300">Responsible Vulnerability Disclosure</motion.li>
            </motion.ul>
          </motion.div>

          <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white" variants={itemVariants}>
            <motion.h3 className="text-2xl font-semibold mb-4 text-center text-gray-300" variants={itemVariants}>🛠️ Tools & Technologies</motion.h3>
            <motion.ul className="space-y-2" variants={containerVariants}>
              <motion.li variants={itemVariants} className="text-gray-300">Git & GitHub</motion.li>
              <motion.li variants={itemVariants} className="text-gray-300">Linux (Kali Linux)</motion.li>
              <motion.li variants={itemVariants} className="text-gray-300">Docker (basic)</motion.li>
              <motion.li variants={itemVariants} className="text-gray-300">CI/CD fundamentals</motion.li>
              <motion.li variants={itemVariants} className="text-gray-300">Secure coding best practices</motion.li>
            </motion.ul>
          </motion.div>
        </div>
      </motion.div>

      <motion.div className="text-center mb-16" variants={itemVariants}>
        <a href="/assets/resume/resume.pdf" download className="inline-block bg-orange-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-500 transition duration-300 shadow-lg text-lg">
          📄 Download My Resume
        </a>
      </motion.div>

      <motion.h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-center text-white" variants={itemVariants}>Achievements</motion.h2>
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8" variants={containerVariants}>
        <motion.div className="border border-gray-700 p-4 rounded bg-gray-800 text-white" variants={itemVariants}>
          <Image src="/assets/achivements/cyberSec-1.png" alt="Certificate 1" width={400} height={192} className="w-full h-48 object-cover mb-2" />
          <h3 className="text-xl font-semibold mb-2">Cyber Security</h3>
          <p className="mb-2">Issued by Issuer</p>
          <a href="#" className="text-blue-500">View Certificate</a>
        </motion.div>
        <motion.div className="border border-gray-700 p-4 rounded bg-gray-800 text-white" variants={itemVariants}>
          <Image src="/assets/achivements/fullStackDev-1.png" alt="Certificate 2" width={400} height={192} className="w-full h-48 object-cover mb-2" />
          <h3 className="text-xl font-semibold mb-2">Full Stack Web Developer</h3>
          <p className="mb-2">Issued by <a href="https://www.scienceexplorationzambia.com" className="text-blue-500">Science Exploration Zambia</a></p>
          <a href="#" className="text-blue-500">View Certificate</a>
        </motion.div>
        <motion.div className="border border-gray-700 p-4 rounded bg-gray-800 text-white" variants={itemVariants}>
          <Image src="/assets/achivements/wwCtf25-1.png" alt="Certificate 3" width={400} height={192} className="w-full h-48 object-cover mb-2" />
          <h3 className="text-xl font-semibold mb-2">World Wide CTF 2025</h3>
          <p className="mb-2">Issued by <a href="#" className="text-blue-500">World Wide Flags</a></p>
          <a href="#" className="text-blue-500">View Certificate</a>
        </motion.div>
         <motion.div className="border border-gray-700 p-4 rounded bg-gray-800 text-white" variants={itemVariants}>
          <Image src="/assets/achivements/bugbounty.jpeg" alt="Certificate 4" width={400} height={192} className="w-full h-48 object-cover mb-2" />
          <h3 className="text-xl font-semibold mb-2">BudBounty</h3>
          <p className="mb-2">Issued by <a href="https://zedbounty.com" className="text-blue-500">Zedbounty</a></p>
          <a href="#" className="text-blue-500">View Certificate</a>
        </motion.div>
      </motion.div>
      </div>
    </motion.div>
  );
}