import Snippets from '../models/SnippetModels.js';
export const createSnippetController = async (req, res) => {
    const { user_id, title, language, code } = req.body;
    console.log(" creating a snippet  " + JSON.stringify(req.body));
    const snippet = await Snippets.create({ user_id, title, language, code });
    console.log(" created snippet id " + snippet.id);
    res.json({ id: snippet.id });
}

export const getUserSnippetsController = async (req, res) => {
    console.log(" getting snippets for user  " + req.params.user_id);
    const snippets = await Snippets.findAll({ where: { user_id: req.params.user_id } });
    console.log(" snippets found " + snippets.length);
    res.json(snippets);
}

export const getSnippetByIdController = async (req, res) => {
    console.log(" getting a snippet  " + req.params.id);
    const snippet = await Snippets.findByPk(req.params.id);
    if (!snippet) {
        return res.status(404).json({ error: "Snippet not found" });
    }
    console.log(" snippet found " + snippet.id);
    res.json(snippet);
}

export const updateSnippetController = async (req, res) => {
    const { title, language, code } = req.body;
    console.log(" updating a snippet  " + JSON.stringify(req.body));
    const snippet = await Snippets.findByPk(req.params.id);
    if (!snippet) {
        return res.status(404).json({ error: "Snippet not found" });
    }
    await snippet.update({ title, language, code });
    console.log(" updated snippet id " + req.params.id);
    res.json({ updated: true });
}

export const deleteSnippetController = async (req, res) => {
    const snippet = await Snippets.findByPk(req.params.id);
    if (!snippet) {
        return res.status(404).json({ error: "Snippet not found" });
    }
    await snippet.destroy();
    console.log(" deleted snippet id " + req.params.id);
    res.json({ deleted: true });
}
