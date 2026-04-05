import { Link } from 'react-router-dom'
import { Navbar } from '../components'
import { CheckCircle2, Clock, Target } from 'lucide-react'
import { useDarkMode } from '../context/DarkModeContext'

export default function Landing() {
  const { isDark } = useDarkMode()

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      <Navbar transparent />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div>
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Stay productive,
              <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent"> organized, and focused</span>
            </h1>
            <p className={`text-xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              TaskFlow helps you manage your tasks efficiently with an intuitive interface and powerful features to boost your productivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/dashboard" className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:opacity-90 transition text-center">
                Get Started
              </Link>
              <Link to="/login" className={`px-8 py-3 border-2 border-indigo-500 rounded-lg font-semibold transition text-center ${isDark ? 'bg-gray-800 text-indigo-400 hover:bg-gray-700' : 'text-indigo-600 hover:bg-indigo-50'}`}>
                Sign In
              </Link>
            </div>
          </div>

          {/* Right Side - Illustration */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md">
              <div className={`bg-gradient-to-br ${isDark ? 'from-gray-800 to-gray-700' : 'from-purple-100 to-indigo-100'} rounded-3xl p-8 shadow-2xl`}>
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop"
                  alt="Task Manager Illustration"
                  className="w-full rounded-2xl object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-2xl opacity-60"></div>
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-2xl opacity-60"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 ${isDark ? 'bg-gray-800' : ''}`}>
        <h2 className={`text-4xl font-bold text-center mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Powerful Features
        </h2>
        <p className={`text-center mb-12 max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Everything you need to manage your tasks and stay on top of your goals.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className={`rounded-2xl p-8 shadow-lg hover:shadow-xl transition ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${isDark ? 'bg-indigo-900' : 'bg-indigo-100'}`}>
              <CheckCircle2 className="text-indigo-600" size={28} />
            </div>
            <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Smart Task Management</h3>
            <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              Organize your tasks by projects, priorities, and due dates. Never miss a deadline again.
            </p>
          </div>

          {/* Feature 2 */}
          <div className={`rounded-2xl p-8 shadow-lg hover:shadow-xl transition ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${isDark ? 'bg-purple-900' : 'bg-purple-100'}`}>
              <Clock className="text-purple-600" size={28} />
            </div>
            <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Time Tracking</h3>
            <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              Track how you spend your time and improve your productivity with detailed analytics.
            </p>
          </div>

          {/* Feature 3 */}
          <div className={`rounded-2xl p-8 shadow-lg hover:shadow-xl transition ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${isDark ? 'bg-blue-900' : 'bg-blue-100'}`}>
              <Target className="text-blue-600" size={28} />
            </div>
            <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Goal Tracking</h3>
            <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              Set and achieve your goals with milestone tracking and progress visualization.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-indigo-100 text-lg mb-8">
            Join thousands of users managing their tasks with TaskFlow.
          </p>
          <Link to="/dashboard" className="inline-block px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition">
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Team Section */}
      <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 ${isDark ? 'bg-gray-800' : ''}`}>
        <h2 className={`text-4xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Meet Our Team
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Card 1 - Muhammad Abdullah */}
          <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-3xl p-8 border-2 border-purple-500 hover:shadow-2xl transition">
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full border-4 border-purple-400 mb-6 overflow-hidden flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
                  alt="Muhammad Abdullah"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">Muhammad Abdullah</h3>
              
              <div className="inline-block bg-purple-600 text-purple-100 px-4 py-1 rounded-full text-sm font-semibold mb-4 flex items-center gap-2">
                <span>👑</span>
                Super Admin & Lead Developer
              </div>
              
              <p className="text-purple-200 mb-6 text-sm">
                Full-stack developer specializing in modern web technologies and scalable systems architecture.
              </p>
              
              <a
                href="https://muhammadabdullahwali.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full font-semibold hover:opacity-90 transition inline-flex items-center gap-2"
              >
                <span>→</span>
                View Portfolio
              </a>
            </div>
          </div>

          {/* Card 2 - Muhammad Waqar Anjum */}
          <div className="bg-gradient-to-br from-pink-900 to-purple-900 rounded-3xl p-8 border-2 border-pink-500 hover:shadow-2xl transition">
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full border-4 border-pink-400 mb-6 flex items-center justify-center bg-gradient-to-br from-pink-500 to-purple-500">
                <span className="text-5xl font-bold text-white">WA</span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">Muhammad Waqar Anjum</h3>
              
              <div className="inline-block bg-pink-600 text-pink-100 px-4 py-1 rounded-full text-sm font-semibold mb-4 flex items-center gap-2">
                <span>⭐</span>
                Lead Developer
              </div>
              
              <p className="text-pink-200 mb-6 text-sm">
                Creative developer with expertise in UI/UX design and frontend technologies.
              </p>
              
              <a
                href="https://thriving-palmier-89c5dc.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold hover:opacity-90 transition inline-flex items-center gap-2"
              >
                <span>→</span>
                View Portfolio
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${isDark ? 'bg-gray-950 text-gray-400' : 'bg-gray-900 text-gray-400'} py-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className={`font-bold mb-4 ${isDark ? 'text-gray-200' : 'text-white'}`}>TaskFlow</h3>
              <p className="text-sm">Your productivity companion.</p>
            </div>
            <div>
              <h3 className={`font-bold mb-4 ${isDark ? 'text-gray-200' : 'text-white'}`}>Product</h3>
              <ul className="text-sm space-y-2">
                <li><a href="#" className={`${isDark ? 'hover:text-gray-200' : 'hover:text-white'} transition`}>Features</a></li>
                <li><a href="#" className={`${isDark ? 'hover:text-gray-200' : 'hover:text-white'} transition`}>Pricing</a></li>
                <li><a href="#" className={`${isDark ? 'hover:text-gray-200' : 'hover:text-white'} transition`}>Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className={`font-bold mb-4 ${isDark ? 'text-gray-200' : 'text-white'}`}>Company</h3>
              <ul className="text-sm space-y-2">
                <li><a href="#" className={`${isDark ? 'hover:text-gray-200' : 'hover:text-white'} transition`}>About</a></li>
                <li><a href="#" className={`${isDark ? 'hover:text-gray-200' : 'hover:text-white'} transition`}>Blog</a></li>
                <li><a href="#" className={`${isDark ? 'hover:text-gray-200' : 'hover:text-white'} transition`}>Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className={`font-bold mb-4 ${isDark ? 'text-gray-200' : 'text-white'}`}>Legal</h3>
              <ul className="text-sm space-y-2">
                <li><a href="#" className={`${isDark ? 'hover:text-gray-200' : 'hover:text-white'} transition`}>Privacy</a></li>
                <li><a href="#" className={`${isDark ? 'hover:text-gray-200' : 'hover:text-white'} transition`}>Terms</a></li>
                <li><a href="#" className={`${isDark ? 'hover:text-gray-200' : 'hover:text-white'} transition`}>Cookie</a></li>
              </ul>
            </div>
          </div>
          <div className={`border-t pt-8 text-center text-sm ${isDark ? 'border-gray-700' : 'border-gray-800'}`}>
            <p>© 2026 TaskFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
