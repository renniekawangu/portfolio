export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-2">b34st Web Services</h3>
            <p className="text-gray-400 text-sm">Full-Stack Web Development & Security</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="https://instagram.com/rennie_kawangu" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400 transition-colors duration-300 font-medium">
              Instagram
            </a>
            <a href="https://facebook.com/rennie.kawangu" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400 transition-colors duration-300 font-medium">
              Facebook
            </a>
            <a href="hhttps://linkedin.com/in/rennie-kawangu" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400 transition-colors duration-300 font-medium">
              LinkedIn
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