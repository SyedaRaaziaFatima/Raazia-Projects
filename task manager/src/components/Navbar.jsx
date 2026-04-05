import { Link } from 'react-router-dom'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { useState } from 'react'
import { useDarkMode } from '../context/DarkModeContext'

export default function Navbar({ transparent = false }) {
  const [isOpen, setIsOpen] = useState(false)
  const { isDark, toggleDarkMode } = useDarkMode()

  return (
    <nav className={`${transparent ? 'bg-transparent' : isDark ? 'bg-gray-900 border-gray-800' : 'bg-white'} ${isDark ? 'shadow-lg shadow-black' : 'shadow-lg'} sticky top-0 z-50 transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>TaskFlow</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition`}>Features</a>
            <a href="#pricing" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition`}>Pricing</a>
            <a href="#about" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition`}>About</a>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition ${isDark ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              title={isDark ? 'Light Mode' : 'Dark Mode'}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link to="/login" className={`px-4 py-2 ${isDark ? 'text-indigo-400 border border-indigo-400 hover:bg-indigo-400 hover:bg-opacity-10' : 'text-indigo-600 border border-indigo-600 hover:bg-indigo-50'} rounded-lg transition`}>Login</Link>
            <Link to="/dashboard" className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition">Get Started</Link>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition ${isDark ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className={`md:hidden pb-4 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <a href="#features" className={`block py-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Features</a>
            <a href="#pricing" className={`block py-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Pricing</a>
            <a href="#about" className={`block py-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>About</a>
            <Link to="/login" className={`block py-2 mt-4 px-4 ${isDark ? 'text-indigo-400 border border-indigo-400' : 'text-indigo-600 border border-indigo-600'} rounded-lg text-center`}>Login</Link>
          </div>
        )}
      </div>
    </nav>
  )
}
