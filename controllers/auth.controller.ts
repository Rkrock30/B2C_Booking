// controllers/auth.controller.ts
import User from '../models/User';
import bcrypt from 'bcrypt';
import { generateToken } from '../services/jwt.service';
import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

const signupSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const signupController = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { error } = signupSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = generateToken({ userId: user._id.toString() }, '1h');
    return res.status(201).json({ token });
  } catch (err) {
    console.error('Signup Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const loginController = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = generateToken({ userId: user._id.toString() }, '1h');
    return res.status(200).json({ token });
  } catch (err) {
    console.error('Login Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
