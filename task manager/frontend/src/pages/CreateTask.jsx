import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { tasksAPI } from '../services/api';

export default function CreateTask() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'To Do',
    dueDate: '',
    project: 'Marketing Strategy 2024',
    priority: 'Medium',
    assignee: {
      userId: user.id,
      name: user.name,
      avatar: user.avatar,
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const projects = [
    { name: 'Marketing Strategy 2024', color: 'blue' },
    { name: 'Product Redesign', color: 'red' },
    { name: 'Team Onboarding', color: 'blue' },
  ];

  const teamMembers = [
    { id: 1, name: 'Sarah Jenkins', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1', assigned: true },
    { id: 2, name: 'John Doe', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2' },
    { id: 3, name: 'Jane Smith', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await tasksAPI.create(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

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
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl">
          {/* Left Column - Form */}
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Task</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Add a new item to your kinetic sanctuary workflow.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Task Title */}
              <div>
                <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-2">TASK TITLE</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="What needs to be done?"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 border border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-2">DESCRIPTION</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Add some details or context about this task..."
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 border border-transparent focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                ></textarea>
              </div>

              {/* Due Date and Status */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-2">DUE DATE</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-2">STATUS</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="In Review">In Review</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-2">PRIORITY</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-2 bg-gradient-primary text-white font-semibold rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Task'}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Project Selection */}
            <div>
              <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-4">ATTACH TO PROJECT</label>
              <div className="space-y-2">
                {projects.map((project) => (
                  <button
                    key={project.name}
                    onClick={() => setFormData((prev) => ({ ...prev, project: project.name }))}
                    className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-colors ${
                      formData.project === project.name
                        ? 'border-primary bg-gradient-light dark:bg-opacity-20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-3 h-3 rounded-full ${
                          project.color === 'blue' ? 'bg-primary' : 'bg-red-500'
                        }`}
                      ></span>
                      <span className="font-medium text-gray-900 dark:text-white">{project.name}</span>
                      {formData.project === project.name && <span className="ml-auto">✓</span>}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Productivity Tip */}
            <div className="bg-gradient-primary rounded-xl p-6 text-white">
              <div className="flex items-start gap-3 mb-2">
                <span className="text-2xl">💡</span>
                <div>
                  <h3 className="font-semibold mb-2">Productivity Tip</h3>
                  <p className="text-sm leading-relaxed">
                    Breaking down complex tasks into smaller, actionable steps increases completion rate by 40%. Try to keep descriptions concise.
                  </p>
                </div>
              </div>
            </div>

            {/* Assignee */}
            <div>
              <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-4">ASSIGNEE</label>
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center gap-2 mb-4">
                  {teamMembers.map((member) => (
                    <button
                      key={member.id}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          assignee: {
                            userId: member.id,
                            name: member.name,
                            avatar: member.avatar,
                          },
                        }))
                      }
                      className="relative"
                    >
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className={`w-8 h-8 rounded-full border-2 ${
                          formData.assignee.userId === member.id
                            ? 'border-primary'
                            : 'border-gray-300'
                        }`}
                        title={member.name}
                      />
                    </button>
                  ))}
                  <button className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:border-primary hover:text-primary">
                    +
                  </button>
                </div>
                <div className="text-sm">
                  <p className="text-gray-600 dark:text-gray-400">Assigning to:</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{formData.assignee.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
