# Quick Start Guide

Get the Team Task Manager running locally in minutes!

## Prerequisites

- Node.js v16+
- npm or yarn
- MongoDB running locally
- Git

## Manual Setup (Local Development)

### 1. Ensure MongoDB Is Running

Use your local MongoDB installation or MongoDB Atlas.

### 2. Setup Backend

```bash
cd backend

# Copy environment file
cp .env.example .env

# Edit .env and set MONGODB_URI
# MONGODB_URI=mongodb://localhost:27017/task_manager

# Install dependencies
npm install

# Start server
npm run dev
```

Backend will start on http://localhost:5000

### 3. Setup Frontend

In another terminal:

```bash
cd frontend

# Copy environment file
cp .env.example .env

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend will start on http://localhost:5173

---

## Testing the Application

### 1. Create Account

- Go to http://localhost:5173
- Click "Sign Up"
- Fill in details
- Click "Sign Up"

### 2. Create a Project

- You'll be redirected to dashboard
- Click "Projects" tab
- Click "Create Project"
- Fill in project details

### 3. Create a Task

- In project page
- Click "Tasks" tab
- Click "Create Task"
- Fill in task details

### 4. Add Team Member

- In project page
- Click "Team" tab
- Enter another user's ID
- Click "Add Member"

---

## Common Commands

### Backend

```bash
cd backend

# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

### Frontend

```bash
cd frontend

# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Troubleshooting

### MongoDB Connection Error

```bash
# Check if MongoDB is running
mongo --eval "db.adminCommand({ ping: 1 })"

# On macOS with Homebrew
brew services start mongodb-community

# On Linux
sudo systemctl start mongod

# On Windows
# Start MongoDB from Services or use the MongoDB Compass GUI
```

### Port Already in Use

```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### Module Not Found Error

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Database Connection Error

```bash
# Check .env file has correct MONGODB_URI
grep MONGODB_URI .env

# Test connection from Node.js
node -e "const mongoose = require('mongoose'); mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('ok')).catch(console.error);"
```

---

## Next Steps

1. **Read Full README**: See [README.md](./README.md) for complete documentation
2. **Deploy to Railway**: See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment steps
3. **Extend Features**: Add more functionality as needed
4. **User Testing**: Invite users to test the application

---

## Project Structure

```
web-app/
├── backend/          # Express.js backend
│   └── src/
│       ├── server.js           # Main server file
│       ├── routes/             # API endpoints
│       ├── controllers/        # Business logic
│       └── config/             # Configuration
├── frontend/         # React frontend
│   └── src/
│       ├── App.jsx             # Main component
│       ├── components/         # Reusable components
│       ├── pages/              # Page components
│       └── styles/             # CSS styles
└── README.md         # Project documentation
```

---

## Useful Links

- Backend API Documentation: Check [README.md](./README.md#-api-endpoints)
- Database Schema: Check [README.md](./README.md#-database-schema)
- Deployment Guide: See [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## Need Help?

1. Check logs for errors
2. See Troubleshooting section above
3. Review documentation files
4. Check API endpoints in README

Happy coding! 🚀
