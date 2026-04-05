import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import { tasksAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function MyTasks() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    fetchTasks();
  }, [filter]);

  const fetchTasks = async () => {
    try {
      if (filter === 'all') {
        const response = await tasksAPI.getAll();
        setTasks(response.data);
      } else {
        const response = await tasksAPI.filterByStatus(filter);
        setTasks(response.data);
      }
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
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleToggleStatus = async (taskId, newStatus) => {
    try {
      await tasksAPI.update(taskId, { status: newStatus });
      setTasks(tasks.map((task) => 
        task._id === taskId ? { ...task, status: newStatus } : task
      ));
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
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">My Tasks</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-gradient-primary text-white'
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                All Tasks
              </button>
              <button
                onClick={() => setFilter('To Do')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'To Do'
                    ? 'bg-gradient-primary text-white'
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                To Do
              </button>
              <button
                onClick={() => setFilter('In Progress')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'In Progress'
                    ? 'bg-gradient-primary text-white'
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                In Progress
              </button>
              <button
                onClick={() => setFilter('Completed')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'Completed'
                    ? 'bg-gradient-primary text-white'
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                Completed
              </button>
            </div>
          </div>

          <div className="grid gap-4">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={() => navigate(`/create-task`)}
                  onDelete={handleDelete}
                  onToggleStatus={handleToggleStatus}
                />
              ))
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
                <div className="text-5xl mb-4">📋</div>
                <p className="text-gray-600 dark:text-gray-400 text-lg">No tasks found</p>
                <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">Create a new task to get started!</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
