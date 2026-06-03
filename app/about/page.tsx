'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { usePortfolioData } from '@/app/admin/data-context'

export default function About() {
  const { skills } = usePortfolioData()

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

  const proficiencyColors = {
    'beginner': 'bg-blue-600/20 text-blue-400',
    'intermediate': 'bg-green-600/20 text-green-400',
    'advanced': 'bg-orange-600/20 text-orange-400',
    'expert': 'bg-red-600/20 text-red-400'
  }

  return (
    <motion.div
      className="min-h-screen py-16 relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Introduction Section */}
        <motion.section className="mb-20 max-w-4xl mx-auto" variants={containerVariants}>
          <motion.h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center text-white" variants={itemVariants}>
            Building Secure Systems with an <span className="gradient-text">Attacker&apos;s Mindset</span>
          </motion.h1>
          <motion.p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed text-center" variants={itemVariants}>
            I&apos;m a security-focused full-stack developer who helps organizations identify and eliminate vulnerabilities before attackers can exploit them. My approach combines offensive security expertise with modern development practices to create resilient, production-ready systems.
          </motion.p>
          <motion.p className="text-lg text-gray-400 leading-relaxed text-center" variants={itemVariants}>
            Every line of code I write is tested with the mindset of someone trying to break it. Every system I review is scrutinized through the lens of real-world attack vectors—because security that isn&apos;t tested is just hope.
          </motion.p>
        </motion.section>

        {/* Philosophy/Approach Section */}
        <motion.section className="mb-20 max-w-5xl mx-auto" variants={containerVariants}>
          <motion.h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-center text-white" variants={itemVariants}>
            My Security Philosophy
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-700 hover:border-orange-600/30 text-white transition-all duration-300 hover:shadow-xl" variants={itemVariants}>
              <div className="text-4xl mb-4 text-orange-500">01</div>
              <h3 className="text-xl font-semibold mb-3 text-white">Analyze</h3>
              <p className="text-gray-300">Deep dive into architecture, code, and infrastructure. Understand the system from the inside out before looking for weaknesses.</p>
            </motion.div>
            <motion.div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-700 hover:border-orange-600/30 text-white transition-all duration-300 hover:shadow-xl" variants={itemVariants}>
              <div className="text-4xl mb-4 text-orange-500">02</div>
              <h3 className="text-xl font-semibold mb-3 text-white">Attack</h3>
              <p className="text-gray-300">Methodically test every component with real-world attack scenarios. Identify not just what breaks, but why and what it means.</p>
            </motion.div>
            <motion.div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-700 hover:border-orange-600/30 text-white transition-all duration-300 hover:shadow-xl" variants={itemVariants}>
              <div className="text-4xl mb-4 text-orange-500">03</div>
              <h3 className="text-xl font-semibold mb-3 text-white">Secure</h3>
              <p className="text-gray-300">Provide clear, actionable recommendations. Help teams implement security fixes with practical guidance and proven patterns.</p>
            </motion.div>
          </div>
        </motion.section>

        {/* Credibility Section */}
        <motion.section className="mb-20 max-w-4xl mx-auto" variants={containerVariants}>
          <motion.h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-center text-white" variants={itemVariants}>
            Hands-On Security Experience
          </motion.h2>
          <motion.p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto" variants={itemVariants}>
            Proven track record identifying and responsibly disclosing real-world vulnerabilities
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700 text-white" variants={itemVariants}>
              <h3 className="text-orange-400 font-semibold mb-2">Vulnerability Classes Identified</h3>
              <p className="text-2xl font-bold text-white mb-1">Broken Access Control • Privilege Escalation • API Security Flaws • SQL Injection • XSS • Authentication Bypass</p>
              <p className="text-gray-400 text-sm">Real vulnerabilities found in production systems and responsible disclosure through bug bounty platforms</p>
            </motion.div>
            <motion.div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700 text-white" variants={itemVariants}>
              <h3 className="text-orange-400 font-semibold mb-2">Security Testing Expertise</h3>
              <p className="text-lg font-semibold text-white mb-2">Web Application Penetration Testing</p>
              <p className="text-gray-300 text-sm mb-4">Comprehensive security audits covering OWASP Top 10, API security, authentication systems, and infrastructure hardening</p>
              <p className="text-gray-400 text-xs italic">Testing performed on both authorized systems and verified bug bounty programs</p>
            </motion.div>
          </div>
        </motion.section>

        <motion.h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-center text-white" variants={itemVariants}>Skills & Expertise</motion.h2>
        <motion.p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto" variants={itemVariants}>A comprehensive overview of my technical capabilities and specializations</motion.p>
        <motion.div className="mb-16" variants={containerVariants}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill) => (
              <motion.div key={skill.id} className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-700 hover:border-gray-600 text-white transition-all duration-300 hover:shadow-xl" variants={itemVariants}>
                <motion.h3 className="text-2xl font-semibold mb-2 text-center text-white" variants={itemVariants}>{skill.category}</motion.h3>
                <motion.div className={`text-center text-xs font-semibold px-3 py-1 rounded-full mb-4 inline-block w-full ${proficiencyColors[skill.proficiency]}`}>
                  {skill.proficiency.charAt(0).toUpperCase() + skill.proficiency.slice(1)}
                </motion.div>
                <motion.ul className="space-y-2" variants={containerVariants}>
                  {skill.skills.map((s, idx) => (
                    <motion.li key={idx} variants={itemVariants} className="text-gray-300 flex items-start gap-2">
                      <span className="text-orange-500 mt-1">▹</span><span>{s}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="text-center mb-16" variants={itemVariants}>
          <a href="/assets/resume/resume.pdf" download className="inline-flex items-center gap-2 btn-gradient text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-lg transform hover:-translate-y-0.5">
            Download My Resume
          </a>
        </motion.div>

        <motion.h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-center text-white" variants={itemVariants}>Achievements & Certifications</motion.h2>
        <motion.p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto" variants={itemVariants}>Certifications and recognitions earned through continuous learning, hands-on security research, and competitive cybersecurity challenges</motion.p>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-8" variants={containerVariants}>
          <motion.div className="group border border-gray-700 p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm text-white hover:border-orange-600/30 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1" variants={itemVariants}>
            <div className="overflow-hidden rounded-lg mb-4">
              <Image src="/assets/achivements/cyberSec-1.png" alt="Cyber Security Certification" width={400} height={192} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Cybersecurity Fundamentals</h3>
            <p className="mb-3 text-gray-400 text-sm">Issued by <a href="https://wilsescybersecurity.com/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 transition-colors">Wilses Cyber Solution</a></p>
            <p className="text-gray-300 text-sm mb-4">Comprehensive certification covering security principles, threat analysis, and defensive strategies in modern infrastructure and applications.</p>
            <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors text-sm font-medium inline-flex items-center gap-1">View Certificate <span className="group-hover:translate-x-1 transition-transform">→</span></a>
          </motion.div>
          <motion.div className="group border border-gray-700 p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm text-white hover:border-orange-600/30 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1" variants={itemVariants}>
            <div className="overflow-hidden rounded-lg mb-4">
              <Image src="/assets/achivements/fullStackDev-1.png" alt="Full Stack Web Developer Certification" width={400} height={192} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Full Stack Web Development</h3>
            <p className="mb-3 text-gray-400 text-sm">Issued by <a href="https://www.scienceexplorationzambia.com" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 transition-colors">Science Exploration Zambia</a></p>
            <p className="text-gray-300 text-sm mb-4">Advanced training in modern web development spanning frontend frameworks, backend systems, databases, and deployment—with security integrated throughout.</p>
            <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors text-sm font-medium inline-flex items-center gap-1">View Certificate <span className="group-hover:translate-x-1 transition-transform">→</span></a>
          </motion.div>
          <motion.div className="group border border-gray-700 p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm text-white hover:border-orange-600/30 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1" variants={itemVariants}>
            <div className="overflow-hidden rounded-lg mb-4">
              <Image src="/assets/achivements/wwCtf25-1.png" alt="World Wide CTF 2025" width={400} height={192} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">World Wide CTF 2025</h3>
            <p className="mb-3 text-gray-400 text-sm">Issued by <a href="https://www.linkedin.com/company/worldwideflags" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 transition-colors">World Wide Flags</a></p>
            <p className="text-gray-300 text-sm mb-4">Competitive Capture The Flag (CTF) competition participation. Solved complex security challenges involving reverse engineering, cryptography, and exploitation techniques.</p>
            <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors text-sm font-medium inline-flex items-center gap-1">View Certificate <span className="group-hover:translate-x-1 transition-transform">→</span></a>
          </motion.div>
          <motion.div className="group border border-gray-700 p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm text-white hover:border-orange-600/30 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1" variants={itemVariants}>
            <div className="overflow-hidden rounded-lg mb-4">
              <Image src="/assets/achivements/bugbounty.jpeg" alt="Bug Bounty Achievement" width={400} height={192} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Bug Bounty Researcher</h3>
            <p className="mb-3 text-gray-400 text-sm">Active on <a href="https://zedbounty.com" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 transition-colors">Zedbounty</a> and other platforms</p>
            <p className="text-gray-300 text-sm mb-4">Actively identifying and responsibly disclosing security vulnerabilities in production systems. Verified researcher with a track record of finding critical and high-severity issues.</p>
            <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors text-sm font-medium inline-flex items-center gap-1">View Profile <span className="group-hover:translate-x-1 transition-transform">→</span></a>
          </motion.div>
        </motion.div>

        {/* Team Section */}
        <motion.div className="mt-20 max-w-6xl mx-auto" variants={containerVariants}>
          <motion.h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-white text-center" variants={itemVariants}>
            Meet the Team
          </motion.h2>
          <motion.p className="text-lg text-gray-400 mb-10 text-center" variants={itemVariants}>
            A group of passionate security professionals dedicated to protecting digital assets and building resilient systems.
          </motion.p>
            <motion.div className="flex justify-center" variants={containerVariants}>
            <motion.div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700 text-white max-w-xs" variants={itemVariants}>
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
              <Image src="/assets/team/cto.jpg" alt="Team Member 1" width={128} height={128} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold mb-1 text-white text-center">Rennie Kawangu</h3>
              <p className="text-gray-400 text-sm mb-2 text-center">Founder & CTO</p>
              <p className="text-gray-300 text-sm text-center">Full Stack Developer and Security Expert in web application security and penetration testing with over 3 years of experience.</p>
            </motion.div>
            </motion.div>
        </motion.div>

        {/* Closing CTA Section */}
        <motion.section className="mt-20 max-w-4xl mx-auto text-center" variants={containerVariants}>
          <motion.h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white" variants={itemVariants}>
            Ready to Secure Your Systems?
          </motion.h2>
          <motion.p className="text-lg text-gray-400 mb-10" variants={itemVariants}>
            Whether you need a comprehensive security audit, penetration testing, or secure development guidance—let&apos;s work together to build systems that are resilient against real threats.
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={itemVariants}>
            <a href="/contact" className="btn-gradient text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-2">
              Request a Security Audit
            </a>
            <a href="/projects" className="border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-lg font-semibold hover:bg-gray-700 hover:border-gray-500 hover:text-white transition-all duration-300 inline-flex items-center justify-center gap-2">
              See My Work
            </a>
          </motion.div>
        </motion.section>
      </div>
    </motion.div>
  )
}
