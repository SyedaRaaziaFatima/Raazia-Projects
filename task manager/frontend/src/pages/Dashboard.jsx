import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import { tasksAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await tasksAPI.getAll();
      const completed = response.data.filter((task) => task.status === 'Completed');
      setCompletedTasks(completed.slice(0, 5));
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleDelete = async (id) => {
    try {
      await tasksAPI.delete(id);
      setTasks(tasks.filter((task) => task._id !== id));
      setCompletedTasks(completedTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleToggleStatus = async (taskId, newStatus) => {
    try {
      await tasksAPI.update(taskId, { status: newStatus });
      const updatedTasks = tasks.map((task) => 
        task._id === taskId ? { ...task, status: newStatus } : task
      );
      setTasks(updatedTasks);
      const completed = updatedTasks.filter((task) => task.status === 'Completed');
      setCompletedTasks(completed.slice(0, 5));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      <Navbar user={user} onLogout={handleLogout} />
      <Sidebar />

      <main className="ml-48 pt-20 px-8 pb-8">
        <div className="max-w-6xl">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Archived Success</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Everything you've conquered in the last 30 days. Your sanctuary of productivity history.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <StatCard
              title="MONTHLY PERFORMANCE"
              icon="📊"
              value="48"
              subtitle="Tasks finished this week"
              bgColor="bg-gradient-light"
            />

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-gray-600 text-sm font-medium mb-3">That's 12% more than last month.</p>
              <div className="h-40 flex items-end gap-2">
                {[30, 45, 35, 50, 60, 55, 70].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-light rounded-t-lg"
                    style={{ height: `${(height / 70) * 100}%` }}
                  ></div>
                ))}
              </div>
              <p className="text-xs text-gray-600 mt-2">Your flow is currently at an all-time high.</p>
              <div className="flex gap-2 mt-3">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=1"
                  alt=""
                  className="w-6 h-6 rounded-full"
                />
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=2"
                  alt=""
                  className="w-6 h-6 rounded-full -ml-2"
                />
                <span className="text-xs text-gray-600">Collaborated with the team</span>
              </div>
            </div>

            <div className="bg-gradient-primary rounded-xl p-6 text-white">
              <div className="text-sm font-semibold mb-4">Zen Level 4</div>
              <div className="text-center py-8">
                <div className="text-5xl mb-4">☮️</div>
                <p className="text-sm leading-relaxed">
                  Only 4 more tasks to reach level 5 <br /> Master Status.
                </p>
              </div>
            </div>
          </div>

          {/* Recent Completions */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Recent Completions</h2>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
                  Recently Finished
                </button>
                <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
                  Filter Project
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {completedTasks.length > 0 ? (
                completedTasks.map((task) => (
                  <div
                    key={task._id}
                    className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <input
                        type="checkbox"
                        checked={true}
                        onChange={() => handleToggleStatus(task._id, 'To Do')}
                        className="w-5 h-5 text-primary rounded cursor-pointer"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white line-through">{task.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mt-1">
                          <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{task.project}</span>
                          <span>📅 {new Date(task.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400 text-xs rounded-full font-medium">
                        COMPLETED
                      </span>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
                  <p className="text-gray-600 dark:text-gray-400">No completed tasks yet. Start creating tasks to get started!</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-8">
              <button className="px-2 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">←</button>
              <button className="w-8 h-8 bg-gradient-primary text-white rounded-lg font-semibold">1</button>
              <button className="w-8 h-8 text-gray-600 hover:bg-gray-100 rounded-lg">2</button>
              <button className="w-8 h-8 text-gray-600 hover:bg-gray-100 rounded-lg">3</button>
              <span className="text-gray-600">...</span>
              <button className="w-8 h-8 text-gray-600 hover:bg-gray-100 rounded-lg">12</button>
              <button className="px-2 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">→</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
