import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import { useNavigate } from 'react-router-dom';

export default function Analytics() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      <Navbar user={user} onLogout={handleLogout} />
      <Sidebar />

      <main className="ml-48 pt-20 px-8 pb-8">
        <div className="max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Analytics</h1>
            <p className="text-gray-600 dark:text-gray-400">Insights into your productivity and task management</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <StatCard title="Total Tasks" value="24" icon="📊" />
            <StatCard title="Completed" value="16" icon="✓" />
            <StatCard title="In Progress" value="5" icon="⚡" />
            <StatCard title="Completion Rate" value="67%" icon="📈" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Weekly Activity</h3>
              <div className="space-y-4">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                  <div key={day} className="flex items-center gap-3">
                    <span className="w-8 text-sm text-gray-600 dark:text-gray-400">{day}</span>
                    <div className="flex-1 h-8 bg-gray-100 dark:bg-gray-700 rounded relative overflow-hidden">
                      <div
                        className="h-full bg-gradient-primary"
                        style={{ width: `${Math.random() * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Tasks by Project</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Marketing Strategy 2024</span>
                  <span className="font-semibold text-gray-900 dark:text-white">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Product Redesign</span>
                  <span className="font-semibold text-gray-900 dark:text-white">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Team Onboarding</span>
                  <span className="font-semibold text-gray-900 dark:text-white">4</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
