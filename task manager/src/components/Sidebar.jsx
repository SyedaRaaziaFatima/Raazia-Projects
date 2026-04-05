import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, CheckSquare, FolderOpen, Calendar, BarChart3, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useDarkMode } from '../context/DarkModeContext'

export default function Sidebar() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const { isDark } = useDarkMode()

  const isActive = (path) => location.pathname === path

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: CheckSquare, label: 'My Tasks', path: '/create-task' },
    { icon: FolderOpen, label: 'Projects', path: '/projects' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="fixed bottom-6 right-6 z-40 md:hidden p-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-screen w-64 pt-8 transition-all duration-200 z-30
        ${isOpen ? 'translate-x-0 md:translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}
        border-r
      `}>
        <div className="px-6 mb-8">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">T</span>
            </div>
            <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>TaskFlow</span>
          </Link>
        </div>

        <nav className="space-y-2 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg transition
                  ${isActive(item.path)
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                    : isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-6 left-4 right-4">
          <button className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}>
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)} 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
        />
      )}
    </>
  )
}
