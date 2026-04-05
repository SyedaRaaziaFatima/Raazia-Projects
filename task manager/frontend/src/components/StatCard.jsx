import React from 'react';

export default function StatCard({ icon, title, value, subtitle, bgColor = 'bg-gradient-light' }) {
  return (
    <div className={`${bgColor} dark:bg-gray-800 rounded-xl p-6 backdrop-blur-sm border border-gray-200 dark:border-gray-700`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h3>
          {subtitle && <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">{subtitle}</p>}
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  );
}
