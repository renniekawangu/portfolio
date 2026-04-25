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
    <header className="bg-gray-900 shadow-lg">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/b34st_logo.png"
            alt="b34st"
            width={45}
            height={45}
            priority
            className="h-12 w-12 object-contain opacity-90 hover:opacity-100 transition duration-300 drop-shadow-md"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li><Link href="/" className="text-gray-300 hover:text-orange-500 transition duration-300 font-medium">Home</Link></li>
          <li><Link href="/about" className="text-gray-300 hover:text-orange-500 transition duration-300 font-medium">About</Link></li>
          <li><Link href="/projects" className="text-gray-300 hover:text-orange-500 transition duration-300 font-medium">Projects</Link></li>
          <li><Link href="/blog" className="text-gray-300 hover:text-orange-500 transition duration-300 font-medium">Blog</Link></li>
          <li><Link href="/services" className="text-gray-300 hover:text-orange-500 transition duration-300 font-medium">Services</Link></li>
          <li><Link href="/contact" className="text-gray-300 hover:text-orange-500 transition duration-300 font-medium">Contact</Link></li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span className={`block w-5 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
            <span className={`block w-5 h-0.5 bg-white transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block w-5 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-gray-800 transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
        <ul className="px-4 py-4 space-y-4">
          <li><Link href="/" className="block text-gray-300 hover:text-white transition duration-300 font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
          <li><Link href="/about" className="block text-gray-300 hover:text-white transition duration-300 font-medium" onClick={() => setIsMenuOpen(false)}>About</Link></li>
          <li><Link href="/projects" className="block text-gray-300 hover:text-white transition duration-300 font-medium" onClick={() => setIsMenuOpen(false)}>Projects</Link></li>
          <li><Link href="/blog" className="block text-gray-300 hover:text-white transition duration-300 font-medium" onClick={() => setIsMenuOpen(false)}>Blog</Link></li>
          <li><Link href="/services" className="block text-gray-300 hover:text-white transition duration-300 font-medium" onClick={() => setIsMenuOpen(false)}>Services</Link></li>
          <li><Link href="/contact" className="block text-gray-300 hover:text-white transition duration-300 font-medium" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
        </ul>
      </div>
    </header>
  )
}