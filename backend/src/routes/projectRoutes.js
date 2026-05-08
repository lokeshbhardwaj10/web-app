import express from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  validateProjectData,
} from '../controllers/projectController.js';
import { handleValidationErrors } from '../utils/errorHandler.js';
import teamRoutes from './teamRoutes.js';
import taskRoutes from './taskRoutes.js';

const router = express.Router();

router.use(authenticate);

router.post('/', validateProjectData, handleValidationErrors, createProject);
router.get('/', getProjects);
router.get('/:projectId', getProjectById);
router.put('/:projectId', validateProjectData, handleValidationErrors, updateProject);
router.delete('/:projectId', deleteProject);

// Team member routes
router.use('/:projectId/team', teamRoutes);

// Task routes
router.use('/:projectId/tasks', taskRoutes);

export default router;
