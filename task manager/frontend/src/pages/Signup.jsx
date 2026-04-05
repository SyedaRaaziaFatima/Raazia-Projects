import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.signup(name, email, password);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Section - Form */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link to="/" className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              TaskFlow
            </Link>
            <p className="text-gray-600 text-sm mt-1">Kinetic Sanctuary</p>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600 mb-8">Join thousands of productive professionals today.</p>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-gray-900 mb-2">FULL NAME</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-900 mb-2">EMAIL ADDRESS</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-900 mb-2">PASSWORD</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-600 hover:text-gray-900"
                >
                  👁️
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-900 mb-2">CONFIRM PASSWORD</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                required
                className="w-4 h-4 text-primary rounded"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-primary hover:text-secondary font-semibold">
                  Terms of Service
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-primary text-white font-semibold rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>

            <button
              type="button"
              className="w-full py-3 bg-gradient-light text-primary font-semibold rounded-lg hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
            >
              <span>🔷</span> Sign up with Google
            </button>
          </form>

          <p className="text-center text-gray-700 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-semibold hover:text-secondary">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section - Gradient Card */}
      <div className="flex-1 bg-gradient-primary rounded-3xl m-4 flex flex-col items-center justify-center text-white p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-40 h-40 bg-white rounded-full opacity-10"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-white rounded-full opacity-10"></div>
        </div>

        <div className="relative z-10 text-center">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
              ⚡ JOIN THE KINETIC SANCTUARY
            </span>
          </div>

          <h2 className="text-5xl font-bold mb-8">Stay productive together</h2>

          <p className="text-lg text-white/80 mb-12 max-w-md mx-auto leading-relaxed">
            Join over 50,000 professionals who are transforming their workflow with TaskFlow.
          </p>

          <div className="space-y-4 mb-12">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-left">
              <div className="text-sm text-white/80 mb-1">Active Users</div>
              <div className="text-3xl font-bold">50,000+</div>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-left">
              <div className="text-sm text-white/80 mb-1">Tasks Completed</div>
              <div className="text-3xl font-bold">1M+</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" alt="" className="w-8 h-8 rounded-full border-2 border-white" />
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=2" alt="" className="w-8 h-8 rounded-full border-2 border-white -ml-2" />
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=3" alt="" className="w-8 h-8 rounded-full border-2 border-white -ml-2" />
            <span className="text-sm text-white/80 ml-2">Trusted by innovators worldwide.</span>
          </div>

          <div className="mt-8 text-xs text-white/60">
            TASKFLOW INC © 2024
          </div>
        </div>
      </div>
    </div>
  );
}
