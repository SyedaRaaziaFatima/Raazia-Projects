import React from 'react';

export default function TaskCard({ task, onEdit, onDelete, onToggleStatus }) {
  const handleStatusToggle = async (e) => {
    e.preventDefault();
    const newStatus = task.status === 'Completed' ? 'To Do' : 'Completed';
    if (onToggleStatus) {
      await onToggleStatus(task._id, newStatus);
    }
  };

  return (
    <div className={`rounded-lg border p-4 hover:shadow-md transition-shadow ${
      task.status === 'Completed'
        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
    }`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={task.status === 'Completed'}
            onChange={handleStatusToggle}
            className="w-5 h-5 text-primary rounded cursor-pointer"
          />
          <h4 className={`font-semibold ${
            task.status === 'Completed'
              ? 'text-gray-500 dark:text-gray-400 line-through'
              : 'text-gray-900 dark:text-white'
          }`}>{task.title}</h4>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
          task.status === 'Completed'
            ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400'
            : task.status === 'In Progress'
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-400'
              : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-400'
        }`}>
          {task.status}
        </span>
      </div>

      <p className={`text-sm mb-3 ${
        task.status === 'Completed'
          ? 'text-gray-400 dark:text-gray-500'
          : 'text-gray-600 dark:text-gray-400'
      }`}>{task.description}</p>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded ${
            task.status === 'Completed'
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}>{task.project}</span>
          <span className={`${
            task.status === 'Completed'
              ? 'text-gray-400 dark:text-gray-500'
              : 'text-gray-500 dark:text-gray-400'
          }`}>{new Date(task.dueDate).toLocaleDateString()}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            ✎
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
