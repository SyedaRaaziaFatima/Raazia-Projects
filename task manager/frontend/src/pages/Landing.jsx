import React from 'react';
import { Link } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard';

export default function Landing() {
  return (
    <div className="bg-gradient-to-b from-white dark:from-gray-900 to-gray-50 dark:to-gray-950">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-4 border-b border-gray-200 dark:border-gray-800">
        <Link to="/" className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          TaskFlow
        </Link>
        <div className="flex gap-8 items-center">
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Home</a>
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Features</a>
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Security</a>
          <Link
            to="/login"
            className="px-6 py-2 text-primary font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-8 py-20 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-gradient-light text-primary rounded-full text-sm font-semibold">
                ✨ NEW: AI-POWERED WORKFLOWS
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Stay productive,
              <span className="block bg-gradient-primary bg-clip-text text-transparent">stay focused</span>.
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">
              Experience the kinetic sanctuary of modern task management. Organize projects, track progress, and collaborate seamlessly in an editorial-grade workspace.
            </p>
            <div className="flex gap-4">
              <Link
                to="/login"
                className="px-8 py-3 bg-gradient-primary text-white rounded-full font-semibold hover:shadow-lg transition-shadow"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-8 py-3 bg-gradient-light text-primary rounded-full font-semibold hover:shadow-lg transition-shadow"
              >
                Sign In
              </Link>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop" 
              alt="Task Manager"
              className="w-full h-auto rounded-2xl shadow-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-8 py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-center md:text-left mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Built for the modern workflow</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Stop juggling tools. TaskFlow combines everything you need into one cohesive sanctuary.
              </p>
            </div>

            <div className="grid gap-6">
              <div className="bg-gradient-light dark:bg-gradient-light dark:bg-opacity-10 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">☁️</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Cloud Sync</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Your sanctuary follows you. Access your tasks and projects across every device instantly.</p>
              </div>

              <div className="bg-gradient-primary rounded-xl p-6 text-white hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">👥</div>
                <h3 className="text-lg font-bold mb-2">Team Collab</h3>
                <p className="text-sm">Architected for collaboration. Share projects, assign tasks, and communicate seamlessly.</p>
              </div>

              <div className="bg-gradient-light dark:bg-gradient-light dark:bg-opacity-10 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">📊</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Smart Analytics</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Visualize progress with beautiful charts and data-driven insights into your productivity.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="px-8 py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Master your time with
              <span className="block bg-gradient-primary bg-clip-text text-transparent">architectural precision</span>.
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
              Join over 50,000 professionals who transformed their scattered lists into a streamlined Kinetic Sanctuary.
            </p>
            <div className="space-y-4">
              <div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white">99%</div>
                <div className="text-gray-600 dark:text-gray-400">Task Completion Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white">12h</div>
                <div className="text-gray-600 dark:text-gray-400">Saved Weekly / User</div>
              </div>
            </div>
          </div>

          <div>
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=500&fit=crop" 
              alt="Productivity Analytics"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-8 py-20 bg-gradient-to-b from-gray-900 to-gray-950 dark:from-gray-950 dark:to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Built by Talented Developers</h2>
            <p className="text-gray-400 text-lg">Meet the team behind TaskFlow</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Admin Card */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border-2 border-purple-500 hover:shadow-2xl hover:shadow-purple-500/50 transition-all cursor-pointer group"
              onClick={() => window.open('https://muhammadabdullahwali.vercel.app/', '_blank')}>
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="w-32 h-32 rounded-full border-4 border-purple-500 overflow-hidden mb-4 flex items-center justify-center bg-purple-600">
                    <img 
                      src="https://raw.githubusercontent.com/AbdullahWali79/AbdullahImages/main/Professional.jpeg" 
                      alt="Muhammad Abdullah"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 bg-yellow-400 text-white rounded-full p-2 text-2xl border-4 border-gray-900">👑</div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2 text-center">Muhammad Abdullah</h3>
                
                <div className="inline-flex items-center gap-2 px-4 py-1 bg-purple-900 rounded-full mb-4">
                  <span className="text-purple-400">⚙️</span>
                  <span className="text-purple-300 font-semibold text-sm">Super Admin & Lead Developer</span>
                </div>
                
                <p className="text-gray-400 text-center text-sm mb-6">
                  Full-stack developer specializing in modern web technologies and scalable systems architecture.
                </p>
                
                <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2 group-hover:scale-105">
                  <span>🔗</span>
                  View Portfolio
                </button>
              </div>
            </div>

            {/* User Card */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border-2 border-pink-500 hover:shadow-2xl hover:shadow-pink-500/50 transition-all cursor-pointer group"
              onClick={() => window.open('https://thriving-palmier-89c5dc.netlify.app/', '_blank')}>
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="w-32 h-32 rounded-full border-4 border-pink-500 overflow-hidden mb-4 flex items-center justify-center bg-pink-600">
                    <span className="text-5xl">👩‍💻</span>
                  </div>
                  <div className="absolute bottom-0 right-0 bg-purple-400 text-white rounded-full p-2 text-2xl border-4 border-gray-900">⭐</div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2 text-center">Muhammad Waqar Anjum</h3>
                
                <div className="inline-flex items-center gap-2 px-4 py-1 bg-purple-900 rounded-full mb-4">
                  <span className="text-purple-400">💻</span>
                  <span className="text-purple-300 font-semibold text-sm">Lead Developer</span>
                </div>
                
                <p className="text-gray-400 text-center text-sm mb-6">
                  Creative developer with expertise in UI/UX design and frontend technologies.
                </p>
                
                <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2 group-hover:scale-105">
                  <span>🔗</span>
                  View Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 dark:bg-black border-t border-gray-800 px-8 py-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm text-gray-400">
          <div>TaskFlow - Designed for Focus. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Product</a>
            <a href="#" className="hover:text-white transition-colors">Features</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
