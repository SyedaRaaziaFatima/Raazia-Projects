# TaskFlow - Task Manager Application

A modern, responsive task management web application built with React, Vite, and Tailwind CSS. TaskFlow helps you stay organized, focused, and productive with an intuitive interface and powerful features.

## 🚀 Features

- **Smart Task Management** - Organize tasks by projects, priorities, and due dates
- **Responsive Design** - Beautiful UI that works on desktop, tablet, and mobile
- **Modern SaaS UI** - Blue/purple gradient theme with card-based layouts
- **Dashboard Analytics** - Track your productivity with stats and insights
- **Task Creation** - Easy form with rich options for creating tasks
- **Time Tracking** - Monitor time spent on different tasks
- **Sidebar Navigation** - Quick access to all features

## 📁 Project Structure

```
task-manager/
├── api/                        # Serverless API routes
│   ├── tasks/
│   │   ├── index.js           # GET /api/tasks
│   │   ├── create.js          # POST /api/tasks/create
│   │   ├── delete.js          # DELETE /api/tasks/delete
│   │   └── update.js          # PUT /api/tasks/update
│   ├── _data.js               # Shared task storage
│   └── utils.js               # API utilities
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation bar
│   │   ├── Sidebar.jsx         # Sidebar navigation
│   │   ├── StatCard.jsx        # Stats display card
│   │   ├── TaskCard.jsx        # Task list card component
│   │   └── index.js            # Component exports
│   ├── pages/
│   │   ├── Landing.jsx         # Landing/home page
│   │   ├── Login.jsx           # Login page with split design
│   │   ├── Dashboard.jsx       # Main dashboard
│   │   ├── CreateTask.jsx      # Task creation page
│   │   └── index.js            # Page exports
│   ├── App.jsx                 # Main app component with routing
│   ├── index.css               # Tailwind & global styles
│   └── main.jsx                # Entry point
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json                 # Vercel configuration
├── .gitignore
├── .env.example
└── .env.vercel                 # Production environment variables
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool (fast HMR and optimized builds)
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Lucide React** - Icon library
- **JavaScript (ES6+)** - Modern JavaScript with hooks

## 📦 Installation

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Setup

1. Navigate to the project directory:
```bash
cd task-manager
```

2. Install dependencies (if not already done):
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
VITE_API_URL=http://localhost:3001
VITE_APP_TITLE=TaskFlow
```

## 🚀 Running the Application

### Development Server
```bash
npm run dev
```
The app will open automatically at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🗺️ Routing

- `/` - Landing page with features and CTA
- `/login` - Login page with split screen design
- `/dashboard` - Main dashboard with statistics and recent tasks
- `/create-task` - Create new task with full form

## 🎨 Design System

### Colors
- **Primary**: Indigo (`#6366f1`)
- **Secondary**: Purple (`#a855f7`)
- **Gradient**: Indigo to Purple
- **Background**: Light gray (`#f3f4f6`)

### Components
- **StatCard** - Displays metrics with icons
- **TaskCard** - Individual task display with status
- **Navbar** - Responsive navigation header
- **Sidebar** - Left navigation with active states
- **Forms** - Email/password inputs, task creation

## 🔄 Component Hierarchy

```
App
├── Navbar (Landing page only)
├── Sidebar (Dashboard & CreateTask only)
└── Routes
    ├── Landing
    │   └── Features & Footer
    ├── Login
    │   └── Form & Gradient Panel
    ├── Dashboard
    │   ├── StatCard (x4)
    │   └── TaskCard (x multiple)
    └── CreateTask
        ├── Task Form
        └── Right Panel (Projects, Tips, Avatars)
```

## 🧪 Sample Data

The dashboard comes with sample tasks to demonstrate functionality:
- Task statuses: pending, in-progress, completed
- Task priorities: low, medium, high
- Due dates displayed in readable format

## 🎯 Key Features Implementation

### Reusable Components
- All components use React hooks (useState, etc.)
- Props-based configuration
- Lucide icons for visual consistency

### Responsive Layout
- Mobile-first design approach
- Sidebar with mobile toggle
- Responsive grid layouts with Tailwind

### Modern UI/UX
- Smooth transitions and hover effects
- Gradient backgrounds and cards
- Clean typography hierarchy
- Icons for visual clarity

## 📝 Notes

- The app includes serverless API routes for Vercel deployment
- Frontend uses local state; backend routes use in-memory storage
- For production, add a database (PostgreSQL, MongoDB, Firebase)
- Lucide React provides high-quality, customizable SVG icons
- All styling is done with Tailwind CSS utility classes

## 🌐 API & Backend

This project includes fully functional serverless API routes compatible with Vercel:

### API Endpoints
- `GET /api/tasks` - Retrieve all tasks
- `POST /api/tasks/create` - Create a new task
- `PUT /api/tasks/update` - Update an existing task
- `DELETE /api/tasks/delete` - Delete a task

### Testing API Routes
```bash
# Start the dev server (includes API routes)
npm run dev

# Run tests in another terminal
node api-test.js
```

For detailed API documentation, see [API-DOCUMENTATION.md](API-DOCUMENTATION.md)

## 🚀 Deployment to Vercel

Deploy both frontend and serverless API to Vercel in minutes:

### Quick Deploy
```bash
npm i -g vercel
vercel login
vercel --prod
```

### Setup Steps
1. **Using Vercel CLI** (Recommended)
   ```bash
   vercel
   ```

2. **Using GitHub Integration**
   - Push code to GitHub
   - Connect to Vercel dashboard
   - Auto-deploy on push

### Environment Variables
Update `.env.vercel` with your deployment URL:
```
VITE_API_URL=https://your-project-name.vercel.app/api
```

For complete deployment guide, see [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)

## 🔐 Security Considerations

- Form inputs are validated on client and server side
- Environment variables are used for sensitive config
- CORS headers configured for API security
- Input sanitization implemented in API routes
- Recommended to add authentication for production

## 🚀 Future Enhancements

- ✓ Serverless API routes (Completed)
- ✓ Vercel deployment ready (Completed)
- Authentication system & user accounts
- Real database (PostgreSQL/MongoDB)
- Real-time collaboration with WebSockets
- Task sharing and team management
- Mobile app (React Native)
- Dark mode theme
- Task templates and automation
- Advanced analytics and reporting

## 📚 Documentation

- [API Documentation](API-DOCUMENTATION.md) - Complete API reference
- [Deployment Guide](DEPLOYMENT-GUIDE.md) - Vercel deployment instructions
- [README.md](README.md) - Project overview (this file)

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ using React, Vite, and Tailwind CSS**
