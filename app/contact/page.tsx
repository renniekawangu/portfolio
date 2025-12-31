'use client'

import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'
import { useState } from 'react'

export default function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('sending')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        setFormStatus('success')
        ;(e.target as HTMLFormElement).reset()
      } else {
        setFormStatus('error')
      }
      setTimeout(() => setFormStatus('idle'), 3000)
    } catch (error) {
      setFormStatus('error')
      setTimeout(() => setFormStatus('idle'), 3000)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center text-white">Get In Touch</h1>
        <p className="text-xl text-center text-gray-300 mb-12 max-w-2xl mx-auto">Have a project in mind or want to collaborate? I'd love to hear from you!</p>

        <div className="bg-gray-800/50 backdrop-blur-sm p-8 md:p-10 rounded-xl shadow-lg border border-gray-700">
          <form onSubmit={handleSubmit} className="mb-10">
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-200">Your Name</label>
              <input type="text" id="name" name="name" required placeholder="John Doe" className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-700/50 text-white placeholder-gray-500 transition-all duration-200" />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-200">Email Address</label>
              <input type="email" id="email" name="email" required placeholder="john@example.com" className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-700/50 text-white placeholder-gray-500 transition-all duration-200" />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-semibold mb-2 text-gray-200">Your Message</label>
              <textarea id="message" name="message" rows={6} required placeholder="Tell me about your project or inquiry..." className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-700/50 text-white placeholder-gray-500 transition-all duration-200 resize-none"></textarea>
            </div>
            <button 
              type="submit" 
              disabled={formStatus === 'sending'}
              className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white py-4 rounded-lg font-semibold hover:from-orange-500 hover:to-orange-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {formStatus === 'sending' ? '📤 Sending...' : formStatus === 'success' ? '✅ Message Sent!' : formStatus === 'error' ? '❌ Error Sending' : '📨 Send Message'}
            </button>
          </form>

          <div className="border-t border-gray-700 pt-8">
            <h2 className="text-2xl font-semibold mb-6 text-center text-white">Or Connect With Me</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:renniekawangu@gmail.com" className="flex items-center justify-center gap-3 bg-gray-700/50 hover:bg-gray-600 px-6 py-3 rounded-lg transition-all duration-300 text-gray-300 hover:text-white group">
                <FaEnvelope className="text-orange-400 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Email</span>
              </a>
              <a href="https://www.linkedin.com/in/rennie-kawangu-7a3195280/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-gray-700/50 hover:bg-gray-600 px-6 py-3 rounded-lg transition-all duration-300 text-gray-300 hover:text-white group">
                <FaLinkedin className="text-orange-400 group-hover:scale-110 transition-transform" />
                <span className="font-medium">LinkedIn</span>
              </a>
              <a href="https://github.com/renniekawangu" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-gray-700/50 hover:bg-gray-600 px-6 py-3 rounded-lg transition-all duration-300 text-gray-300 hover:text-white group">
                <FaGithub className="text-orange-400 group-hover:scale-110 transition-transform" />
                <span className="font-medium">GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}