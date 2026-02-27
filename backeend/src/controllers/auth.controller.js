import Student from "../models/student.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const student = await Student.create(req.body);
    
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d"
    });

    res.status(201).json({ 
      token,
      user: {
        id: student._id,
        name: student.name,
        email: student.email
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(400).json({ message: err.message || 'Registration failed' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const student = await Student.findOne({ email });
  if (!student) return res.status(400).json({ message: "Invalid email" });

  const isMatch = await bcrypt.compare(password, student.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d"
  });

  res.json({ 
    token,
    user: {
      id: student._id,
      name: student.name,
      email: student.email
    }
  });
};