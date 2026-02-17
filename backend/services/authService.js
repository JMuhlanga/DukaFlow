import db from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const loginUser = async (username, password) => {
  // 1. Find user in MySQL
  const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
  const user = rows[0];

  if (!user) {
    throw new Error('User not found, Mkubwa.');
  }

  // 2. Verify password
  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error('Invalid credentials.');
  }

  // 3. Generate JWT Token
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' } // Token lasts 24 hours
  );

  return {
    token,
    user: { id: user.id, username: user.username, role: user.role }
  };
};

export const registerUser = async (username, password, role = 'staff') => {
  // 1. Check if the user already exists in the Duka
  const [existing] = await db.execute('SELECT id FROM users WHERE username = ?', [username]);
  if (existing.length > 0) {
    throw new Error('Username already taken, tafadhali choose another.');
  }

  // 2. Hash the password (10 rounds of salt is standard)
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 3. Save to MySQL
  const [result] = await db.execute(
    'INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)',
    [username, hashedPassword, role]
  );

  return { id: result.insertId, username, role };
};