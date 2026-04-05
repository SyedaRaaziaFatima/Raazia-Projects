import { useState } from 'react'
import { Sidebar, StatCard, TaskCard, Navbar } from '../components'
import { Search, Plus, CheckCircle2, Clock, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useDarkMode } from '../context/DarkModeContext'

export default function Dashboard() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Design new landing page',
      description: 'Create a modern landing page for the new product',
      priority: 'high',
      status: 'in-progress',
      dueDate: 'Mar 15, 2026'
    },
    {
      id: 2,
      title: 'Fix login bugs',
      description: 'Address issues reported in the login flow',
      priority: 'medium',
      status: 'pending',
      dueDate: 'Mar 12, 2026'
    },
    {
      id: 3,
      title: 'Write documentation',
      description: 'Complete the API documentation',
      priority: 'low',
      status: 'completed',
      dueDate: 'Mar 10, 2026'
    },
    {
      id: 4,
      title: 'Review pull requests',
      description: 'Review pending code reviews from team',
      priority: 'high',
      status: 'pending',
      dueDate: 'Mar 11, 2026'
    },
  ])

  const handleCompleteTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
        : task
    ))
  }

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const stats = [
    { icon: CheckCircle2, label: 'Total Tasks', value: tasks.length, color: 'indigo' },
    { icon: Clock, label: 'In Progress', value: tasks.filter(t => t.status === 'in-progress').length, color: 'purple' },
    { icon: CheckCircle2, label: 'Completed', value: tasks.filter(t => t.status === 'completed').length, color: 'green' },
    { icon: AlertCircle, label: 'Pending', value: tasks.filter(t => t.status === 'pending').length, color: 'blue' },
  ]

  const { isDark } = useDarkMode()

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      <Sidebar />

      <div className="md:ml-64 flex flex-col">
        {/* Top Navbar */}
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-20 transition-colors duration-200`}>
          <div className="px-6 py-4 flex items-center justify-between">
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className={`hidden sm:flex items-center rounded-lg px-4 py-2 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <Search className={isDark ? 'text-gray-400' : 'text-gray-400'} size={18} />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  className={`bg-transparent ml-2 outline-none ${isDark ? 'text-gray-200 placeholder-gray-500' : 'text-gray-700'}`}
                />
              </div>
              <Link
                to="/create-task"
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition"
              >
                <Plus size={18} />
                <span>New Task</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 px-6 py-8">
          {/* Stats Section */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
                color={stat.color}
              />
            ))}
          </div>

          {/* Recent Tasks */}
          <div className={`rounded-2xl shadow-lg p-6 mb-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Recent Tasks</h2>
              <Link to="/create-task" className={`font-semibold ${isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'}`}>
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {tasks.length > 0 ? (
                tasks.slice(0, 4).map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onComplete={handleCompleteTask}
                    onDelete={handleDeleteTask}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No tasks yet. Create one to get started!</p>
                  <Link
                    to="/create-task"
                    className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition"
                  >
                    Create Task
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Upcoming Tasks */}
            <div className={`rounded-2xl shadow-lg p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Upcoming Deadlines</h3>
              <div className="space-y-3">
                {tasks.filter(t => t.status !== 'completed').slice(0, 3).map(task => (
                  <div key={task.id} className={`flex items-start justify-between p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div>
                      <p className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{task.title}</p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{task.dueDate}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Productivity Tip */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-2">💡 Productivity Tip</h3>
              <p className="text-indigo-100 mb-4">
                Try the Pomodoro technique! Work in 25-minute sprints with 5-minute breaks to maintain focus and reduce burnout.
              </p>
              <p className="text-indigo-200 text-sm">
                Tip of the day • 🚀 Keep improving your workflow daily
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
