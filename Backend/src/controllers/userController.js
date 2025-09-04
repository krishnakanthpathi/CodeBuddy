import Users from '../models/userModels.js';
import bcrypt from 'bcryptjs';

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.getAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.getById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await Users.getById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If email is being updated, check for uniqueness
    if (email && email !== user.email) {
      const existingUser = await Users.getByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
    await Users.update(id, { name, email, password: hashedPassword });
    res.json({ message: 'User updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Users.delete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};