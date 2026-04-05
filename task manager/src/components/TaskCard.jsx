import { CheckCircle2, Circle, Trash2 } from 'lucide-react'
import { useDarkMode } from '../context/DarkModeContext'

export default function TaskCard({ task, onComplete, onDelete }) {
  const { isDark } = useDarkMode()

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return isDark ? 'text-green-400' : 'text-green-600'
      case 'in-progress': return isDark ? 'text-blue-400' : 'text-blue-600'
      case 'pending': return isDark ? 'text-gray-500' : 'text-gray-400'
      default: return isDark ? 'text-gray-500' : 'text-gray-400'
    }
  }

  return (
    <div className={`rounded-xl p-4 shadow-md hover:shadow-lg transition border-l-4 border-indigo-500 ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <button 
            onClick={() => onComplete(task.id)}
            className={`mt-1 transition ${getStatusColor(task.status)}`}
          >
            {task.status === 'completed' ? (
              <CheckCircle2 size={20} />
            ) : (
              <Circle size={20} />
            )}
          </button>
          <div className="flex-1">
            <h3 className={`font-semibold ${task.status === 'completed' ? isDark ? 'line-through text-gray-400' : 'line-through text-gray-400' : isDark ? 'text-white' : 'text-gray-900'}`}>
              {task.title}
            </h3>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{task.description}</p>
            <div className="flex items-center space-x-2 mt-3">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{task.dueDate}</span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => onDelete(task.id)}
          className={`p-2 transition ${isDark ? 'text-gray-500 hover:text-red-400' : 'text-gray-400 hover:text-red-600'}`}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  )
}
