import express from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  addTeamMember,
  getTeamMembers,
  removeTeamMember,
  validateTeamMember,
} from '../controllers/teamController.js';
import { handleValidationErrors } from '../utils/errorHandler.js';

const router = express.Router({ mergeParams: true });

router.use(authenticate);

router.post('/', validateTeamMember, handleValidationErrors, addTeamMember);
router.get('/', getTeamMembers);
router.delete('/:memberId', removeTeamMember);

export default router;
