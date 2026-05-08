# API Documentation

## Base URL

- **Development**: http://localhost:5000/api
- **Production**: https://<your-deployed-backend>/api

## Authentication

All endpoints except `/auth/signup` and `/auth/login` require a JWT token in the Authorization header:

```
Authorization: Bearer <jwt-token>
```

## Response Format

All responses are in JSON format:

```json
{
  "message": "Success message",
  "data": { /* response data */ }
}
```

Errors:
```json
{
  "message": "Error message"
}
```

---

## Endpoints

### 🔐 Authentication

#### Sign Up
- **Method**: POST
- **Endpoint**: `/auth/signup`
- **Body**:
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "secure_password",
    "firstName": "John",
    "lastName": "Doe"
  }
  ```
- **Response** (201):
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "member"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
  ```

#### Log In
- **Method**: POST
- **Endpoint**: `/auth/login`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "secure_password"
  }
  ```
- **Response** (200):
  ```json
  {
    "message": "Login successful",
    "user": {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "member"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
  ```

---

### 📊 Projects

#### Get All Projects
- **Method**: GET
- **Endpoint**: `/projects`
- **Headers**: Authorization required
- **Response** (200):
  ```json
  {
    "projects": [
      {
        "id": 1,
        "name": "Website Redesign",
        "description": "Redesign company website",
        "owner_id": 1,
        "created_at": "2024-01-15T10:30:00Z",
        "updated_at": "2024-01-15T10:30:00Z"
      }
    ]
  }
  ```

#### Create Project
- **Method**: POST
- **Endpoint**: `/projects`
- **Headers**: Authorization required
- **Body**:
  ```json
  {
    "name": "Website Redesign",
    "description": "Redesign company website"
  }
  ```
- **Response** (201):
  ```json
  {
    "message": "Project created successfully",
    "project": {
      "id": 1,
      "name": "Website Redesign",
      "description": "Redesign company website",
      "owner_id": 1,
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  }
  ```

#### Get Project Details
- **Method**: GET
- **Endpoint**: `/projects/{projectId}`
- **Headers**: Authorization required
- **Response** (200):
  ```json
  {
    "project": {
      "id": 1,
      "name": "Website Redesign",
      "description": "Redesign company website",
      "owner_id": 1,
      "owner_name": "john_doe",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  }
  ```

#### Update Project
- **Method**: PUT
- **Endpoint**: `/projects/{projectId}`
- **Headers**: Authorization required
- **Body**:
  ```json
  {
    "name": "Updated Project Name",
    "description": "Updated description"
  }
  ```
- **Response** (200):
  ```json
  {
    "message": "Project updated successfully",
    "project": { /* updated project */ }
  }
  ```

#### Delete Project
- **Method**: DELETE
- **Endpoint**: `/projects/{projectId}`
- **Headers**: Authorization required
- **Response** (200):
  ```json
  {
    "message": "Project deleted successfully"
  }
  ```

---

### 👥 Team Members

#### Get Team Members
- **Method**: GET
- **Endpoint**: `/projects/{projectId}/team`
- **Headers**: Authorization required
- **Response** (200):
  ```json
  {
    "teamMembers": [
      {
        "id": 1,
        "project_id": 1,
        "user_id": 2,
        "username": "jane_doe",
        "email": "jane@example.com",
        "first_name": "Jane",
        "last_name": "Doe",
        "role": "admin",
        "joined_at": "2024-01-16T10:30:00Z"
      }
    ]
  }
  ```

#### Add Team Member
- **Method**: POST
- **Endpoint**: `/projects/{projectId}/team`
- **Headers**: Authorization required
- **Body**:
  ```json
  {
    "userId": 2,
    "role": "member"
  }
  ```
- **Response** (201):
  ```json
  {
    "message": "Team member added successfully",
    "teamMember": { /* team member details */ }
  }
  ```

#### Remove Team Member
- **Method**: DELETE
- **Endpoint**: `/projects/{projectId}/team/{memberId}`
- **Headers**: Authorization required
- **Response** (200):
  ```json
  {
    "message": "Team member removed successfully"
  }
  ```

---

### ✅ Tasks

#### Get Tasks
- **Method**: GET
- **Endpoint**: `/projects/{projectId}/tasks`
- **Headers**: Authorization required
- **Query Parameters**:
  - `status`: Filter by status (todo, in-progress, done)
  - `assignedTo`: Filter by assigned user ID
- **Response** (200):
  ```json
  {
    "tasks": [
      {
        "id": 1,
        "project_id": 1,
        "title": "Design Homepage",
        "description": "Create new homepage design",
        "status": "in-progress",
        "priority": "high",
        "assigned_to": 2,
        "assigned_user": "jane_doe",
        "due_date": "2024-02-01",
        "created_by": 1,
        "created_at": "2024-01-15T10:30:00Z",
        "updated_at": "2024-01-15T10:30:00Z"
      }
    ]
  }
  ```

#### Create Task
- **Method**: POST
- **Endpoint**: `/projects/{projectId}/tasks`
- **Headers**: Authorization required
- **Body**:
  ```json
  {
    "title": "Design Homepage",
    "description": "Create new homepage design",
    "priority": "high",
    "dueDate": "2024-02-01",
    "assignedTo": 2
  }
  ```
- **Response** (201):
  ```json
  {
    "message": "Task created successfully",
    "task": { /* task details */ }
  }
  ```

#### Get Task Details
- **Method**: GET
- **Endpoint**: `/projects/{projectId}/tasks/{taskId}`
- **Headers**: Authorization required
- **Response** (200):
  ```json
  {
    "task": { /* task details */ }
  }
  ```

#### Update Task
- **Method**: PUT
- **Endpoint**: `/projects/{projectId}/tasks/{taskId}`
- **Headers**: Authorization required
- **Body**:
  ```json
  {
    "title": "Updated title",
    "status": "done",
    "priority": "medium",
    "assignedTo": 3,
    "dueDate": "2024-02-15"
  }
  ```
- **Response** (200):
  ```json
  {
    "message": "Task updated successfully",
    "task": { /* updated task */ }
  }
  ```

#### Delete Task
- **Method**: DELETE
- **Endpoint**: `/projects/{projectId}/tasks/{taskId}`
- **Headers**: Authorization required
- **Response** (200):
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```

---

### 📈 Dashboard

#### Get Dashboard Data
- **Method**: GET
- **Endpoint**: `/dashboard`
- **Headers**: Authorization required
- **Response** (200):
  ```json
  {
    "tasks": [ /* all assigned tasks */ ],
    "overdueTasks": [ /* overdue tasks */ ],
    "projects": [ /* user's projects */ ],
    "stats": {
      "total": 15,
      "todo": 5,
      "inProgress": 7,
      "done": 3,
      "overdue": 2
    }
  }
  ```

---

## Error Codes

| Code | Message | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Missing or invalid token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 500 | Internal Server Error | Server error |

---

## Testing with cURL

### Sign Up
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Projects
```bash
curl -X GET http://localhost:5000/api/projects \
  -H "Authorization: Bearer <your-token>"
```

### Create Project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Project",
    "description": "Project description"
  }'
```

---

## Rate Limiting

Currently no rate limiting is implemented. Consider adding for production.

## Pagination

Currently no pagination is implemented. Consider adding for large datasets.

---

## Support

For API issues or questions, check the main README.md file.
