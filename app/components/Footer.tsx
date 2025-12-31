export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-2">Rennie Kawangu</h3>
            <p className="text-gray-400 text-sm">Full-Stack Developer & Security Specialist</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="https://github.com/renniekawangu" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400 transition-colors duration-300 font-medium">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/rennie-kawangu-7a3195280/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400 transition-colors duration-300 font-medium">
              LinkedIn
            </a>
            <a href="mailto:renniekawangu@gmail.com" className="text-gray-400 hover:text-orange-400 transition-colors duration-300 font-medium">
              Email
            </a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Rennie Kawangu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}