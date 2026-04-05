import { useDarkMode } from '../context/DarkModeContext'

export default function StatCard({ icon: Icon, label, value, color = 'indigo' }) {
  const { isDark } = useDarkMode()

  const colorClasses = {
    indigo: 'bg-indigo-50 text-indigo-600',
    purple: 'bg-purple-50 text-purple-600',
    green: 'bg-green-50 text-green-600',
    blue: 'bg-blue-50 text-blue-600',
  }

  const darkColorClasses = {
    indigo: 'bg-indigo-900/30 text-indigo-400',
    purple: 'bg-purple-900/30 text-purple-400',
    green: 'bg-green-900/30 text-green-400',
    blue: 'bg-blue-900/30 text-blue-400',
  }

  return (
    <div className={`rounded-2xl p-6 hover:shadow-xl transition ${isDark ? 'bg-gray-800 shadow-lg' : 'bg-white shadow-lg'}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{label}</p>
          <p className={`text-3xl font-bold mt-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</p>
        </div>
        <div className={`p-3 rounded-xl ${isDark ? darkColorClasses[color] : colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  )
}
