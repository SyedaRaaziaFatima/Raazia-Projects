# Vercel Deployment Guide

Complete guide for deploying TaskFlow (React frontend + Serverless API) to Vercel.

## 📋 Prerequisites

- Node.js 18+ and npm installed
- Git repository initialized
- Vercel account (free at https://vercel.com)
- GitHub, GitLab, or Bitbucket account

## 🚀 Quick Start

### Option 1: Deploy via Vercel CLI (Recommended)

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Login to Vercel
```bash
vercel login
```
Follow the prompts to authenticate with your Vercel account.

#### Step 3: Deploy
Navigate to your project directory:
```bash
cd "c:\Users\hp\Desktop\task manager"
```

Deploy to Vercel:
```bash
vercel
```

For production deployment:
```bash
vercel --prod
```

The CLI will:
- Detect your project type (Vite + Node.js)
- Build your application
- Deploy to Vercel
- Provide your deployment URL

#### Step 4: Update Environment Variables
After deployment, update your `.env.vercel`:
```
VITE_API_URL=https://your-project-name.vercel.app/api
```

---

### Option 2: Deploy via GitHub Integration

#### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/task-manager.git
git push -u origin main
```

#### Step 2: Connect to Vercel
1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Select "Import Git Repository"
4. Choose your GitHub repository (task-manager)
5. Configure project settings:
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

#### Step 3: Environment Variables
1. Go to Project Settings → Environment Variables
2. Add:
   ```
   VITE_API_URL=https://your-project-name.vercel.app/api
   NODE_ENV=production
   ```

#### Step 4: Deploy
Click "Deploy" and wait for the deployment to complete.

---

## 📁 Project Structure for Vercel

```
task-manager/
├── api/                    # Serverless functions
│   ├── tasks/
│   │   ├── index.js        # GET /api/tasks
│   │   ├── create.js       # POST /api/tasks/create
│   │   ├── delete.js       # DELETE /api/tasks/delete
│   │   └── update.js       # PUT /api/tasks/update
│   ├── _data.js            # Shared data store
│   └── utils.js            # Utility functions
├── src/                    # React application
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
├── package.json
├── vercel.json             # Vercel configuration
└── .env.vercel             # Environment variables
```

---

## ⚙️ Configuration Files

### vercel.json
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    }
  ]
}
```

### package.json Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## 🔧 API Routes on Vercel

Once deployed, your API endpoints will be:

| Endpoint | Method | URL |
|----------|--------|-----|
| Get All Tasks | GET | `https://your-domain.vercel.app/api/tasks` |
| Create Task | POST | `https://your-domain.vercel.app/api/tasks/create` |
| Update Task | PUT | `https://your-domain.vercel.app/api/tasks/update` |
| Delete Task | DELETE | `https://your-domain.vercel.app/api/tasks/delete?id=:id` |

---

## 🧪 Testing Your Deployment

### Test API Endpoints
```bash
# Get all tasks
curl https://your-domain.vercel.app/api/tasks

# Create a task
curl -X POST https://your-domain.vercel.app/api/tasks/create \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task","status":"pending"}'
```

### Test Frontend
Visit: `https://your-domain.vercel.app`

---

## 🔄 Continuous Deployment

Once connected to GitHub, any push to main will automatically:
1. Trigger a build
2. Run tests (if configured)
3. Deploy to Vercel
4. Provide a preview URL

### Setting Up Preview Deployments
Preview URLs are automatically created for pull requests:
1. Create a feature branch
2. Make changes and push
3. Create a pull request
4. Vercel automatically creates a preview deployment
5. Review changes before merging

---

## 📊 Monitoring Deployments

### View Logs
```bash
vercel logs --follow
```

### Analytics
Dashboard shows:
- Build times
- Deployment history
- Performance metrics
- Error logs

---

## 🔒 Security Best Practices

### Environment Variables
- Store sensitive data in Vercel dashboard
- Never commit `.env` files to git
- Use different vars for staging and production

### CORS Headers
Already configured in `vercel.json` and route handlers.

### Input Validation
All API endpoints validate:
- Required fields
- Data types
- Field lengths
- Enum values (status)

---

## 💾 Data Persistence (Important!)

⚠️ **Current Setup**: Tasks stored in memory (resets on redeploy)

### For Production, Add a Database:

#### Option 1: PostgreSQL with Vercel Postgres
```bash
vercel env pull .env.local
# Add database connection string
```

Update `api/_data.js` to use database instead of in-memory array.

#### Option 2: MongoDB
1. Create MongoDB cluster (mongodb.com)
2. Add connection string to Vercel environment variables
3. Update API routes to use MongoDB driver

#### Option 3: Firebase/Firestore
1. Set up Firebase project
2. Add credentials to Vercel environment
3. Update API routes to use Firebase SDK

---

## 🚨 Troubleshooting

### Build Fails
1. Check `npm run build` locally
2. Verify all dependencies are in `package.json`
3. Check Node.js version compatibility

### API Routes Not Working
1. Verify `vercel.json` configuration
2. Check API file structure (must be in `/api` folder)
3. Test locally: `npm run dev`
4. Check Vercel logs: `vercel logs`

### CORS Issues
- CORS headers are configured in route handlers
- Check browser console for specific CORS errors
- Verify `Access-Control-Allow-Origin` header

### Environment Variables Not Loading
1. Push variables to Vercel: `vercel env pull`
2. Verify vars in Vercel dashboard
3. Redeploy after adding vars: `vercel --prod`

---

## 📈 Performance Optimization

### Frontend (React)
- ✓ Vite provides code splitting
- ✓ Tailwind CSS is highly optimized
- ✓ Images should be optimized

### API (Serverless)
- Cold starts: ~500ms for first request
- Warm starts: <100ms
- Response times: <100ms for simple queries

### Tips
1. Minimize bundle size
2. Use lazy loading for routes
3. Optimize images (WebP format)
4. Enable caching headers

---

## 📝 Custom Domain

1. Go to Project Settings → Domains
2. Add custom domain (e.g., taskflow.app)
3. Update DNS records (instructions provided by Vercel)
4. Wait for DNS propagation (up to 48 hours)

---

## 🔐 Vercel Secrets (For Sensitive Data)

Add secrets that won't be exposed:
```bash
vercel env add DATABASE_URL
vercel env add API_SECRET_KEY
```

Access in code:
```javascript
process.env.DATABASE_URL
```

---

## 📊 Environment Variables by Stage

### Development
```
VITE_API_URL=http://localhost:3000/api
NODE_ENV=development
```

### Preview
```
VITE_API_URL=https://task-manager-preview.vercel.app/api
NODE_ENV=preview
```

### Production
```
VITE_API_URL=https://task-manager.vercel.app/api
NODE_ENV=production
```

---

## 🆘 Support

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Support**: https://vercel.com/support
- **API Documentation**: See `API-DOCUMENTATION.md`

---

## ✅ Deployment Checklist

- [ ] All files committed to git
- [ ] Environment variables configured
- [ ] `vercel.json` present and configured
- [ ] `npm run build` works locally
- [ ] All dependencies in `package.json`
- [ ] API routes in `/api` folder
- [ ] CORS headers configured
- [ ] `.gitignore` includes `/node_modules` and `/dist`
- [ ] Database connection ready (if using database)
- [ ] Domain configured (if using custom domain)

---

## 🎉 Success!

Once deployed, your TaskFlow application will be:
- ✓ Live on the internet
- ✓ Serverless and auto-scaling
- ✓ Globally distributed via CDN
- ✓ Free tier available ($0-$20/month)
- ✓ Production ready with analytics

**Your project is now live!** 🚀
