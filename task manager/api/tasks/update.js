import { tasks } from '../_data.js';

/**
 * GET /api/tasks/update?id=:taskId
 * OR
 * PUT /api/tasks/update with body
 * 
 * Update a task by ID
 * 
 * Request body:
 * {
 *   id: number (required),
 *   title: string (optional),
 *   description: string (optional),
 *   status: 'pending' | 'in-progress' | 'completed' (optional),
 *   dueDate: string (optional, format: YYYY-MM-DD)
 * }
 */
export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow PUT and PATCH requests
  if (!['PUT', 'PATCH'].includes(req.method)) {
    return res.status(405).json({
      error: 'Method not allowed',
      message: `${req.method} is not allowed. Use PUT or PATCH instead.`
    });
  }

  try {
    const { id, title, description, status, dueDate } = req.body;

    // Validate taskId
    const taskId = parseInt(id);
    if (!taskId || isNaN(taskId)) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        message: 'Task ID is required and must be a number'
      });
    }

    // Find task
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Not found',
        message: `Task with ID ${taskId} not found`
      });
    }

    // Validate status if provided
    const validStatuses = ['pending', 'in-progress', 'completed'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        message: `Status must be one of: ${validStatuses.join(', ')}`
      });
    }

    // Update task fields
    if (title) task.title = title.trim();
    if (description) task.description = description.trim();
    if (status) task.status = status;
    if (dueDate) task.dueDate = dueDate;
    task.updatedAt = new Date().toISOString();

    return res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
}
