# Testing Guide

Comprehensive testing guide for the Team Task Manager application.

## 🧪 Manual Testing

### 1. Authentication Testing

#### Test Signup
```bash
# New user signup
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "TestPassword123",
  "firstName": "Test",
  "lastName": "User"
}

# Expected: 201 Created, with token
```

#### Test Login
```bash
# Login with new user
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "TestPassword123"
}

# Expected: 200 OK, with token
```

#### Test Invalid Login
```bash
# Login with wrong password
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "WrongPassword"
}

# Expected: 401 Unauthorized
```

### 2. Project Management Testing

#### Test Create Project
```bash
POST http://localhost:5000/api/projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Test Project",
  "description": "This is a test project"
}

# Expected: 201 Created, project data with id
```

#### Test Get Projects
```bash
GET http://localhost:5000/api/projects
Authorization: Bearer <token>

# Expected: 200 OK, array of projects
```

#### Test Get Project Details
```bash
GET http://localhost:5000/api/projects/{projectId}
Authorization: Bearer <token>

# Expected: 200 OK, project details
```

#### Test Update Project
```bash
PUT http://localhost:5000/api/projects/{projectId}
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Project Name",
  "description": "Updated description"
}

# Expected: 200 OK, updated project
```

#### Test Delete Project
```bash
DELETE http://localhost:5000/api/projects/{projectId}
Authorization: Bearer <token>

# Expected: 200 OK, success message
```

### 3. Task Management Testing

#### Test Create Task
```bash
POST http://localhost:5000/api/projects/{projectId}/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "First Task",
  "description": "This is the first task",
  "priority": "high",
  "dueDate": "2024-02-15"
}

# Expected: 201 Created, task data
```

#### Test Get Tasks
```bash
GET http://localhost:5000/api/projects/{projectId}/tasks
Authorization: Bearer <token>

# Expected: 200 OK, array of tasks
```

#### Test Filter Tasks by Status
```bash
GET http://localhost:5000/api/projects/{projectId}/tasks?status=todo
Authorization: Bearer <token>

# Expected: 200 OK, filtered tasks
```

#### Test Update Task
```bash
PUT http://localhost:5000/api/projects/{projectId}/tasks/{taskId}
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "in-progress",
  "priority": "medium"
}

# Expected: 200 OK, updated task
```

#### Test Delete Task
```bash
DELETE http://localhost:5000/api/projects/{projectId}/tasks/{taskId}
Authorization: Bearer <token>

# Expected: 200 OK, success message
```

### 4. Team Management Testing

#### Test Add Team Member
```bash
POST http://localhost:5000/api/projects/{projectId}/team
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": 2,
  "role": "member"
}

# Expected: 201 Created, team member data
```

#### Test Get Team Members
```bash
GET http://localhost:5000/api/projects/{projectId}/team
Authorization: Bearer <token>

# Expected: 200 OK, array of team members
```

#### Test Remove Team Member
```bash
DELETE http://localhost:5000/api/projects/{projectId}/team/{memberId}
Authorization: Bearer <token>

# Expected: 200 OK, success message
```

### 5. Dashboard Testing

#### Test Get Dashboard
```bash
GET http://localhost:5000/api/dashboard
Authorization: Bearer <token>

# Expected: 200 OK, dashboard data with stats
```

---

## 🔄 End-to-End Testing Workflow

### Scenario: Complete Project Workflow

1. **Create User Account**
   - Sign up with new user credentials
   - Save the JWT token

2. **Create Project**
   - Create new project "Website Redesign"
   - Verify project appears in project list

3. **Create Tasks**
   - Add task: "Design homepage" (high priority, due 2024-02-15)
   - Add task: "Design contact page" (medium priority)
   - Add task: "Setup analytics" (low priority)

4. **Update Task Status**
   - Change "Design homepage" to "in-progress"
   - Change "Setup analytics" to "done"

5. **Add Team Members**
   - Create second user account
   - Add second user to project as "member"
   - Verify team member appears in team list

6. **Verify Dashboard**
   - Check dashboard shows all tasks
   - Verify statistics are correct
   - Check overdue tasks (if applicable)

7. **Cleanup**
   - Delete created tasks
   - Remove team member
   - Delete project

---

## 🧬 API Testing with Postman/Insomnia

### Setup Postman Collection

1. Create new Collection: "Team Task Manager"

2. Add Requests:

