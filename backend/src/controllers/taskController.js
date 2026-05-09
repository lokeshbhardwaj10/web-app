import { body, validationResult } from 'express-validator';
import mongoose from 'mongoose';
import Project from '../models/Project.js';
import Task from '../models/Task.js';

export const createTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { projectId } = req.params;
    const { title, description, priority, dueDate, assignedTo } = req.body;
    const userId = req.user.userId;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const isProjectMember =
      project.owner.toString() === userId ||
      project.teamMembers.some((member) => member.user.toString() === userId);

    if (!isProjectMember) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const task = await Task.create({
      project: projectId,
      title,
      description: description || undefined,
      priority: priority || 'medium',
      assignedTo: assignedTo || undefined,
      dueDate: dueDate || undefined,
      createdBy: userId,
    });

    res.status(201).json({
      message: 'Task created successfully',
      task,
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ message: 'Error creating task' });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { status, assignedTo } = req.query;

    const filter = { project: projectId };
    if (status) filter.status = status;
    if (assignedTo) filter.assignedTo = assignedTo;

    const tasks = await Task.find(filter)
      .populate('assignedTo', 'username email firstName lastName')
      .sort({ createdAt: -1 });

    res.json({ tasks });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { projectId, taskId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    const task = await Task.findOne({ _id: taskId, project: projectId })
      .populate('assignedTo', 'username email firstName lastName')
      .populate('createdBy', 'username email firstName lastName');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ task });
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ message: 'Error fetching task' });
  }
};

export const updateTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { projectId, taskId } = req.params;
    const { title, description, status, priority, dueDate, assignedTo } = req.body;
    const userId = req.user.userId;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const isProjectMember =
      project.owner.toString() === userId ||
      project.teamMembers.some((member) => member.user.toString() === userId);

    if (!isProjectMember) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updatePayload = {};
    if (title !== undefined) updatePayload.title = title;
    if (description !== undefined) updatePayload.description = description;
    if (status !== undefined) updatePayload.status = status;
    if (priority !== undefined) updatePayload.priority = priority;
    if (dueDate !== undefined) updatePayload.dueDate = dueDate;
    if (assignedTo !== undefined) updatePayload.assignedTo = assignedTo;

    const task = await Task.findOneAndUpdate(
      { _id: taskId, project: projectId },
      updatePayload,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({
      message: 'Task updated successfully',
      task,
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ message: 'Error updating task' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { projectId, taskId } = req.params;
    const userId = req.user.userId;

    const project = await Project.findById(projectId);
    if (!project || project.owner.toString() !== userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const task = await Task.findOneAndDelete({ _id: taskId, project: projectId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ message: 'Error deleting task' });
  }
};

export const validateTask = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  body('description')
    .trim()
    .optional()
    .isLength({ max: 2000 })
    .withMessage('Description must not exceed 2000 characters'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be low, medium, or high'),
  body('status')
    .optional()
    .isIn(['todo', 'in-progress', 'done', 'overdue'])
    .withMessage('Invalid status'),
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid due date format'),
  body('assignedTo')
    .optional()
    .isMongoId()
    .withMessage('Invalid user ID'),
];

export const validateTaskUpdate = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Description must not exceed 2000 characters'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be low, medium, or high'),
  body('status')
    .optional()
    .isIn(['todo', 'in-progress', 'done', 'overdue'])
    .withMessage('Invalid status'),
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid due date format'),
  body('assignedTo')
    .optional()
    .isMongoId()
    .withMessage('Invalid user ID'),
];
