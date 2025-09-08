import express from 'express';

import { protect } from '../middleware/authMiddleware.js';

import {
  createSnippetController,
  getUserSnippetsController,
  getSnippetByIdController,
  updateSnippetController,
  deleteSnippetController
} from '../controllers/snippetController.js';

const router = express.Router();

// Create snippet
router.post('/create', protect , createSnippetController);

// Get user's snippets
router.get('/:user_id' , protect , getUserSnippetsController);

// Get snippet by ID
router.get('/snippet/:id', protect , getSnippetByIdController);

// Update snippet
router.put('/snippet/:id', protect , updateSnippetController);

// Delete snippet
router.delete('/snippet/:id', protect , deleteSnippetController);


export default router;
