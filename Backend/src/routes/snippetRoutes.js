import express from 'express';

import {
  createSnippet,
  getUserSnippets,
  getSnippetById,
  updateSnippet,
  deleteSnippet
} from '../models/SnippetModels.js';

const router = express.Router();

// Create snippet
router.post('/', async (req, res) => {
  const { user_id, title, language, code } = req.body;
  const tempsnip = {
    "user_id": 1,
    "title": "Sample Snippet",
    "language": "JavaScript",
    "code": "console.log('Hello, World!');"
  }
  const id = await createSnippet({ user_id, title, language, code });
  res.json({ id });
});

// Get user's snippets
router.get('/:user_id', async (req, res) => {
  const snippets = await getUserSnippets(req.params.user_id);
  res.json(snippets);
});

// Get single snippet
router.get('/snippet/:id', async (req, res) => {
  const snippet = await getSnippetById(req.params.id);
  res.json(snippet);
});

// Update snippet
router.put('/:id', async (req, res) => {
  const { title, language, code } = req.body;
  const updated = await updateSnippet({ id: req.params.id, title, language, code });
  res.json({ updated });
});

// Delete snippet
router.delete('/:id', async (req, res) => {
  const deleted = await deleteSnippet(req.params.id);
  res.json({ deleted });
});

export default router;
