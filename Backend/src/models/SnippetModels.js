import db from '../config/db.js';

// Create a new snippet
export const createSnippet = async ({ user_id, title, language, code }) => {
  const [result] = await db.query(
    `INSERT INTO snippets (user_id, title, language, code) VALUES (?, ?, ?, ?)`,
    [user_id, title, language, code]
  );
  return result.insertId;
};

// Get all snippets for a user
export const getUserSnippets = async (user_id) => {
  const [rows] = await db.query(
    `SELECT * FROM snippets WHERE user_id = ?`,
    [user_id]
  );
  return rows;
};

// Get snippet by ID
export const getSnippetById = async (id) => {
  console.log(id);
  const [rows] = await db.query(`SELECT * FROM snippets WHERE id = ?`, [id]);
  return rows[0];
};

// Update snippet
export const updateSnippet = async ({ id, title, language, code }) => {
  const [result] = await db.query(
    `UPDATE snippets SET title = ?, language = ?, code = ? WHERE id = ?`,
    [title, language, code, id]
  );
  return result.affectedRows;
};

// Delete snippet
export const deleteSnippet = async (id) => {
  const [result] = await db.query(`DELETE FROM snippets WHERE id = ?`, [id]);
  return result.affectedRows;
};
