import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/my-tasks', label: 'My Tasks', icon: '✓' },
    { path: '/projects', label: 'Projects', icon: '📁' },
    { path: '/calendar', label: 'Calendar', icon: '📅' },
    { path: '/analytics', label: 'Analytics', icon: '📈' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-48 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-screen fixed left-0 top-0 pt-20 flex flex-col">
      <div className="px-4 py-4">
        <Link
          to="/create-task"
          className="w-full flex items-center justify-center gap-2 bg-gradient-primary text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-shadow"
        >
          <span className="text-xl">+</span> New Task
        </Link>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              isActive(item.path)
                ? 'bg-gradient-light text-primary font-semibold border-l-4 border-primary'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
        <Link
          to="/settings"
          className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <span className="text-lg">⚙️</span>
          <span>Settings</span>
        </Link>
        <Link
          to="/help"
          className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <span className="text-lg">❓</span>
          <span>Help</span>
        </Link>
        <div className="px-3 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <div className="text-sm font-semibold dark:text-white">Alex Rivera</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Pro Plan</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
