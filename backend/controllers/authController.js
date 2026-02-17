import * as authService from '../services/authService.js';

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const data = await authService.loginUser(username, password);
    res.status(200).json(data);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const newUser = await authService.registerUser(username, password, role);
    res.status(201).json({
      message: "User registered successfully!",
      user: newUser
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};