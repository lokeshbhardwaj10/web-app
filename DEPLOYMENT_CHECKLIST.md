# 📋 DEPLOYMENT CHECKLIST - Team Task Manager

Use this checklist to verify everything is ready before deploying to Railway.

## ✅ Pre-Deployment Verification

### Code Repository

- [ ] All files committed to Git
- [ ] No uncommitted changes
- [ ] Repository is public (if using GitHub)
- [ ] Main branch is up to date
- [ ] No sensitive data in code
- [ ] .gitignore is properly configured

```bash
# Verify
git status
git log --oneline -5
```

### Backend Configuration

- [ ] `backend/package.json` has all dependencies
- [ ] `backend/.env.example` is up to date
- [ ] No `.env` file committed (should be in .gitignore)
- [ ] `backend/src/server.js` is correct
- [ ] All routes are defined
- [ ] All controllers are implemented
- [ ] Database schema is complete
- [ ] Middleware is configured

```bash
# Test backend locally
cd backend
npm install
npm run dev
# Should see: ✓ Server is running on port 5000
```

### Frontend Configuration

- [ ] `frontend/package.json` has all dependencies
- [ ] `frontend/.env.example` is up to date
- [ ] No `.env` file committed
- [ ] `frontend/src/App.jsx` is properly configured
- [ ] All routes work
- [ ] All components render
- [ ] Styling is applied

```bash
# Test frontend locally
cd frontend
npm install
npm run dev
# Should see build success
```

### Database

- [ ] PostgreSQL is running locally
- [ ] Database tables are created
- [ ] Schema matches expectations
- [ ] Foreign keys are set up
- [ ] Indexes are created
- [ ] No pending migrations

```bash
# Test database
psql $DATABASE_URL -c "\dt"
# Should show all tables
```

### Documentation

- [ ] README.md is complete and accurate
- [ ] API_DOCUMENTATION.md is comprehensive
- [ ] QUICKSTART.md is clear
- [ ] ENV_SETUP.md covers all variables
- [ ] TESTING.md has test cases
- [ ] RAILWAY_DEPLOYMENT.md is detailed

### Security

- [ ] JWT_SECRET is strong
- [ ] Passwords are hashed
- [ ] CORS is configured
- [ ] Security headers are set
- [ ] Input validation is implemented
- [ ] No sensitive logs
- [ ] Database is secure

---

## 🚀 Railway Deployment Steps

### Step 1: Prepare Repository

- [ ] Push all code to GitHub
- [ ] Verify repository is accessible
- [ ] Check main branch is default

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Create Railway Project

- [ ] Sign up at https://railway.app
- [ ] Create new project
- [ ] Select "Deploy from GitHub"
- [ ] Select your repository
- [ ] Select main branch
- [ ] Click Deploy

### Step 3: Add PostgreSQL

- [ ] In project view, click "Add Service"
- [ ] Select "Add Plugin"
- [ ] Select PostgreSQL
- [ ] Wait for provisioning
- [ ] Verify PostgreSQL is running

### Step 4: Configure Backend

- [ ] Click backend service
- [ ] Go to Variables tab
- [ ] Set `NODE_ENV=production`
- [ ] Set `PORT=5000`
- [ ] Generate and set strong `JWT_SECRET`
- [ ] Set `BCRYPT_ROUNDS=10`
- [ ] Set `DATABASE_URL` from PostgreSQL
- [ ] Set `FRONTEND_URL` (will update later)

```bash
# Generate JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

- [ ] Click Save/Deploy
- [ ] Wait for deployment
- [ ] Check logs for errors
- [ ] Verify "Server is running" message

### Step 5: Configure Frontend

- [ ] Click frontend service
- [ ] Go to Variables tab
- [ ] Set `VITE_API_BASE_URL` (once backend URL is known)
- [ ] Click Save/Deploy

### Step 6: Get Service URLs

- [ ] Note backend URL (from backend service Domain section)
- [ ] Note frontend URL (from frontend service Domain section)

### Step 7: Update CORS

- [ ] Go back to backend
- [ ] Update `FRONTEND_URL` variable with frontend URL
- [ ] Save/Deploy

### Step 8: Test Deployment

```bash
# Test backend health
curl <backend-url>/health
# Should return: {"message":"Server is running"}

# Open in browser
# Visit: <frontend-url>
# Should see login page
```

### Step 9: Verify Features

- [ ] Sign up works
- [ ] Login works
- [ ] Create project works
- [ ] Create task works
- [ ] Dashboard displays correctly
- [ ] Add team member works

---

## 📊 Verification Tests

### Authentication Test

```bash
# 1. Sign up
curl -X POST <backend-url>/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test",
    "email": "test@example.com",
    "password": "Test123",
    "firstName": "Test",
    "lastName": "User"
  }'
# Should return 201 with token

# 2. Login
curl -X POST <backend-url>/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123"
  }'
# Should return 200 with token
```

### Project Management Test

```bash
TOKEN="<from-login>"

# Create project
curl -X POST <backend-url>/api/projects \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Project",
    "description": "Test"
  }'
# Should return 201

# Get projects
curl -X GET <backend-url>/api/projects \
  -H "Authorization: Bearer $TOKEN"
# Should return 200 with projects array
```

### Dashboard Test

```bash
# Get dashboard
curl -X GET <backend-url>/api/dashboard \
  -H "Authorization: Bearer $TOKEN"
# Should return 200 with stats
```

---

## 🔍 Post-Deployment Monitoring

### Day 1

- [ ] Monitor logs for errors
- [ ] Check performance metrics
- [ ] Verify database connections
- [ ] Test all main features
- [ ] Check response times

### Week 1

- [ ] Gather user feedback
- [ ] Monitor error rates
- [ ] Check database performance
- [ ] Review security logs
- [ ] Plan any fixes

### Ongoing

- [ ] Daily log monitoring
- [ ] Weekly performance review
- [ ] Monthly security audit
- [ ] Quarterly optimization review

---

## ⚠️ Common Issues & Solutions

### Issue: Build Fails

**Solution**:
1. Check build logs
2. Verify package.json
3. Check for syntax errors
4. Ensure all dependencies listed

### Issue: Database Connection Error

**Solution**:
1. Verify DATABASE_URL is set
2. Check PostgreSQL is running
3. Test connection locally
4. Restart PostgreSQL plugin

### Issue: CORS Errors

**Solution**:
1. Verify FRONTEND_URL in backend
2. No trailing slashes
3. Check browser console
4. Clear cache

### Issue: Authentication Not Working

**Solution**:
1. Verify JWT_SECRET is set
2. Check NODE_ENV=production
3. Verify token is sent
4. Check token expiration

### Issue: Slow Performance

**Solution**:
1. Check database queries
2. Monitor memory usage
3. Check network latency
4. Consider upgrading Railway plan

---

## 📝 Sign-Off Checklist

Before considering deployment complete:

- [ ] All tests passed
- [ ] No critical errors
- [ ] Performance is acceptable
- [ ] Monitoring is set up
- [ ] Team is notified
- [ ] Backup strategy is in place
- [ ] Documentation is updated
- [ ] Security is verified

---

## 📞 Support

If issues arise:

1. **Check logs** - Railway dashboard > service > Logs
2. **Verify environment** - Railway dashboard > service > Variables
3. **Test locally** - Reproduce issue locally first
4. **Review documentation** - Check RAILWAY_DEPLOYMENT.md
5. **Check status** - https://status.railway.app

---

## 🎉 READY TO DEPLOY!

When all checkboxes are checked, you're ready to go live!

Start with [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) for detailed instructions.

**Good luck!** 🚀
