# TaskFlow API Documentation

Complete serverless API for the Task Manager application deployed on Vercel.

## Base URL

```
https://your-vercel-domain.vercel.app/api
```

For local development:
```
http://localhost:3000/api
```

## API Endpoints

### 1. Get All Tasks

**GET** `/tasks`

Retrieve all tasks from the system.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Design new landing page",
      "description": "Create a modern landing page for the new product",
      "status": "in-progress",
      "dueDate": "2026-03-15",
      "createdAt": "2026-04-05T10:00:00.000Z"
    }
  ],
  "count": 3,
  "timestamp": "2026-04-05T10:05:00.000Z"
}
```

**Status Codes:**
- `200 OK` - Successfully retrieved all tasks
- `500 Internal Server Error` - Server error

---

### 2. Create New Task

**POST** `/tasks/create`

Create a new task.

**Request Body:**
```json
{
  "title": "Design new landing page",
  "description": "Create a modern landing page for the new product",
  "status": "pending",
  "dueDate": "2026-03-15"
}
```

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| title | string | ✓ | Task title (max 255 chars) |
| description | string | ✗ | Detailed task description |
| status | string | ✗ | One of: `pending`, `in-progress`, `completed` (default: `pending`) |
| dueDate | string | ✗ | Due date in format YYYY-MM-DD |

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": 4,
    "title": "Design new landing page",
    "description": "Create a modern landing page for the new product",
    "status": "pending",
    "dueDate": "2026-03-15",
    "createdAt": "2026-04-05T10:05:00.000Z"
  },
  "timestamp": "2026-04-05T10:05:00.000Z"
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Validation error",
  "message": "Title is required"
}
```

**Status Codes:**
- `201 Created` - Task created successfully
- `400 Bad Request` - Validation error
- `405 Method Not Allowed` - Wrong HTTP method
- `500 Internal Server Error` - Server error

---

### 3. Update Task

**PUT** `/tasks/update`  
**PATCH** `/tasks/update`

Update an existing task.

**Request Body:**
```json
{
  "id": 1,
  "title": "Updated title",
  "description": "Updated description",
  "status": "in-progress",
  "dueDate": "2026-03-20"
}
```

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | number | ✓ | Task ID to update |
| title | string | ✗ | New task title |
| description | string | ✗ | New task description |
| status | string | ✗ | One of: `pending`, `in-progress`, `completed` |
| dueDate | string | ✗ | New due date (YYYY-MM-DD) |

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "id": 1,
    "title": "Updated title",
    "description": "Updated description",
    "status": "in-progress",
    "dueDate": "2026-03-20",
    "updatedAt": "2026-04-05T10:10:00.000Z"
  },
  "timestamp": "2026-04-05T10:10:00.000Z"
}
```

**Status Codes:**
- `200 OK` - Task updated successfully
- `400 Bad Request` - Validation error
- `404 Not Found` - Task not found
- `405 Method Not Allowed` - Wrong HTTP method
- `500 Internal Server Error` - Server error

---

### 4. Delete Task

**DELETE** `/tasks/delete?id=:taskId`  
**POST** `/tasks/delete` (with body)

Delete a task by ID.

**Query Parameters (for DELETE):**
```
?id=1
```

**Request Body (for POST):**
```json
{
  "id": 1
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Task deleted successfully",
  "data": {
    "id": 1,
    "title": "Design new landing page",
    "description": "Create a modern landing page for the new product",
    "status": "in-progress",
    "dueDate": "2026-03-15"
  },
  "timestamp": "2026-04-05T10:15:00.000Z"
}
```

**Status Codes:**
- `200 OK` - Task deleted successfully
- `400 Bad Request` - Invalid task ID
- `404 Not Found` - Task not found
- `405 Method Not Allowed` - Wrong HTTP method
- `500 Internal Server Error` - Server error

---

## Task Schema

```json
{
  "id": 1,
  "title": "string (required, max 255 chars)",
  "description": "string (optional)",
  "status": "pending | in-progress | completed",
  "dueDate": "YYYY-MM-DD format or empty string",
  "createdAt": "ISO 8601 timestamp",
  "updatedAt": "ISO 8601 timestamp (optional, only if updated)"
}
```

## Status Codes Reference

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid parameters |
| 404 | Not Found - Resource not found |
| 405 | Method Not Allowed - Wrong HTTP method |
| 500 | Internal Server Error - Server error |

## CORS Headers

All endpoints include CORS headers:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version
```

