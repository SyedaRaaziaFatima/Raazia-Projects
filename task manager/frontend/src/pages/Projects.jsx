import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function Projects() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const navigate = useNavigate();

  const projects = [
    { id: 1, name: 'Marketing Strategy 2024', tasks: 12, members: 3, progress: 65 },
    { id: 2, name: 'Product Redesign', tasks: 8, members: 5, progress: 45 },
    { id: 3, name: 'Team Onboarding', tasks: 5, members: 2, progress: 80 },
  ];

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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Projects</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage all your projects in one place</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{project.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{project.tasks} tasks • {project.members} members</p>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="text-xs font-semibold text-primary">{project.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-primary"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
                <button className="w-full py-2 bg-gradient-light dark:bg-opacity-10 text-primary rounded-lg font-semibold hover:bg-opacity-80 dark:hover:bg-opacity-20 transition-colors">
                  View Project
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
