'use client'
import { motion } from 'framer-motion'

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
        <motion.h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-center bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent" variants={itemVariants}>Skills</motion.h2>
      <motion.div className="mb-16" variants={containerVariants}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white" variants={itemVariants}>
            <motion.h3 className="text-2xl font-semibold mb-4 text-center text-green-400" variants={itemVariants}>💻 Full-Stack Development</motion.h3>
            <motion.ul className="space-y-2" variants={containerVariants}>
              <motion.li variants={itemVariants} className="text-gray-700">Frontend: HTML5, CSS3, JavaScript, React</motion.li>
              <motion.li variants={itemVariants} className="text-gray-700">Backend: Node.js, Express, Flask</motion.li>
              <motion.li variants={itemVariants} className="text-gray-700">Databases: SQLite, MySQL, PostgreSQL</motion.li>
              <motion.li variants={itemVariants} className="text-gray-700">RESTful API design & integration</motion.li>
              <motion.li variants={itemVariants} className="text-gray-700">Authentication & Authorization (JWT, Sessions, Tokens)</motion.li>
              <motion.li variants={itemVariants} className="text-gray-700">Secure file uploads & data handling</motion.li>
            </motion.ul>
          </motion.div>

          <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white" variants={itemVariants}>
            <motion.h3 className="text-2xl font-semibold mb-4 text-center text-blue-400" variants={itemVariants}>🔐 Cybersecurity & Bug Bounty</motion.h3>
            <motion.ul className="space-y-2" variants={containerVariants}>
              <motion.li variants={itemVariants} className="text-gray-700">Web Application Penetration Testing</motion.li>
              <motion.li variants={itemVariants} className="text-gray-700">API Security Testing</motion.li>
              <motion.li variants={itemVariants} className="text-gray-700">Broken Access Control (BOLA/BIDOR)</motion.li>
              <motion.li variants={itemVariants} className="text-gray-700">Privilege Escalation & Authorization Flaws</motion.li>
              <motion.li variants={itemVariants} className="text-gray-700">Authentication & Session Management Vulnerabilities</motion.li>
              <motion.li variants={itemVariants} className="text-gray-700">OWASP Top 10</motion.li>
              <motion.li variants={itemVariants} className="text-gray-700">Burp Suite, Postman, Nmap</motion.li>
              <motion.li variants={itemVariants} className="text-gray-700">Responsible Vulnerability Disclosure</motion.li>
            </motion.ul>
          </motion.div>

          <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white" variants={itemVariants}>
            <motion.h3 className="text-2xl font-semibold mb-4 text-center text-purple-400" variants={itemVariants}>🛠️ Tools & Technologies</motion.h3>
            <motion.ul className="space-y-2" variants={containerVariants}>
              <motion.li variants={itemVariants} className="text-gray-700">Git & GitHub</motion.li>
              <motion.li variants={itemVariants} className="text-gray-700">Linux (Kali Linux)</motion.li>
              <motion.li variants={itemVariants} className="text-gray-700">Docker (basic)</motion.li>
              <motion.li variants={itemVariants} className="text-gray-700">CI/CD fundamentals</motion.li>
              <motion.li variants={itemVariants} className="text-gray-700">Secure coding best practices</motion.li>
            </motion.ul>
          </motion.div>
        </div>
      </motion.div>

      <motion.h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-center bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent" variants={itemVariants}>Achievements</motion.h2>
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8" variants={containerVariants}>
        <motion.div className="border border-gray-700 p-4 rounded bg-gray-800 text-white" variants={itemVariants}>
          <img src="/assets/achivements/cyberSec-1.png" alt="Certificate 1" className="w-full h-48 object-cover mb-2" />
          <h3 className="text-xl font-semibold mb-2">Cyber Security</h3>
          <p className="mb-2">Issued by Issuer</p>
          <a href="#" className="text-blue-500">View Certificate</a>
        </motion.div>
        <motion.div className="border border-gray-700 p-4 rounded bg-gray-800 text-white" variants={itemVariants}>
          <img src="/assets/achivements/fullStackDev-1.png" alt="Certificate 2" className="w-full h-48 object-cover mb-2" />
          <h3 className="text-xl font-semibold mb-2">Full Stack Web Developer</h3>
          <p className="mb-2">Issued by Issuer</p>
          <a href="#" className="text-blue-500">View Certificate</a>
        </motion.div>
        <motion.div className="border border-gray-700 p-4 rounded bg-gray-800 text-white" variants={itemVariants}>
          <img src="/assets/achivements/wwCtf25-1.png" alt="Certificate 3" className="w-full h-48 object-cover mb-2" />
          <h3 className="text-xl font-semibold mb-2">World Wide CTF 2025</h3>
          <p className="mb-2">Issued by Issuer</p>
          <a href="#" className="text-blue-500">View Certificate</a>
        </motion.div>
         <motion.div className="border border-gray-700 p-4 rounded bg-gray-800 text-white" variants={itemVariants}>
          <img src="/assets/achivements/bugbounty.jpeg" alt="Certificate 3" className="w-full h-48 object-cover mb-2" />
          <h3 className="text-xl font-semibold mb-2">BudBounty</h3>
          <p className="mb-2">Issued by Issuer</p>
          <a href="#" className="text-blue-500">View Certificate</a>
        </motion.div>
      </motion.div>
      <p>Replace the placeholder images (/placeholder-certificate.jpg) with your actual certificate images and update the details.</p>
      </div>
    </motion.div>
  );
}