# Railway Deployment Guide - Team Task Manager

Complete step-by-step guide to deploy the Team Task Manager application on Railway.

## 📋 Prerequisites

Before deploying, you need:

1. **GitHub Account** - Your code repository
   - Repository with your code pushed to main branch
   - Link: https://github.com

2. **Railway Account** - Free account for deployment
   - Sign up: https://railway.app
   - No credit card required for free tier

3. **Environment Secrets**
   - Strong JWT_SECRET
   - Database credentials (handled by Railway)

---

## 🚀 Step-by-Step Deployment

### Step 1: Prepare Your Repository

Ensure your code is clean and ready:

```bash
# Navigate to project root
cd web-app

# Initialize git (if not already)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Team Task Manager application"

# Add remote (replace with your repo)
git remote add origin https://github.com/YOUR_USERNAME/team-task-manager.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Verify on GitHub:**
- Your repository should have:
  - `backend/` folder
  - `frontend/` folder
  - `.gitignore` file
  - `README.md` file
  - `docker-compose.yml` file

### Step 2: Create Railway Project

1. Go to https://railway.app
2. Click **New Project**
3. Select **Deploy from GitHub**
4. Authorize Railway to access your GitHub
5. Select your `team-task-manager` repository
6. Select `main` branch
7. Click **Deploy**

### Step 3: Add PostgreSQL Database

1. In Railway Dashboard, click your project
2. Click **Add Service** (+ button in top right)
3. Click **Add Plugin**
4. Select **PostgreSQL**
5. Click **Add Plugin**
6. Wait for PostgreSQL to provision (2-3 minutes)

### Step 4: Configure Backend Service

#### Access Backend Settings

1. In project view, click **backend** service
2. Click **Variables** tab

#### Add Backend Environment Variables

Set these variables:

```
NODE_ENV=production
PORT=5000
JWT_SECRET=<generate-strong-secret>
BCRYPT_ROUNDS=10
```

**Generate JWT_SECRET:**

Open terminal and run:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and paste as JWT_SECRET value.

#### Setup Database Connection

1. Click **PostgreSQL** service
2. Click **Connect** tab
3. Copy the `DATABASE_URL` value
4. Go back to **backend** service
5. In **Variables**, click **Add Variable**
6. Name: `DATABASE_URL`
7. Value: Paste the copied URL
8. Click **Add**

#### Set FRONTEND_URL

1. First, we need the frontend URL. We'll get it after deploying frontend.
2. For now, skip this or use: `https://placeholder.railway.app`
3. Come back to update this after frontend deployment

#### Connect Database

1. Click **Add Variable** again
2. Key: `DATABASE_CONNECTION_STRING`
3. Value: (same as DATABASE_URL)

### Step 5: Configure Frontend Service

#### Access Frontend Settings

1. In project view, click **frontend** service
2. Click **Variables** tab

#### Add Frontend Environment Variables

```
VITE_API_BASE_URL=<backend-url>/api
```

But we don't have the backend URL yet. We'll come back to this.

### Step 6: Deploy Services

Both services should start deploying automatically:

1. Click **backend** service
2. Look at **Logs** tab
3. Wait for message: `✓ Server is running on port 5000`

Check Frontend:
1. Click **frontend** service
2. Look at **Logs** tab
3. Wait for deployment to complete

### Step 7: Get Service URLs

#### Get Backend URL

1. Click **backend** service
2. Look for **Domain** section (right side)
3. Copy the URL (e.g., `https://team-task-manager-backend.railway.app`)

#### Get Frontend URL

1. Click **frontend** service
2. Look for **Domain** section (right side)
3. Copy the URL (e.g., `https://team-task-manager-frontend.railway.app`)

### Step 8: Update Environment Variables

#### Update Backend FRONTEND_URL

1. Click **backend** service
2. Click **Variables**
3. Edit `FRONTEND_URL` variable
4. Set value to frontend URL from step 7
5. Click **Save**
6. Backend will automatically redeploy

#### Update Frontend API URL

1. Click **frontend** service
2. Click **Variables**
3. Edit `VITE_API_BASE_URL` variable
4. Set value to: `<backend-url>/api`
5. Click **Save**
6. Frontend will automatically redeploy

### Step 9: Verify Deployment

#### Test Backend Health Check

```bash
curl https://your-backend-url/health
```

Expected response:
```json
{
  "message": "Server is running"
}
```

#### Visit Frontend

Open in browser:
```
https://your-frontend-url
```

You should see the login page.

#### Test Full Workflow

1. **Sign Up**
   - Go to frontend URL
   - Click "Sign Up"
   - Fill in details
   - Click "Sign Up"

2. **Create Project**
   - You should be redirected to dashboard
   - Click "Projects"
   - Click "Create Project"
   - Fill in details
   - Click "Create Project"

3. **Create Task**
   - Click "Tasks" tab
   - Click "Create Task"
   - Fill in details
   - Click "Create Task"

4. **View Dashboard**
   - Click "Dashboard" button
   - Verify statistics show tasks

---

## 🔧 Post-Deployment Configuration

### Monitor Logs

```bash
# Backend logs
# In Railway: backend service > Logs tab

# Frontend logs
# In Railway: frontend service > Logs tab

# PostgreSQL logs
# In Railway: postgres service > Logs tab
```

### Check Metrics

1. Click service in Railway
2. Click **Metrics** tab
3. View:
   - CPU usage
   - Memory usage
   - Network I/O
   - Request count

### Enable Alerts (Optional)