## Example Usage

### Using cURL

**Get all tasks:**
```bash
curl -X GET https://your-domain.vercel.app/api/tasks
```

**Create a task:**
```bash
curl -X POST https://your-domain.vercel.app/api/tasks/create \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Task",
    "description": "Task description",
    "status": "pending",
    "dueDate": "2026-04-15"
  }'
```

**Update a task:**
```bash
curl -X PUT https://your-domain.vercel.app/api/tasks/update \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "status": "completed"
  }'
```

**Delete a task:**
```bash
curl -X DELETE "https://your-domain.vercel.app/api/tasks/delete?id=1"
```

### Using JavaScript/Fetch

**Get all tasks:**
```javascript
const response = await fetch('http://localhost:3000/api/tasks');
const data = await response.json();
console.log(data);
```

**Create a task:**
```javascript
const response = await fetch('http://localhost:3000/api/tasks/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'New Task',
    description: 'Task description',
    status: 'pending',
    dueDate: '2026-04-15'
  })
});
const data = await response.json();
console.log(data);
```

**Update a task:**
```javascript
const response = await fetch('http://localhost:3000/api/tasks/update', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: 1,
    status: 'completed'
  })
});
const data = await response.json();
console.log(data);
```

**Delete a task:**
```javascript
const response = await fetch('http://localhost:3000/api/tasks/delete?id=1', {
  method: 'DELETE'
});
const data = await response.json();
console.log(data);
```

### Using Axios

```javascript
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Get all tasks
axios.get(`${API_URL}/tasks`)
  .then(response => console.log(response.data))
  .catch(error => console.error(error));

// Create task
axios.post(`${API_URL}/tasks/create`, {
  title: 'New Task',
  description: 'Task description',
  status: 'pending',
  dueDate: '2026-04-15'
})
  .then(response => console.log(response.data))
  .catch(error => console.error(error));

// Update task
axios.put(`${API_URL}/tasks/update`, {
  id: 1,
  status: 'completed'
})
  .then(response => console.log(response.data))
  .catch(error => console.error(error));

// Delete task
axios.delete(`${API_URL}/api/tasks/delete?id=1`)
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

## Deployment to Vercel

### Step 1: Prepare for Deployment

Ensure your `vercel.json` is in the root directory with proper configuration.

### Step 2: Install Vercel CLI

```bash
npm i -g vercel
```

### Step 3: Login to Vercel

```bash
vercel login
```

### Step 4: Deploy

```bash
vercel
```

Or for production:
```bash
vercel --prod
```

### Step 5: Update Frontend

Update your React app's `VITE_API_URL` environment variable to point to your Vercel deployment:

```env
VITE_API_URL=https://your-project-name.vercel.app/api
```

## Development

Run the development server with API routes:
```bash
npm run dev
```

API will be available at `http://localhost:3000/api`

## Error Handling

All endpoints follow a consistent error response format:

```json
{
  "success": false,
  "error": "Error category",
  "message": "Detailed error message"
}
```

## Rate Limiting

Currently, there are no rate limits. For production, consider implementing:
- Request rate limiting
- IP-based throttling
- Authentication tokens

## Notes

- Tasks are stored in memory and will reset when the serverless function restarts
- For persistent storage, implement a database (PostgreSQL, MongoDB, etc.)
- All timestamps return in ISO 8601 format
- Date format expected: YYYY-MM-DD
