export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-4">&copy; 2025 My Portfolio. All rights reserved.</p>
        <div className="flex justify-center space-x-6">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-300">
            GitHub
          </a>
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-300">
            LinkedIn
          </a>
          <a href="mailto:your.email@example.com" className="hover:text-white transition duration-300">
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}