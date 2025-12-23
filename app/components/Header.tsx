import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white hover:text-gray-200 transition duration-300">My Portfolio</Link>
        <ul className="flex space-x-6">
          <li><Link href="/" className="text-white hover:text-gray-200 transition duration-300 font-medium">Home</Link></li>
          <li><Link href="/about" className="text-white hover:text-gray-200 transition duration-300 font-medium">About</Link></li>
          <li><Link href="/projects" className="text-white hover:text-gray-200 transition duration-300 font-medium">Projects</Link></li>
          <li><Link href="/contact" className="text-white hover:text-gray-200 transition duration-300 font-medium">Contact</Link></li>
        </ul>
      </nav>
    </header>
  )
}