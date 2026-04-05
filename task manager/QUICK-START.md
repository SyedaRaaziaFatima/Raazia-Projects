# Quick Start Guide - TaskFlow Task Manager

Get up and running with TaskFlow in minutes!

## 🚀 Installation

### 1. Install Dependencies
```bash
cd "c:\Users\hp\Desktop\task manager"
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

This starts:
- ✅ React development server on http://localhost:3000
- ✅ Serverless API routes on http://localhost:3000/api

### 3. Open in Browser
The app will automatically open at **http://localhost:3000**

---

## 📱 Using the Application

### Landing Page (`/`)
- View features and benefits
- Call-to-action buttons
- Footer with links

### Login Page (`/login`)
- Beautiful split-screen design
- Left: Login form
- Right: Gradient UI cards

Click "Get Started" or "Sign In" to proceed.

### Dashboard (`/dashboard`)
- View statistics (total, completed, pending tasks)
- See recent tasks
- Productivity tips
- Create new tasks button

### Create Task (`/create-task`)
- Fill out task form
- Select project
- Assign to team members
- View productivity tips
- Task templates

---

## 🔌 Using the API

The API provides CRUD operations for tasks.

### 1. Get All Tasks

**Frontend Code:**
```javascript
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Fetch all tasks
axios.get(`${API_URL}/tasks`)
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Design landing page",
      "description": "...",
      "status": "in-progress",
      "dueDate": "2026-03-15"
    }
  ],
  "count": 3
}
```

### 2. Create a Task

**Frontend Code:**
```javascript
const newTask = {
  title: 'Buy groceries',
  description: 'Milk, eggs, bread',
  status: 'pending',
  dueDate: '2026-04-10'
};

axios.post(`${API_URL}/tasks/create`, newTask)
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

**Response:**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": 4,
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "status": "pending",
    "dueDate": "2026-04-10",
    "createdAt": "2026-04-05T12:00:00.000Z"
  }
}
```

### 3. Update a Task

**Frontend Code:**
```javascript
const updates = {
  id: 1,
  status: 'completed',
  title: 'Updated title'
};

axios.put(`${API_URL}/tasks/update`, updates)
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

### 4. Delete a Task

**Frontend Code:**
```javascript
axios.delete(`${API_URL}/tasks/delete?id=1`)
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

## 🧪 Testing API Routes

### Automated Test Suite
```bash
npm run test:api
```

This runs all API tests:
- ✓ Get all tasks
- ✓ Create new task
- ✓ Update task
- ✓ Delete task
- ✓ Error handling

### Manual Testing with cURL

**Get all tasks:**
```bash
curl http://localhost:3000/api/tasks
```

**Create task:**
```bash
curl -X POST http://localhost:3000/api/tasks/create \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Task",
    "description": "Description",
    "status": "pending",
    "dueDate": "2026-04-15"
  }'
```

**Update task:**
```bash
curl -X PUT http://localhost:3000/api/tasks/update \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "status": "completed"
  }'
```

**Delete task:**
```bash
curl -X DELETE "http://localhost:3000/api/tasks/delete?id=1"
```

---

## 📂 Project Files Overview

### Frontend Files

**Pages:**
- `src/pages/Landing.jsx` - Landing/home page
- `src/pages/Login.jsx` - Login screen
- `src/pages/Dashboard.jsx` - Main dashboard
- `src/pages/CreateTask.jsx` - Task creation form

**Components:**
- `src/components/Navbar.jsx` - Navigation bar
- `src/components/Sidebar.jsx` - Side navigation
- `src/components/StatCard.jsx` - Stats display
- `src/components/TaskCard.jsx` - Task display

**Config:**
- `src/App.jsx` - Router setup
- `src/index.css` - Tailwind CSS
- `vite.config.js` - Vite configuration
- `tailwind.config.js` - Tailwind configuration

### Backend API Files

**Routes:**
- `api/tasks/index.js` - GET /api/tasks
- `api/tasks/create.js` - POST /api/tasks/create
- `api/tasks/update.js` - PUT /api/tasks/update
- `api/tasks/delete.js` - DELETE /api/tasks/delete

**Utilities:**
- `api/_data.js` - Task storage
- `api/utils.js` - Helper functions

**Config:**
- `vercel.json` - Vercel configuration

---

## 🔧 Environment Variables

### Development (.env.example)
```
VITE_API_URL=http://localhost:3000/api
VITE_APP_TITLE=TaskFlow
```

### Production (.env.vercel)
```
VITE_API_URL=https://task-manager.vercel.app/api
NODE_ENV=production
```

---

## 📦 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Test API endpoints
npm run test:api
```

---

## 🚀 Deploying to Production

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

Your app will be live at: `https://your-project-name.vercel.app`

For detailed deployment guide, see [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)

---

## 📚 Documentation

- [API Documentation](API-DOCUMENTATION.md) - Full API reference
- [Deployment Guide](DEPLOYMENT-GUIDE.md) - Vercel deployment
- [README](README.md) - Project overview

---

## 🆘 Troubleshooting

### Dev server not starting
```bash
# Clear node_modules and reinstall
rm -r node_modules
npm install
npm run dev
```

### API routes returning 404
```bash
# Make sure you're accessing the correct URL
# Development: http://localhost:3000/api/tasks
# Check that vite.config.js has 3000 as port
```

### CORS errors
- CORS headers are automatically set by Vercel and the routes
- Make sure API_URL in frontend matches your dev server

### Port already in use
```bash
# Use a different port
vite --port 3001
```

---

## 💡 Tips & Tricks

### Hot Module Replacement (HMR)
- Changes to React components are instantly reflected
- No need to refresh the page
- Changes to CSS are applied immediately

### Testing Task Creation
1. Go to `/create-task` page
2. Fill out the form
3. Click "Create Task"
4. See the new task in `/dashboard`

### Using Redux (Optional)
To add Redux for state management:
```bash
npm install redux react-redux @reduxjs/toolkit
```

### Adding TypeScript (Optional)
To add TypeScript support:
```bash
npm install --save-dev typescript @vitejs/plugin-react
# Update vite.config.js to include React plugin
```

---

## ✅ Next Steps

1. ✅ Install dependencies - `npm install`
2. ✅ Start dev server - `npm run dev`
3. ✅ Explore the app at http://localhost:3000
4. ✅ Test API routes - `npm run test:api`
5. ✅ Read API docs - [API-DOCUMENTATION.md](API-DOCUMENTATION.md)
6. ✅ Deploy to Vercel - [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)

---

## 🎉 You're All Set!

Your TaskFlow Task Manager is ready to use. Start creating tasks and enjoy a productive workflow! 🚀
