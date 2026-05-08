# Team Task Manager

A full-stack web application for managing projects, assigning tasks, and tracking progress with role-based access control.

## 🚀 Features

- **Authentication**: Secure Signup/Login with JWT tokens
- **Project Management**: Create, update, and delete projects
- **Team Management**: Add team members with role-based access (Admin/Member)
- **Task Management**: Create, assign, and track tasks with different statuses
- **Dashboard**: View task statistics, overdue tasks, and project summaries
- **Role-Based Access Control**: Different permissions for Admin and Member roles

## 🛠️ Tech Stack

- **Backend**: Node.js + Express.js
- **Frontend**: React + Vite
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Railway

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL (for local development)
- Git

## 🏗️ Project Structure

```
web-app/
├── backend/
│   ├── src/
│   │   ├── config/       # Database configuration
│   │   ├── controllers/  # Request handlers
│   │   ├── middleware/   # Auth and error handling
│   │   ├── routes/       # API routes
│   │   ├── models/       # Database models
│   │   ├── migrations/   # Database schema
│   │   ├── utils/        # Utility functions
│   │   └── server.js     # Main server file
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/   # React components
    │   ├── pages/        # Page components
    │   ├── services/     # API services
    │   ├── contexts/     # React contexts
    │   ├── styles/       # CSS files
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── .env.example
```

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd web-app
```

### 2. Backend Setup

```bash
cd backend

# Create .env file
cp .env.example .env

# Update MONGODB_URI in backend/.env with your MongoDB connection
# Example: mongodb://localhost:27017/task_manager

# Install dependencies
npm install

# Start development server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend

# Create .env file
cp .env.example .env

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Team Members
- `GET /api/projects/:projectId/team` - Get team members
- `POST /api/projects/:projectId/team` - Add team member
- `DELETE /api/projects/:projectId/team/:memberId` - Remove team member

### Tasks
- `GET /api/projects/:projectId/tasks` - Get tasks
- `POST /api/projects/:projectId/tasks` - Create task
- `GET /api/projects/:projectId/tasks/:taskId` - Get task details
- `PUT /api/projects/:projectId/tasks/:taskId` - Update task
- `DELETE /api/projects/:projectId/tasks/:taskId` - Delete task

### Dashboard
- `GET /api/dashboard` - Get dashboard data

## 🗄️ Database Schema

The backend uses MongoDB with Mongoose models.

### users
- `_id`
- `username`
- `email`
- `passwordHash`
- `firstName`
- `lastName`
- `role` (`admin` / `member`)
- `createdAt`
- `updatedAt`

### projects
- `_id`
- `name`
- `description`
- `owner` (reference to `users`)
- `teamMembers` (array of `{ user, role }`)
- `createdAt`
- `updatedAt`

### tasks
- `_id`
- `project` (reference to `projects`)
- `title`
- `description`
- `status` (`todo` / `in-progress` / `done` / `overdue`)
- `priority` (`low` / `medium` / `high`)
- `assignedTo` (reference to `users`)
- `dueDate`
- `createdBy` (reference to `users`)
- `createdAt`
- `updatedAt`

## 🚀 Deployment to Railway

### 1. Prerequisites
- Railway account (https://railway.app)
- PostgreSQL database on Railway

### 2. Setup Steps

#### Create PostgreSQL Database on Railway
1. Go to Railway dashboard
2. Create new project
3. Add PostgreSQL plugin
4. Copy the DATABASE_URL

#### Deploy Backend

```bash
cd backend

# Create railway.json
```

Then create `railway.json` in backend root:

```json
{
  "build": {
    "builder": "nixpacks"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "on_failure",
    "restartPolicyMaxRetries": 5
  }
}
```

Deploy commands:
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Link project
railway link

# Deploy
railway up
```

#### Deploy Frontend

```bash
cd frontend

# Build
npm run build

# Deploy to Railway
railway up
```

### 3. Environment Variables on Railway

Set these in Railway dashboard:

**Backend:**
- `NODE_ENV`: production
- `PORT`: 5000
- `DATABASE_URL`: (from Railway PostgreSQL)
- `JWT_SECRET`: (generate a strong secret)
- `FRONTEND_URL`: (your deployed frontend URL)

**Frontend:**
- `VITE_API_BASE_URL`: (your deployed backend URL with /api)

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- Role-based access control (RBAC)
- CORS protection
- Helmet.js for security headers
- Input validation and sanitization

## 📱 Usage Example

### 1. Signup/Login
- Navigate to signup page
- Create account or login with existing credentials
- You'll receive a JWT token

### 2. Create Project
- Click "Create Project" button
- Enter project name and description
- Project is created and you become the owner

### 3. Add Team Members
- Go to project
- Click "Team" tab
- Enter member's user ID and role
- Member gets access to the project

### 4. Create Tasks
- Go to project
- Click "Tasks" tab
- Click "Create Task"
- Assign to team members
- Set priority and due date

### 5. Track Progress
- View dashboard for overview
- Check overdue tasks
- Update task status as work progresses

## 🐛 Troubleshooting

### Connection Refused Error
- Ensure PostgreSQL is running
- Check DATABASE_URL is correct
- Verify port 5000 is not in use

### JWT Token Expired
- Token expires after 7 days by default
- User needs to login again to get new token

### CORS Issues
- Update FRONTEND_URL in backend .env
- Ensure frontend is making requests to correct API URL

## 📄 License

MIT

## 👨‍💻 Support

For issues or questions, please create an issue in the repository.
