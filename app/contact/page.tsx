import { FaLinkedin, FaGithub, FaFacebook, FaInstagram, FaEnvelope } from 'react-icons/fa'

export default function Contact() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-900 to-orange-900 py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Contact Me</h1>
        <p className="text-xl text-center text-gray-200 mb-12">Feel free to reach out for collaborations, opportunities, or just to say hello!</p>

        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <form action="https://formspree.io/f/your-form-id" method="POST" className="mb-8">
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
            <button type="submit" className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-yellow-700 hover:to-orange-700 transition duration-300">Send Message</button>
          </form>

          <div>
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-100">Other Ways to Reach Me</h2>
            <div className="space-y-4 text-center">
              <p className="text-gray-300 flex items-center justify-center gap-2">
                <FaEnvelope className="text-orange-400" /> Email: renniekawangu@gmail.com
              </p>
              <p className="text-gray-300 flex items-center justify-center gap-2">
                <FaLinkedin className="text-blue-400" /> LinkedIn: <a href="#" className="text-orange-400 hover:underline font-medium">Your LinkedIn</a>
              </p>
              <p className="text-gray-300 flex items-center justify-center gap-2">
                <FaGithub className="text-gray-300" /> GitHub: <a href="#" className="text-orange-400 hover:underline font-medium">Your GitHub</a>
              </p>
              <p className="text-gray-300 flex items-center justify-center gap-2">
                <FaFacebook className="text-blue-400" /> Facebook: <a href="#" className="text-orange-400 hover:underline font-medium">Your Facebook</a>
              </p>
              <p className="text-gray-300 flex items-center justify-center gap-2">
                <FaInstagram className="text-pink-400" /> Instagram: <a href="#" className="text-orange-400 hover:underline font-medium">Your Instagram</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}