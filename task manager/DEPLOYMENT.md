# DEPLOYMENT GUIDE - TaskFlow

This guide explains how to deploy your TaskFlow application to production.

## 🚀 Quick Deployment Options

### Option 1: Deploy to Vercel + Heroku (Recommended for Beginners)

**Frontend to Vercel:**
- Free tier available
- Easy Git integration
- Automatic deployments

**Backend to Heroku:**
- Free tier available
- Easy to set up
- Good for Node.js apps

---

## 📱 Frontend Deployment (Vercel)

### Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub/Google
3. Click "New Project"

### Step 2: Connect Repository
1. Select your GitHub repository
2. Click "Import"
3. Configure build settings:
   - Framework: `Vite` (will auto-detect)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Step 3: Add Environment Variables
In Vercel project settings, add:
```
VITE_API_URL=https://your-backend.herokuapp.com/api
```

### Step 4: Deploy
Click "Deploy" and wait for completion.

Your frontend will be live at: `https://your-project.vercel.app`

---

## 🖥️ Backend Deployment (Heroku)

### Step 1: Create Heroku Account
1. Go to https://www.heroku.com
2. Sign up
3. Create a new app

### Step 2: Install Heroku CLI
```bash
# Windows
choco install heroku-cli

# Mac
brew tap heroku/brew && brew install heroku

# Linux
curl https://cli-assets.heroku.com/install.sh | sh
```

### Step 3: Login to Heroku
```bash
heroku login
```

### Step 4: Create Procfile
In `backend` folder, create `Procfile`:
```
web: node src/server.js
```

### Step 5: Configure Environment Variables
```bash
heroku config:set MONGODB_URI=mongodb+srv://...
heroku config:set JWT_SECRET=your_secure_secret_key
heroku config:set CLIENT_URL=https://your-project.vercel.app
```

### Step 6: Deploy
```bash
cd backend
heroku create taskflow-backend
git push heroku main
```

Your backend will be live at: `https://taskflow-backend.herokuapp.com`

---

## 📦 Full Deployment with Docker

### Prerequisites
- Docker installed
- Docker Hub account

### Step 1: Build Docker Images
```bash
docker build -t your-username/taskflow-backend ./backend
docker build -t your-username/taskflow-frontend ./frontend
```

### Step 2: Push to Docker Hub
```bash
docker push your-username/taskflow-backend
docker push your-username/taskflow-frontend
```

### Step 3: Deploy to Cloud Service
**Option A: AWS ECS**
- Create ECS cluster
- Create task definitions
- Deploy containers

**Option B: DigitalOcean App Platform**
1. Connect GitHub
2. Select repository
3. Auto-detects docker-compose.yml
4. Deploy

**Option C: Render.com**
1. Connect GitHub
2. Create web service from Dockerfile
3. Deploy

---

## 🌐 Using Docker Compose Locally

```bash
docker-compose up
```

This starts:
- MongoDB on port 27017
- Backend on port 5000
- Frontend on port 5173

---

## 🔐 Security Checklist Before Deployment

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Update `MONGODB_URI` to use MongoDB Atlas
- [ ] Set `NODE_ENV=production` in backend
- [ ] Enable HTTPS/SSL
- [ ] Add rate limiting to API
- [ ] Remove console.log statements
- [ ] Set up database backups
- [ ] Configure CORS for your frontend domain
- [ ] Use environment variables for all secrets

---

## 📝 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/taskflow
JWT_SECRET=generate_a_secure_random_string_here
PORT=5000
NODE_ENV=production
CLIENT_URL=https://your-frontend.vercel.app
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend.herokuapp.com/api
```

---

## 🐛 Troubleshooting

### Vercel Build Fails
- Check build logs in Vercel dashboard
- Ensure `npm run build` works locally
- Check environment variables are set

### Heroku App Crashes
```bash
heroku logs --tail  # View live logs
heroku restart      # Restart app
```

### Database Connection Error
- Check MongoDB URI is correct
- Verify IP whitelist in MongoDB Atlas
- Test connection string locally

### CORS Error
- Update `CLIENT_URL` in backend .env
- Check Origin header in browser console

---

## 📊 Monitoring & Logs

### Vercel
- Deployment logs visible in dashboard
- Real-time edge logs

### Heroku
```bash
heroku logs --tail
```

### Docker
```bash
docker logs <container-id>
docker ps  # List running containers
```

---

## 🔄 Continuous Deployment

### Automatic Deployment on Git Push

**Vercel:** Already configured! Pushes to main branch auto-deploy

**Heroku:**
```bash
# Connect repository
heroku git:remote -a your-app-name

# Deploy
git push heroku main
```

### GitHub Actions (Advanced)
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

---

## 💰 Cost Estimation

| Service | Free Tier | Cost |
|---------|-----------|------|
| Vercel | 100GB/mo | $20/mo+ |
| Heroku | Disabled | $7/mo+ |
| MongoDB Atlas | 512MB | $57/mo+ |
| **Total** | - | **$60-100/mo** |

---

## 🚀 Performance Tips

1. Enable CDN caching on frontend
2. Use database indexing
3. Implement pagination for large datasets
4. Add caching headers to API
5. Compress images and assets
6. Use lazy loading for components
7. Monitor API response times

---

## 📞 Support

- Vercel Docs: https://vercel.com/docs
- Heroku Docs: https://devcenter.heroku.com
- MongoDB Atlas: https://docs.atlas.mongodb.com
- Docker: https://docs.docker.com

---

Need help? Check the troubleshooting section or review logs!
