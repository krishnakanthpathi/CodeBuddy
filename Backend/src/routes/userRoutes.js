// src/routes/usersRoutes.js
import express from 'express';

import {
  signup,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/userController.js';

const router = express.Router();

// Create a new user (signup)
router.post('/signup' , signup);

// Login
router.post('/login', login);

// Get user by ID
router.get('/:id', getUserById);

// Update user by ID
router.put('/:id', updateUser);

// Delete user by ID
router.delete('/:id', deleteUser);

// Get all users  
router.get('/', getAllUsers);

export default router;