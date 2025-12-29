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
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center text-white">Contact Me</h1>
        <p className="text-xl text-center text-gray-300 mb-12">Feel free to reach out for collaborations, opportunities, or just to say hello!</p>

        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-200">Name</label>
              <input type="text" id="name" name="name" required className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-700 text-white" />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-200">Email</label>
              <input type="email" id="email" name="email" required className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-700 text-white" />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-200">Message</label>
              <textarea id="message" name="message" rows={5} required className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-700 text-white"></textarea>
            </div>
            <button 
              type="submit" 
              disabled={formStatus === 'sending'}
              className="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-500 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {formStatus === 'sending' ? 'Sending...' : formStatus === 'success' ? 'Sent!' : formStatus === 'error' ? 'Error!' : 'Send Message'}
            </button>
          </form>

          <div>
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-100">Connect With Me</h2>
            <div className="space-y-4 text-center">
              <p className="text-gray-300 flex items-center justify-center gap-2">
                <FaEnvelope className="text-gray-400" />renniekawangu@gmail.com
              </p>
              <p className="text-gray-300 flex items-center justify-center gap-2">
                <FaLinkedin className="text-gray-400" /><a href="https://www.linkedin.com/in/rennie-kawangu-7a3195280/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:underline font-medium">LinkedIn</a>
              </p>
              <p className="text-gray-300 flex items-center justify-center gap-2">
                <FaGithub className="text-gray-400" /><a href="https://github.com/renniekawangu" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:underline font-medium">GitHub</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}