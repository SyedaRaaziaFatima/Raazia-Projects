import { tasks } from '../_data.js';

let nextId = 4;

/**
 * POST /api/tasks/create
 * Create a new task
 * 
 * Request body:
 * {
 *   title: string (required),
 *   description: string (optional),
 *   status: 'pending' | 'in-progress' | 'completed' (optional, default: 'pending'),
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

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
      message: `${req.method} is not allowed. Use POST instead.`
    });
  }

  try {
    const { title, description = '', status = 'pending', dueDate = '' } = req.body;

    // Validate required fields
    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        message: 'Title is required'
      });
    }

    // Validate status
    const validStatuses = ['pending', 'in-progress', 'completed'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        message: `Status must be one of: ${validStatuses.join(', ')}`
      });
    }

    // Create new task
    const newTask = {
      id: nextId++,
      title: title.trim(),
      description: description.trim(),
      status,
      dueDate,
      createdAt: new Date().toISOString()
    };

    // Add task to array
    tasks.push(newTask);

    return res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: newTask,
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
