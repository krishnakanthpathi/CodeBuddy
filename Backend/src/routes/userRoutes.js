// src/routes/usersRoutes.js
import express from 'express';

import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/userController.js';

import { 
  signup,
  login
} from '../controllers/authController.js';

import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

// Create a new user (signup)
router.post('/signup' , signup);

// Login
router.post('/login', login);

// Get all users
router.get('/', protect , getAllUsers);

// Get user by ID
router.get('/:id', protect , getUserById);

// Update user
router.put('/:id', protect , updateUser);

// Delete user
router.delete('/:id', protect , deleteUser);

export default router;