1. Go to Project Settings
2. Click **Alerts**
3. Set up notifications for failures

### Custom Domain (Optional)

1. Go to **frontend** service
2. Click **Settings**
3. Add custom domain
4. Follow DNS setup instructions

---

## 🐛 Troubleshooting

### Build Fails

**Error in Logs**: Build failed

**Solution**:
1. Click service
2. Check **Logs** tab for specific error
3. Common issues:
   - Missing dependencies → add to package.json
   - Syntax errors → fix and push new commit
   - Environment variables → verify all set

### Database Connection Error

**Error**: `ECONNREFUSED` or `connect ENOTFOUND postgres`

**Solution**:
1. Verify `DATABASE_URL` is set correctly
2. Click PostgreSQL service
3. Check status (should be "Running")
4. Click **Connect** to see the URL again
5. Re-copy and update in backend variables

### "Cannot find module" Error

**Error**: `Cannot find module 'express'` or similar

**Solution**:
1. Ensure `package.json` has all dependencies
2. Check no circular dependencies
3. Rebuild: click service > redeploy
4. Check `node_modules` in .gitignore (don't commit node_modules)

### Authentication Not Working

**Error**: Cannot login or JWT errors

**Solution**:
1. Check `JWT_SECRET` is set in backend variables
2. Check `NODE_ENV=production`
3. Verify frontend `VITE_API_BASE_URL` is correct
4. Clear browser cache and localStorage

### CORS Issues

**Error**: CORS policy errors in browser console

**Solution**:
1. Check `FRONTEND_URL` matches exactly (no trailing slash)
2. Verify backend CORS middleware is enabled
3. Check `Access-Control-Allow-Origin` header
4. Restart backend service

### Slow Performance

**Issue**: Application is slow

**Solutions**:
1. Check database query performance
2. Monitor memory usage in Metrics
3. Check network latency
4. Consider upgrading Railway plan
5. Add database indexes

---

## 📈 Scaling

### Increase Memory/CPU

1. Click service
2. Click **Settings**
3. Adjust **Ram** and **Cpu**
4. Service restarts with new resources

### Enable Auto-Scaling

Currently not available on Railway free tier, but available on paid plans.

### Multiple Instances

For high availability:
1. Deploy multiple backend instances
2. Use Railway's load balancing
3. Configure in service settings

---

## 🔐 Security Checklist

- [ ] JWT_SECRET is strong and unique
- [ ] Database URL is not exposed
- [ ] Environment variables are not logged
- [ ] HTTPS is enabled (Railway provides this)
- [ ] CORS is properly configured
- [ ] Input validation is implemented
- [ ] Rate limiting is considered
- [ ] Sensitive data is not logged
- [ ] Database backups are configured

---

## 📊 Maintenance

### Database Backups

Railway automatically maintains backups:

1. Click PostgreSQL service
2. Click **Settings**
3. View backup policy

### Monitoring Database

1. Click PostgreSQL service
2. Click **Metrics** tab
3. Monitor:
   - Connections
   - Queries
   - Cache hit ratio

### Updating Dependencies

```bash
# Local development
npm update

# Commit changes
git commit -am "Update dependencies"

# Push to Railway
git push origin main

# Railway automatically redeploys
```

### Log Retention

1. Go to Project Settings
2. Configure log retention period
3. Set up log aggregation (optional)

---

## 📞 Support & Resources

### Railway Docs
- Main Docs: https://docs.railway.app
- API Reference: https://api.railway.app
- Troubleshooting: https://docs.railway.app/troubleshooting

### Community
- Discord: Available in Railway dashboard
- Status Page: https://status.railway.app
- GitHub Issues: https://github.com/railwayapp/railway

### This Project
- GitHub Repository: [Your repo URL]
- Local Setup: See [README.md](./README.md)
- API Docs: See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

---

## 🎉 Success!

Your Team Task Manager is now live on Railway!

### Access Your App

- **Frontend**: https://your-frontend.railway.app
- **Backend API**: https://your-backend.railway.app/api
- **Health Check**: https://your-backend.railway.app/health

### Share With Others

1. Share frontend URL with users
2. They can sign up and start using the app
3. Create projects and assign tasks
4. Collaborate with team members

### Next Steps

1. Monitor logs and performance
2. Gather user feedback
3. Add more features
4. Scale as needed
5. Set up custom domain

---

## 🚨 Emergency Support

### Service Down

1. Check Railway status page
2. Look at service logs for errors
3. Check environment variables
4. Restart service (redeploy)
5. Check database connection

### Data Loss Concern

1. All data is safe in PostgreSQL
2. Railway maintains automatic backups
3. Data is not lost on service restart
4. Download backup if needed from Railway

### Need to Rollback

```bash
# Push previous working commit
git revert <commit-hash>
git push origin main

# Railway automatically redeploys with old code
```

---

## 📝 Deployment Checklist

Before marking deployment complete:

- [ ] Backend service is running and healthy
- [ ] Frontend service is deployed and accessible
- [ ] Database is connected and populated
- [ ] User can sign up and login
- [ ] User can create projects
- [ ] User can create tasks
- [ ] User can assign tasks to team members
- [ ] Dashboard displays correct data
- [ ] All environment variables are set
- [ ] Custom domain is configured (optional)
- [ ] Monitoring and alerts are set up
- [ ] Backup strategy is in place
- [ ] Team is notified of deployment

---

For any issues, see [TROUBLESHOOTING.md](./DEPLOYMENT.md#-troubleshooting) or check the official documentation.

**Congratulations on your successful deployment! 🎉**
