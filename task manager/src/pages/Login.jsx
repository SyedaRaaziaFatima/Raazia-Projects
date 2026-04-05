import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import { useState } from 'react'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }
    // Simulate login
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <Link to="/" className="flex items-center space-x-2 mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">T</span>
              </div>
              <span className="text-xl font-bold text-gray-900">TaskFlow</span>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-gray-700">Remember me</span>
              </label>
              <a href="#" className="text-indigo-600 hover:text-indigo-700">Forgot password?</a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center space-x-2"
            >
              <span>Sign In</span>
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-700 font-semibold">Sign up</a>
          </p>
        </div>
      </div>

      {/* Right Side - Gradient Design */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 items-center justify-center px-8">
        <div className="max-w-sm">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-20 mb-6">
            <div className="bg-white bg-opacity-20 rounded-xl p-4 mb-4">
              <div className="w-12 h-12 bg-white bg-opacity-30 rounded-lg"></div>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Organize Everything</h3>
            <p className="text-indigo-100 text-sm">Keep all your tasks in one place</p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-20 mb-6">
            <div className="bg-white bg-opacity-20 rounded-xl p-4 mb-4">
              <div className="w-12 h-12 bg-white bg-opacity-30 rounded-lg"></div>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Track Progress</h3>
            <p className="text-indigo-100 text-sm">Monitor your productivity and goals</p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-20">
            <div className="bg-white bg-opacity-20 rounded-xl p-4 mb-4">
              <div className="w-12 h-12 bg-white bg-opacity-30 rounded-lg"></div>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Stay Connected</h3>
            <p className="text-indigo-100 text-sm">Collaborate with your team seamlessly</p>
          </div>
        </div>
      </div>
    </div>
  )
}
