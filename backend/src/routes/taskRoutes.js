import express from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  validateTask,
  validateTaskUpdate,
} from '../controllers/taskController.js';
import { handleValidationErrors } from '../utils/errorHandler.js';

const router = express.Router({ mergeParams: true });

router.use(authenticate);

router.post('/', validateTask, handleValidationErrors, createTask);
router.get('/', getTasks);
router.get('/:taskId', getTaskById);
router.put('/:taskId', validateTaskUpdate, handleValidationErrors, updateTask);
router.delete('/:taskId', deleteTask);

export default router;