**Request 1: Signup**
- Method: POST
- URL: `{{baseUrl}}/auth/signup`
- Body: (raw JSON)
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "Password123",
  "firstName": "Test",
  "lastName": "User"
}
```

**Request 2: Login**
- Method: POST
- URL: `{{baseUrl}}/auth/login`
- Body: (raw JSON)
```json
{
  "email": "test@example.com",
  "password": "Password123"
}
```
- Tests (add in Tests tab):
```javascript
var jsonData = pm.response.json();
pm.environment.set("token", jsonData.token);
pm.environment.set("userId", jsonData.user.id);
```

**Request 3: Create Project**
- Method: POST
- URL: `{{baseUrl}}/projects`
- Headers:
  - Authorization: `Bearer {{token}}`
- Body: (raw JSON)
```json
{
  "name": "Test Project",
  "description": "Testing the API"
}
```
- Tests:
```javascript
var jsonData = pm.response.json();
pm.environment.set("projectId", jsonData.project.id);
```

3. Set up Variables:
- `baseUrl`: http://localhost:5000/api
- `token`: (set by login request)
- `projectId`: (set by create project request)

---

## ✅ Frontend Testing Checklist

### Authentication Pages
- [ ] Signup form validates inputs
- [ ] Login form validates inputs
- [ ] Successful signup redirects to dashboard
- [ ] Successful login redirects to dashboard
- [ ] Invalid credentials show error message
- [ ] Token is stored in localStorage
- [ ] User info is accessible after login

### Dashboard Page
- [ ] Displays user's tasks
- [ ] Shows task statistics
- [ ] Lists overdue tasks
- [ ] Shows all user's projects
- [ ] Navigation tabs work

### Projects Page
- [ ] Lists all projects
- [ ] Create project form works
- [ ] Clicking project opens project details
- [ ] Project information displays correctly
- [ ] Tabs switch between Tasks and Team

### Tasks Section
- [ ] Create task form works
- [ ] Tasks display in list
- [ ] Task status dropdown works
- [ ] Filtering by status works
- [ ] Task details are accurate

### Team Section
- [ ] Team members display
- [ ] Add member form works
- [ ] Remove member button works
- [ ] Member roles display correctly

---

## 🔒 Security Testing

### Authentication Security
- [ ] Tokens expire after configured time
- [ ] Invalid tokens are rejected
- [ ] Expired tokens are rejected
- [ ] Passwords are hashed (not stored in DB as plain text)

### Authorization Testing
- [ ] Non-authenticated users can't access protected routes
- [ ] Users can only see their own projects
- [ ] Users can't modify other users' projects
- [ ] Only project owners can add/remove team members
- [ ] Only project owners can delete projects

### Data Validation
- [ ] Empty inputs are rejected
- [ ] Invalid email format is rejected
- [ ] Weak passwords are rejected
- [ ] SQL injection attempts are blocked
- [ ] XSS attempts are blocked

---

## 🐛 Bug Testing

### Common Issues to Test
- [ ] Network connection loss handling
- [ ] Server timeout handling
- [ ] Invalid data response handling
- [ ] Duplicate project/task creation
- [ ] Rapid API requests (race conditions)
- [ ] Browser back button behavior
- [ ] Page refresh behavior
- [ ] localStorage corruption

---

## 📊 Performance Testing

### Load Testing
```bash
# Using Apache Bench
ab -n 100 -c 10 http://localhost:5000/health

# Using wrk
wrk -t4 -c100 -d30s http://localhost:5000/health
```

### Database Query Performance
- [ ] Verify indexes are used
- [ ] Check slow query logs
- [ ] Monitor database connections
- [ ] Profile long-running queries

---

## 🔍 Browser Testing

### Cross-Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Device Testing
- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x812)
- [ ] Large screen (2560x1440)

### Browser DevTools
- [ ] Check console for errors
- [ ] Check Network tab for failed requests
- [ ] Check Application tab for localStorage
- [ ] Check Performance metrics

---

## 📋 Test Report Template

```
Test Case: [Name]
Date: [Date]
Tester: [Name]

Prerequisites:
- [Any setup needed]

Steps:
1. [Step 1]
2. [Step 2]
3. [Step 3]

Expected Result:
[What should happen]

Actual Result:
[What actually happened]

Status: ✅ Pass / ❌ Fail
Notes: [Any additional notes]
```

---

## 🚀 Automated Testing (Optional)

Consider adding automated tests:

### Backend Tests (Jest)
```bash
npm install --save-dev jest supertest

# Run tests
npm test
```

### Frontend Tests (Vitest)
```bash
npm install --save-dev vitest @testing-library/react

# Run tests
npm run test
```

---

## ✨ Pre-Deployment Testing Checklist

Before deploying to Railway:
- [ ] All manual tests pass
- [ ] No console errors
- [ ] No API errors
- [ ] Database queries optimized
- [ ] Environment variables configured
- [ ] CORS properly set up
- [ ] SSL/TLS enabled
- [ ] Error handling is implemented
- [ ] Logging is working
- [ ] Performance is acceptable

---

For more information, see [README.md](./README.md) and [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
