# Deployment Guide - Team Task Manager

This guide provides step-by-step instructions for deploying the Team Task Manager application to Railway.

## 📋 Prerequisites

1. Railway account (sign up at https://railway.app)
2. Git repository (GitHub, GitLab, or Bitbucket)
3. Node.js and npm installed locally
4. PostgreSQL installed (for local testing before deployment)

## 🚀 Deployment Steps

### Step 1: Prepare Your Repository

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit: Team Task Manager"

# Push to your repository
git remote add origin <your-repo-url>
git push -u origin main
```

### Step 2: Create Railway Project

1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Authorize Railway and select your repository
5. Click "Deploy"

### Step 3: Add PostgreSQL Plugin

1. In Railway dashboard, click your project
2. Click "Add Plugin"
3. Select PostgreSQL
4. Click "Add"
5. Wait for PostgreSQL to provision

### Step 4: Configure Environment Variables

#### For Backend Service

1. In Railway dashboard, select backend service
2. Click "Variables"
3. Add these environment variables:

```
NODE_ENV=production
PORT=5000
DATABASE_URL=<copy from PostgreSQL plugin>
JWT_SECRET=<generate-a-strong-random-string>
FRONTEND_URL=<your-frontend-railway-url>
BCRYPT_ROUNDS=10
```

To generate JWT_SECRET, you can use:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

4. Click "Deploy"

#### For Frontend Service

1. In Railway dashboard, select frontend service
2. Click "Variables"
3. Add this environment variable:

```
VITE_API_BASE_URL=<your-backend-railway-url>/api
```

4. Click "Deploy"

### Step 5: Verify Deployment

1. Go to Railway dashboard
2. Copy the backend URL and test:
   ```bash
   curl <backend-url>/health
   ```
   Should return: `{"message":"Server is running"}`

3. Visit the frontend URL in browser
4. You should see the login page

### Step 6: Initialize Database

The database tables are automatically created when the backend starts. If you need to manually initialize:

1. Go to Railway PostgreSQL plugin
2. Click "Connect"
3. Run the migration script (tables are auto-created on first run)

## 🔧 Post-Deployment Configuration

### Enable Custom Domain (Optional)

1. In Railway project settings
2. Click "Domain"
3. Add custom domain (e.g., taskmanger.yourdomain.com)
4. Configure DNS records

### Monitor Logs

1. Click service in Railway dashboard
2. Click "Logs" tab
3. Monitor for any errors

### Update Environment Variables

To update variables after deployment:
1. Click service
2. Click "Variables"
3. Edit and save
4. Railway automatically redeploys

## 🐛 Troubleshooting

### Build Failures

**Issue**: Build fails during deployment

**Solution**:
1. Check logs in Railway dashboard
2. Ensure all dependencies are in package.json
3. Verify Node.js version is 16+
4. Check for syntax errors in code

```bash
# Test build locally
npm install
npm run build
```

### Database Connection Error

**Issue**: `Error: connect ECONNREFUSED`

**Solution**:
1. Verify DATABASE_URL is set correctly
2. Check PostgreSQL plugin status in Railway
3. Ensure backend can access PostgreSQL
4. Restart services

### Authentication Issues

**Issue**: JWT token not working

**Solution**:
1. Regenerate JWT_SECRET
2. Update in Railway environment variables
3. Redeploy backend
4. Clear browser localStorage and login again

### CORS Errors

**Issue**: Frontend can't connect to backend

**Solution**:
1. Verify FRONTEND_URL is set correctly in backend
2. Verify VITE_API_BASE_URL is correct in frontend
3. Ensure URLs have no trailing slashes
4. Check backend logs for CORS issues

## 📊 Monitoring & Maintenance

### Check Service Health

```bash
# Monitor backend
curl <backend-url>/health

# Check uptime
# Monitor in Railway dashboard > Metrics
```

### Database Backups

1. In Railway, go to PostgreSQL plugin
2. Click "Backups" tab
3. Railway automatically maintains backups

### Performance Optimization

- Monitor database query performance in Railway
- Implement caching if needed
- Consider read replicas for scaling

## 🔐 Security Checklist

- [ ] JWT_SECRET is strong (32+ characters)
- [ ] HTTPS is enabled (Railway provides SSL by default)
- [ ] Database password is secure
- [ ] Environment variables are not exposed
- [ ] Input validation is implemented
- [ ] CORS is properly configured
- [ ] Rate limiting is considered for production

## 📈 Scaling

### Increase Resources

1. Go to service in Railway dashboard
2. Click "Settings"
3. Increase memory/CPU
4. Service restarts with new resources

### Horizontal Scaling

For multiple backend instances:
1. Deploy another instance of backend service
2. Set up load balancing in Railway
3. Configure shared database connection

## 🚀 CI/CD Integration

### Automatic Deployment

Railway supports automatic deployments when you push to main branch:

1. Click project settings
2. Enable "Auto Deploy on Push"
3. Push code and it auto-deploys

### Manual Deployment

```bash
# Push to repository
git push origin main

# Or re-deploy from Railway dashboard
# Click service > Deploy button
```

## 📞 Support

- Railway Docs: https://docs.railway.app
- Status Page: https://railway.app/status
- Community Discord: Available in Railway dashboard

## 🎉 You're Live!

Your Team Task Manager is now deployed! Access it via:
- Frontend: https://your-frontend-url
- Backend API: https://your-backend-url/api
- Health Check: https://your-backend-url/health
