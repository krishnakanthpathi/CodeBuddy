import db from '../config/db.js';

const Users = {
  // Create a new user
  async create({ name, email, password }) {
    const [result] = await db.query(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
      [name, email, password]
    );
    return { id: result.insertId, name, email };
  },

  // Get user by ID
  async getById(id) {
    const [rows] = await db.query(`SELECT * FROM users WHERE id = ?`, [id]);
    return rows[0];
  },

  // Get user by email
  async getByEmail(email) {
    const [rows] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);
    return rows[0];
  },

  // Update user
  async update(id, { name, email, password }) {
    const [result] = await db.query(
      `UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`,
      [name, email, password, id]
    );
    return result.affectedRows > 0;
  },

  // Delete user
  async delete(id) {
    const [result] = await db.query(`DELETE FROM users WHERE id = ?`, [id]);
    return result.affectedRows > 0;
  },

  // Get all users
  async getAll() {
    const [rows] = await db.query(`SELECT * FROM users`);
    return rows;
  }
};

export default Users;
