import express from 'express';
import { signup, login, validateSignup, validateLogin } from '../controllers/authController.js';
import { handleValidationErrors } from '../utils/errorHandler.js';

const router = express.Router();

router.post('/signup', validateSignup, handleValidationErrors, signup);
router.post('/login', validateLogin, handleValidationErrors, login);

export default router;
