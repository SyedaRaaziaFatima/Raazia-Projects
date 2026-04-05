# TaskFlow - Full Stack Task Manager

A modern, responsive task management application built with React, Node.js, and MongoDB.

## 🎨 Features

- ✅ **Beautiful UI** - Modern SaaS design with Tailwind CSS
- 🔐 **Authentication** - Secure login/signup with JWT
- 📝 **Task Management** - Create, read, update, delete tasks
- 👥 **Team Collaboration** - Assign tasks to team members
- 📊 **Dashboard** - View task statistics and completions
- 🎯 **Project Organization** - Organize tasks by projects
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🌈 **Purple/Blue Gradient Theme** - Modern gradient UI

## 📋 Prerequisites

- Node.js v14+ and npm
- MongoDB (Atlas or local)
- Git (optional)

## 🚀 Quick Start

### 1. Clone or Download the Project

```bash
cd "c:\Users\hp\Desktop\task manager"
```

### 2. Setup Backend

```bash
cd backend
npm install
```

**Configure MongoDB:**

Create a `.env` file in the `backend` directory:

```env
MONGODB_URI=mongodb://localhost:27017/taskflow
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

**For MongoDB Atlas (Cloud):**

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get your connection string
5. Replace `MONGODB_URI` in `.env` with your connection string

**Start Backend Server:**

```bash
npm run dev
```

Server runs on `http://localhost:5000`

### 3. Setup Frontend

```bash
cd frontend
npm install
```

**Start Frontend Dev Server:**

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## 🔑 Test Login Credentials

After creating an account via the signup page, use those credentials to login.

**Demo Account:**
- Email: `demo@example.com`
- Password: `demo123456`

(You'll need to sign up first)

## 📚 API Endpoints

### Auth Routes
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Task Routes (all require authentication)
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks/:id` - Get task by ID
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/filter/status?status=Completed` - Filter tasks by status

## 🗂️ Project Structure

```
task manager/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Task.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   └── tasks.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   └── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Sidebar.jsx
    │   │   ├── StatCard.jsx
    │   │   ├── TaskCard.jsx
    │   │   ├── FeatureCard.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── pages/
    │   │   ├── Landing.jsx
    │   │   ├── Login.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── CreateTask.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── postcss.config.js
```

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Axios

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT
- Bcryptjs

## 📝 Page Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing page |
| `/login` | Login/Signup page |
| `/dashboard` | Dashboard with task overview |
| `/create-task` | Create new task form |

## 🚀 Deployment

### Frontend (Vercel)

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Push to GitHub
3. Connect to Vercel: https://vercel.com/new
4. Select your repository
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Add environment variable: `VITE_API_URL=https://your-backend.com/api`

### Backend (Vercel)

For backend deployment on Vercel, you'll need to use Vercel's serverless functions or deploy to Heroku instead.

**Heroku:**

1. Sign up at https://www.heroku.com
2. Install Heroku CLI
3. Create a `Procfile` in backend root:
   ```
   web: node src/server.js
   ```
4. Deploy:
   ```bash
   heroku create taskflow-backend
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_secret
   git push heroku main
   ```

## 📖 Usage

### Landing Page
- View features and benefits
- See testimonials and stats
- Click "Get Started" to sign up

### Login Page
- Email/password authentication
- Google signin option
- "Create account" link for new users

### Dashboard
- View task statistics
- See completed tasks
- Filter by project or status
- View productivity metrics

### Create Task
- Fill in task details
- Select project
- Assign to team member
- Set due date and priority
- Get productivity tips

## 🔐 Security Features

- Passwords hashed with bcryptjs
- JWT token authentication
- Protected routes
- CORS enabled
- Input validation
- Error handling

## 🐛 Troubleshooting

**Connection refused on localhost:5000**
- Make sure backend is running with `npm run dev`
- Check if port 5000 is not used by another app

**Cannot connect to MongoDB**
- Check `.env` file has correct MONGODB_URI
- For local MongoDB, make sure mongod is running
- For MongoDB Atlas, check connection string and whitelist IP

**Routes return 401 Unauthorized**
- Check token is saved in localStorage
- Try logging in again
- Make sure JWT_SECRET matches between backend and client

**Styling looks broken**
- Run `npm install` in frontend directory
- Run `npm run dev` to rebuild Tailwind CSS
- Check if tailwind.config.js is in frontend root

## 📧 Support

For issues or questions, please open an issue in the repository.

## 📄 License

MIT License - feel free to use this project for personal or commercial use.

---

**Built with ❤️ using React, Node.js, and MongoDB**
