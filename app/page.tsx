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
            <span className="inline-block bg-orange-600/10 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold border border-orange-600/20">Web Development & Cybersecurity</span>
          </motion.div>
          <motion.h1 className="text-5xl md:text-7xl font-extrabold mb-8 text-white leading-tight" variants={itemVariants}>
            Secure Web Applications Built with an <span className="gradient-text">Attacker&apos;s Mindset</span>
          </motion.h1>
          <motion.p className="text-xl md:text-2xl text-gray-300 mb-6 leading-relaxed max-w-3xl mx-auto" variants={itemVariants}>
            b34st web services helps businesses build, test, and secure web systems against real-world threats—before attackers find them.
          </motion.p>
          <motion.p className="text-lg text-gray-400 mb-12 leading-relaxed max-w-3xl mx-auto" variants={itemVariants}>
            Most developers build applications. I build and break them—so attackers can&apos;t. With hands-on offensive security experience, I identify vulnerabilities in access control, privilege escalation, API security, and more to ensure your systems are resilient against modern threats.
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center" variants={itemVariants}>
            <a href="/contact" className="group btn-gradient text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2">
               Get a Security Audit
            </a>
            <a href="/projects" className="group bg-gray-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2">
               View Our Work
            </a>
            <a href="/services" className="group border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-lg font-semibold hover:bg-gray-700 hover:border-gray-500 hover:text-white transition-all duration-300 flex items-center gap-2">
               Learn More
            </a>
          </motion.div>
        </section>
      </div>
    </motion.main>
  );
}
