# QUICK START GUIDE - TaskFlow

## 🚀 Get Running in 5 Minutes

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Setup MongoDB

**Option A: Local MongoDB**
- Install MongoDB from https://www.mongodb.com/try/download/community
- Start MongoDB service
- `.env` is already configured for local MongoDB

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update `backend/.env`:
```
MONGODB_URI=mongodb+srv://youruser:yourpass@cluster.mongodb.net/taskflow
```

### Step 3: Start Backend Server
```bash
# In the backend directory
npm run dev
```

Wait for: `Server running on port 5000`

### Step 4: Install Frontend Dependencies (New Terminal)
```bash
cd frontend
npm install
```

### Step 5: Start Frontend Dev Server
```bash
# In the frontend directory
npm run dev
```

Visit: http://localhost:5173

### Step 6: Create Account & Login
1. Click "Get Started" on landing page
2. Sign up with your email
3. Login with credentials
4. Start creating tasks!

---

## 📝 Environment Files

### Backend `.env`
Located at: `backend/.env`
```
MONGODB_URI=mongodb://localhost:27017/taskflow
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### Frontend `.env` (Optional)
Located at: `frontend/.env.local`
```
VITE_API_URL=http://localhost:5000/api
```

---

## 🧪 Test the App

### Landing Page
- Visit: http://localhost:5173
- Look around, explore features

### Signup
- Click "Get Started"
- Fill in name, email, password
- Confirm password
- Click "Create Account"

### Dashboard
- View your tasks
- See productivity stats
- View completed tasks

### Create Task
- Click "+ New Task" in sidebar
- Fill in task details
- Select project
- Assign to team member
- Click "Save Task"

---

## 🔌 API Endpoints (for testing with Postman/curl)

### Auth
```
POST http://localhost:5000/api/auth/signup
POST http://localhost:5000/api/auth/login
GET http://localhost:5000/api/auth/me (requires bearer token)
```

### Tasks
```
GET http://localhost:5000/api/tasks (requires bearer token)
POST http://localhost:5000/api/tasks (requires bearer token)
PUT http://localhost:5000/api/tasks/:id (requires bearer token)
DELETE http://localhost:5000/api/tasks/:id (requires bearer token)
```

---

## 🛠️ Troubleshooting

### Port 5000 already in use
```bash
# Kill the process
# On Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -ti:5000 | xargs kill -9
```

### MongoDB connection failed
- Check/install MongoDB
- Verify connection string in `.env`
- Check firewall settings

### npm install fails
- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again

### Frontend won't connect to backend
- Verify backend is running: http://localhost:5000/api/health
- Check frontend `.env` has correct API URL
- Check CORS settings in backend `src/server.js`

---

## 📱 File Structure

```
task manager/
├── backend/              # Node.js + Express API
│   ├── src/
│   │   ├── models/      # MongoDB schemas
│   │   ├── routes/      # API endpoints
│   │   ├── middleware/  # Auth middleware
│   │   └── server.js    # Main server file
│   └── .env             # Config (edit this!)
│
└── frontend/            # React + Vite app
    ├── src/
    │   ├── pages/       # Page components
    │   ├── components/  # Reusable components
    │   └── services/    # API client
    └── package.json
```

---

## 🎯 What to Customize

1. **Change App Name**: Search for "TaskFlow" and replace
2. **Change Colors**: Edit `frontend/tailwind.config.js`
3. **Change API URL**: Edit `frontend/.env.local`
4. **Add More Projects**: Edit `CreateTask.jsx` projects array
5. **Add Team Members**: Edit `CreateTask.jsx` teamMembers array

---

## 📚 Useful Commands

### Frontend
```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
```

### Backend
```bash
npm run dev       # Start with nodemon
npm start         # Start production
```

---

## 🚀 Deploy to Production

### Frontend → Vercel
```bash
cd frontend
npm run build
# Push to GitHub, connect to Vercel
```

### Backend → Heroku
```bash
cd backend
# Create Procfile with: "web: node src/server.js"
heroku create taskflow-backend
git push heroku main
```

---

That's it! You're all set. Happy task managing! 🎉
