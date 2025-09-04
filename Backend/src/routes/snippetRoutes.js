import express from 'express';

import {
  createSnippetController,
  getUserSnippetsController,
  getSnippetByIdController,
  updateSnippetController,
  deleteSnippetController
} from '../controllers/snippetController.js';

const router = express.Router();

// Create snippet
router.post('/', createSnippetController);

// Get user's snippets
router.get('/:user_id', getUserSnippetsController);

// Get snippet by ID
router.get('/snippet/:id', getSnippetByIdController);

// Update snippet
router.put('/:id', updateSnippetController);

// Delete snippet
router.delete('/:id', deleteSnippetController);


export default router;
