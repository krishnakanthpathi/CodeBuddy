import Users from "../models/userModels.js";
import bcrypt from "bcryptjs";


// Create a new user (signup)
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if email already exists
    const existingUser = await Users.getByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: 'User created', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.getByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // For simplicity, return user data (in production use JWT or session)
    res.json({ message: 'Login successful', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
