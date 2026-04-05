import { useState } from 'react'
import { Sidebar, Navbar } from '../components'
import { ChevronDown, Calendar, Lightbulb } from 'lucide-react'

export default function CreateTask() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'pending',
    priority: 'medium',
    project: 'personal',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Task Created:', formData)
    // Reset form
    setFormData({
      title: '',
      description: '',
      dueDate: '',
      status: 'pending',
      priority: 'medium',
      project: 'personal',
    })
    alert('Task created successfully!')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <div className="md:ml-64 flex flex-col">
        <div className="bg-white border-b border-gray-200 sticky top-0 z-20 px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Create New Task</h1>
        </div>

        <main className="flex-1 px-6 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left - Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Task Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter task title..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Add task details and notes..."
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </div>

                {/* Due Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Due Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-3.5 text-gray-400" size={18} />
                    <input
                      type="date"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* Dropdowns Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Status */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Status</label>
                    <div className="relative">
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white"
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" size={18} />
                    </div>
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Priority</label>
                    <div className="relative">
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" size={18} />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
                  >
                    Create Task
                  </button>
                  <button
                    type="button"
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>

            {/* Right - Panel */}
            <div className="space-y-6">
              {/* Project Selection */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">Project</h3>
                <div className="space-y-2">
                  {['Personal', 'Work', 'Side Project', 'Learning'].map((project) => (
                    <label key={project} className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <input
                        type="radio"
                        name="project"
                        value={project.toLowerCase().replace(' ', '-')}
                        checked={formData.project === project.toLowerCase().replace(' ', '-')}
                        onChange={handleChange}
                        className="mr-3"
                      />
                      <span className="text-gray-700">{project}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Productivity Tip */}
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
                <div className="flex items-center space-x-2 mb-3">
                  <Lightbulb size={20} />
                  <h3 className="font-bold">Pro Tip</h3>
                </div>
                <p className="text-indigo-100 text-sm">
                  Break down larger tasks into smaller, manageable subtasks. This increases completion rates and maintains motivation.
                </p>
              </div>

              {/* Assignees */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">Quick Assignees</h3>
                <div className="flex -space-x-2">
                  {[
                    { initials: 'JD', color: 'bg-indigo-500' },
                    { initials: 'SM', color: 'bg-purple-500' },
                    { initials: 'RA', color: 'bg-pink-500' },
                    { initials: 'LK', color: 'bg-blue-500' },
                  ].map((user, idx) => (
                    <div
                      key={idx}
                      className={`w-10 h-10 ${user.color} rounded-full flex items-center justify-center text-white text-sm font-bold border-2 border-white cursor-pointer hover:scale-110 transition`}
                      title={user.initials}
                    >
                      {user.initials}
                    </div>
                  ))}
                </div>
                <p className="text-gray-600 text-sm mt-3">Click avatars to assign</p>
              </div>

              {/* Task Template */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">Templates</h3>
                <div className="space-y-2">
                  {['Bug Fix', 'Feature', 'Documentation', 'Review'].map((template) => (
                    <button
                      key={template}
                      className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                    >
                      {template}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
