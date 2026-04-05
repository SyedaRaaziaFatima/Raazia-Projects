const express = require('express');
const { body, validationResult } = require('express-validator');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Create task
router.post(
  '/',
  [
    body('title', 'Title is required').trim().notEmpty(),
    body('status', 'Status is required').isIn(['To Do', 'In Progress', 'In Review', 'Completed']),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, status, dueDate, project, assignee, priority } = req.body;

      const task = new Task({
        title,
        description,
        status,
        dueDate: dueDate ? new Date(dueDate) : null,
        project,
        assignee,
        priority,
        creator: req.userId,
      });

      await task.save();
      res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
);

// Get all tasks for current user
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ creator: req.userId })
      .populate('assignee.userId', 'name email avatar')
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get task by ID
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('creator', 'name email');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if user is the creator
    if (task.creator._id.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to view this task' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update task
router.put('/:id', async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if user is the creator
    if (task.creator.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this task' });
    }

    const { title, description, status, dueDate, project, assignee, priority } = req.body;

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    if (dueDate) task.dueDate = new Date(dueDate);
    if (project) task.project = project;
    if (assignee) task.assignee = assignee;
    if (priority) task.priority = priority;

    await task.save();
    res.json({ message: 'Task updated successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if user is the creator
    if (task.creator.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this task' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get tasks by status
router.get('/filter/status', async (req, res) => {
  try {
    const { status } = req.query;
    const tasks = await Task.find({
      creator: req.userId,
      status: status || { $exists: true },
    }).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
