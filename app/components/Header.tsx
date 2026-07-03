'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-900/80 bg-[#050708]/82 backdrop-blur-xl">
      <nav className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/b34st_logo.png"
            alt="b34st"
            width={40}
            height={40}
            priority
            className="h-11 w-11 rounded-lg border border-slate-800 bg-slate-950/80 object-contain shadow-lg shadow-blue-500/10"
          />
        </Link>

        <div className="hidden flex-1 justify-center md:flex">
          <ul className="flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-slate-300">
            <li><Link href="/" className="transition hover:text-white">Home</Link></li>
            <li><Link href="/services" className="transition hover:text-white">Services</Link></li>
            <li><Link href="/projects" className="transition hover:text-white">Our Work</Link></li>
            <li><Link href="/about" className="transition hover:text-white">About Us</Link></li>
            <li><Link href="/blog" className="transition hover:text-white">Blog</Link></li>
          </ul>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-lg border border-slate-700 bg-slate-950/95 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#2E9BFF]/50 hover:bg-slate-900 md:inline-flex"
          >
            Let&apos;s Talk
          </Link>

          <button
            onClick={toggleMenu}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-700 bg-slate-950/80 text-slate-100 transition hover:bg-slate-900 md:hidden"
            aria-label="Toggle menu"
          >
            <span className="sr-only">Toggle menu</span>
            <div className="relative h-5 w-5">
              <span className={`absolute left-0 top-0 h-0.5 w-full bg-slate-100 transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`} />
              <span className={`absolute left-0 top-1/2 h-0.5 w-full bg-slate-100 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 bottom-0 h-0.5 w-full bg-slate-100 transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`} />
            </div>
          </button>
        </div>
      </nav>

      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="border-t border-slate-800 bg-[#090A0E]/95 px-4 py-6 backdrop-blur-xl">
          <ul className="space-y-4 text-sm font-medium text-slate-200">
            <li><Link href="/" className="block transition hover:text-white" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><Link href="/services" className="block transition hover:text-white" onClick={() => setIsMenuOpen(false)}>Services</Link></li>
            <li><Link href="/projects" className="block transition hover:text-white" onClick={() => setIsMenuOpen(false)}>Our Work</Link></li>
            <li><Link href="/about" className="block transition hover:text-white" onClick={() => setIsMenuOpen(false)}>About Us</Link></li>
            <li><Link href="/blog" className="block transition hover:text-white" onClick={() => setIsMenuOpen(false)}>Blog</Link></li>
          </ul>
          <div className="mt-5">
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center btn-accent px-6 py-3 text-sm font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
