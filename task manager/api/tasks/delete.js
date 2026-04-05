import { tasks } from '../_data.js';

/**
 * DELETE /api/tasks/delete?id=:taskId
 * or POST /api/tasks/delete with body: { id: taskId }
 * 
 * Delete a task by ID
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

  // Only allow DELETE and POST requests
  if (!['DELETE', 'POST'].includes(req.method)) {
    return res.status(405).json({
      error: 'Method not allowed',
      message: `${req.method} is not allowed. Use DELETE or POST instead.`
    });
  }

  try {
    // Get taskId from query params or request body
    let taskId;
    
    if (req.method === 'DELETE') {
      taskId = req.query.id ? parseInt(req.query.id) : null;
    } else {
      taskId = req.body?.id ? parseInt(req.body.id) : null;
    }

    // Validate taskId
    if (!taskId || isNaN(taskId)) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        message: 'Task ID is required and must be a number'
      });
    }

    // Find task index
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Not found',
        message: `Task with ID ${taskId} not found`
      });
    }

    // Remove task from array
    const deletedTask = tasks.splice(taskIndex, 1)[0];

    return res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: deletedTask,
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
