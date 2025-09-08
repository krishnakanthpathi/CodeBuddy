import Snippets from '../models/SnippetModels.js';

// ✅ Create Snippet (user_id comes from JWT, not body)
export const createSnippetController = async (req, res) => {
  try {
    const { title, language, code } = req.body;
    const user_id = req.user.id; // from JWT

    console.log("Creating a snippet for user " + user_id);

    const snippet = await Snippets.createSnippet({ user_id, title, language, code });
    console.log("Created snippet with ID " + snippet);
    res.status(201).json({ 
      message: "Created successfully", 
      "id": snippet
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create snippet" });
  }
};

// ✅ Get all snippets for logged-in user
export const getUserSnippetsController = async (req, res) => {
  try {
    const user_id = req.user.id; // from JWT
    console.log("Fetching snippets for user " + user_id);

    const snippets = await Snippets.getUserSnippets({ id: user_id });

    res.json(snippets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch snippets" });
  }
};

// ✅ Get snippet by ID (only if it belongs to logged-in user)
export const getSnippetByIdController = async (req, res) => {
  try {
    const snippet = await Snippets.getSnippetById(req.params.id);
    if (!snippet) {
      return res.status(404).json({ error: "Snippet not found" });
    }
    console.log(req);
    // check ownership
    if (snippet.user_id !== req.user.id) {
      return res.status(403).json({ error: "Not authorized to view this snippet" });
    }

    res.json(snippet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch snippet" });
  }
};

// ✅ Update snippet (only owner can update)
export const updateSnippetController = async (req, res) => {
  try {
    const { title, language, code } = req.body;
    const snippet = await Snippets.getSnippetById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    if (snippet.user_id !== req.user.id) {
      return res.status(403).json({ error: "Not authorized to update this snippet" });
    }

    await Snippets.updateSnippet({ id: req.params.id, title, language, code });

    res.json({ updated: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update snippet" });
  }
};

// ✅ Delete snippet (only owner can delete)
export const deleteSnippetController = async (req, res) => {
  try {
    const snippet = await Snippets.getSnippetById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    if (snippet.user_id !== req.user.id) {
      return res.status(403).json({ error: "Not authorized to delete this snippet" });
    }

    await Snippets.deleteSnippet(req.params.id);

    res.json({ deleted: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete snippet" });
  }
};
