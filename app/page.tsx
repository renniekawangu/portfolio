'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const features = [
  {
    title: 'Thoughtful Design',
    description: 'Design systems that feel premium and crystal clear across every screen.',
    icon: '01'
  },
  {
    title: 'Clean Code',
    description: 'Maintainable, secure codebases built for performance and long-term growth.',
    icon: '02'
  },
  {
    title: 'Ongoing Support',
    description: 'Reliable guidance, monitoring, and updates so your website stays strong.',
    icon: '03'
  }
]

export default function Home() {
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
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.main
      className="min-h-screen relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <section className="relative overflow-hidden border-b border-slate-800/80 bg-[#0A0A0A]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(46,155,255,0.16),_transparent_34%)] pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#0B1220] via-[#05050A] to-transparent opacity-70 pointer-events-none" />

        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <motion.div className="max-w-3xl" variants={itemVariants}>
              <div className="mb-8 inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-slate-300">
                Web Development & Cybersecurity
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold leading-tight text-white max-w-3xl">
                Secure websites built with an attacker&apos;s mindset.
              </h1>
              <p className="mt-6 max-w-2xl text-lg md:text-xl leading-8 text-slate-300">
                b34st web services helps businesses build, test, and secure web systems against real-world threats before attackers find them.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center btn-accent px-8 py-4 text-base font-semibold"
                >
                  Get a Security Audit
                </a>
                <a
                  href="/projects"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-950/70 px-8 py-4 text-base font-semibold text-white transition hover:border-[#2E9BFF]/50 hover:bg-slate-900"
                >
                  View Our Work
                </a>
              </div>
            </motion.div>

            <motion.div className="theme-panel relative overflow-hidden p-6 sm:p-8" variants={itemVariants}>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(46,155,255,0.13)_0%,_transparent_58%)]" />
              <div className="relative">
                <div className="relative aspect-square overflow-hidden rounded-lg border border-slate-800 bg-[#05080D]">
                  <Image
                    src="/b34st_logo.png"
                    alt="b34st Web Services brand artwork"
                    fill
                    sizes="(min-width: 1024px) 34vw, 92vw"
                    priority
                    className="object-cover opacity-90"
                  />
                </div>
                <div className="mt-6 space-y-4 text-slate-300">
                  <p className="theme-eyebrow">Featured work</p>
                  <h2 className="text-2xl font-semibold">Security-first websites with polished visual systems.</h2>
                  <p className="text-base leading-7 text-slate-400">
                    Every experience is crafted to feel premium, fast, and easy to manage, while keeping security front and center.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-[#0A0A0A] py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <p className="theme-eyebrow">What we bring to every project</p>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-white">Thoughtful websites, precise execution.</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <motion.article
                key={feature.title}
                className="theme-panel p-8 transition"
                variants={itemVariants}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#2E9BFF]/10 text-sm font-bold text-[#2E9BFF]">
                  {feature.icon}
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-400">{feature.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </motion.main>
  )
}
