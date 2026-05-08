# Environment Setup Guide

This guide provides detailed instructions for setting up environment variables for development and production.

## Backend Environment Variables

### Development Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create `.env` file from template:
```bash
cp .env.example .env
```

3. Edit `.env` file with your values:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# MongoDB connection
MONGODB_URI=mongodb://localhost:27017/task_manager

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
JWT_EXPIRE=7d

# Security
BCRYPT_ROUNDS=10

# CORS
FRONTEND_URL=http://localhost:5173
```

### Important Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| NODE_ENV | Environment mode | `development` or `production` |
| PORT | Server port | `5000` |
| MONGODB_URI | MongoDB connection string | `mongodb://localhost:27017/task_manager` |
| JWT_SECRET | JWT signing secret (keep secure!) | Generate with `openssl rand -hex 32` |
| JWT_EXPIRE | Token expiration time | `7d` |
| BCRYPT_ROUNDS | Password hashing rounds | `10` |
| FRONTEND_URL | Frontend URL for CORS | `http://localhost:5173` |

### Generating JWT_SECRET

#### Option 1: Using OpenSSL
```bash
openssl rand -hex 32
```

#### Option 2: Using Node.js
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### Option 3: Using Python
```bash
python3 -c "import secrets; print(secrets.token_hex(32))"
```

### MongoDB Connection String Format

```
mongodb://[user[:password]@]host[:port]/dbname
```

Examples:
- Local: `mongodb://localhost:27017/task_manager`
- Remote: `mongodb://user:pass@hostname:27017/task_manager`
- Atlas: `mongodb+srv://user:pass@cluster0.mongodb.net/task_manager?retryWrites=true&w=majority`

---

## Frontend Environment Variables

### Development Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Create `.env` file from template:
```bash
cp .env.example .env
```

3. Edit `.env` file with your values:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api
```

### Important Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| VITE_API_BASE_URL | Backend API base URL | `http://localhost:5000/api` |

---

## Production Setup

### Backend Production Environment

```env
NODE_ENV=production
PORT=5000

MONGODB_URI=mongodb://user:password@hostname:27017/task_manager

# Generate strong JWT secret for production
JWT_SECRET=<generate-strong-secret-here>
JWT_EXPIRE=7d

BCRYPT_ROUNDS=10

# Set to production frontend URL
FRONTEND_URL=https://your-frontend.app
```

### Frontend Production Environment

```env
# Set to production backend URL
VITE_API_BASE_URL=https://your-backend.app/api
```

---

## Deployment Configuration

### Setting Up on Railway Dashboard

1. **Go to Project Settings**
   - Select your project
   - Click "Variables"

2. **Backend Variables**
   ```
   NODE_ENV=production
   PORT=5000
   DATABASE_URL=<provided by Railway PostgreSQL>
   JWT_SECRET=<generated-secret>
   FRONTEND_URL=<your-frontend-railway-url>
   BCRYPT_ROUNDS=10
   ```

3. **Frontend Variables**
   ```
   VITE_API_BASE_URL=<your-backend-railway-url>/api
   ```

### Generating Secrets for Production

```bash
# Generate JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate random password
openssl rand -base64 32
```

---

## Database Setup

### Local PostgreSQL Setup

#### macOS (Homebrew)
```bash
# Install PostgreSQL
brew install postgresql@15

# Start PostgreSQL service
brew services start postgresql@15

# Create database
createdb task_manager

# Connect to database
psql task_manager
```

#### Linux (Ubuntu/Debian)
```bash
# Install PostgreSQL
sudo apt-get install postgresql postgresql-contrib

# Start PostgreSQL service
sudo service postgresql start

# Create database
sudo -u postgres createdb task_manager
```

#### Windows
1. Download from https://www.postgresql.org/download/windows/
2. Run installer
3. Use pgAdmin GUI to create database named `task_manager`

### Creating Test Database

```bash
# Create test database
psql -U postgres -c "CREATE DATABASE task_manager_test;"

# Verify creation
psql -U postgres -l | grep task_manager
```

---

## Local Development Only

This project uses MongoDB directly for local development instead of Docker containerization.

If you want to run locally, install MongoDB and set `MONGODB_URI` in `backend/.env`.

---

## Troubleshooting

### Database Connection Error

**Error**: `ECONNREFUSED` or `connection refused`

**Solution**:
1. Verify DATABASE_URL is correct
2. Ensure PostgreSQL is running: `psql -c "SELECT 1"`
3. Check database exists: `psql -l | grep task_manager`
4. Try connection string: `psql $DATABASE_URL`

### JWT Token Issues

**Error**: `Token expired` or `Invalid token`

**Solution**:
1. Regenerate JWT_SECRET
2. Update in `.env` file
3. Restart backend server
4. Clear browser localStorage: `localStorage.clear()`

### CORS Issues

**Error**: `Access-Control-Allow-Origin` error

**Solution**:
1. Check FRONTEND_URL is set correctly in backend `.env`
2. Ensure no trailing slashes: `http://localhost:5173` not `http://localhost:5173/`
3. Verify frontend VITE_API_BASE_URL is correct

### Port Already in Use

**Error**: `EADDRINUSE` or `Address already in use`

**Solution**:
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or change PORT in .env to 5001, 5002, etc.
```

---

## Best Practices

### Security
- ✅ Never commit `.env` files to version control
- ✅ Use strong JWT_SECRET (32+ characters)
- ✅ Rotate secrets periodically in production
- ✅ Use HTTPS in production
- ✅ Set NODE_ENV=production in production

### Development
- ✅ Use `.env.example` as template
- ✅ Document all required variables
- ✅ Keep development and production configs separate
- ✅ Use different databases for development/testing

### Production
- ✅ Generate cryptographically secure secrets
- ✅ Store secrets in environment, not code
- ✅ Use managed database services (e.g., Railway PostgreSQL)
- ✅ Enable SSL/TLS connections
- ✅ Monitor logs and errors

---

## Environment Variable Checklist

### Development
- [ ] NODE_ENV set to `development`
- [ ] DATABASE_URL points to local/dev database
- [ ] JWT_SECRET is set (can be simple for dev)
- [ ] FRONTEND_URL matches frontend port
- [ ] VITE_API_BASE_URL matches backend URL

### Production
- [ ] NODE_ENV set to `production`
- [ ] DATABASE_URL uses managed database (Railway PostgreSQL)
- [ ] JWT_SECRET is strong and unique
- [ ] FRONTEND_URL is production frontend URL
- [ ] VITE_API_BASE_URL is production backend URL
- [ ] PORT is set correctly
- [ ] SSL/TLS is enabled

---

## Quick Reference

### Start Fresh Setup

```bash
# Backend
cd backend
cp .env.example .env
# Edit .env with your values
npm install
npm run dev

# Frontend (in another terminal)
cd frontend
cp .env.example .env
# Edit .env with your values
npm install
npm run dev
```

### Using Docker Compose

```bash
# No .env setup needed
docker-compose up --build
```

### Reset Everything

```bash
# Clear .env files
rm backend/.env frontend/.env

# Remove node_modules
rm -rf backend/node_modules frontend/node_modules

# Reinstall and setup again
cd backend && npm install && cp .env.example .env
cd ../frontend && npm install && cp .env.example .env
```

---

For more help, see [README.md](./README.md) or [DEPLOYMENT.md](./DEPLOYMENT.md)
