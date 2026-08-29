import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { Request, Response } from 'express';
import User from '../models/user.js';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, name } = req.body ?? {};

  if (!email || !password || !name) {
    res.status(400).json({
      success: false,
      data: null,
      error: { message: 'email, password, and name are required' },
    });
    return;
  }

  if (password.length < 8) {
    res.status(400).json({
      success: false,
      data: null,
      error: { message: 'password must be at least 8 characters' },
    });
    return;
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(409).json({
      success: false,
      data: null,
      error: { message: 'Email already in use' },
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
    name,
  });

  res.status(201).json({
    success: true,
    data: {
      userId: user._id,
      email: user.email,
      name: user.name,
    },
    error: null,
  });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    res.status(400).json({
      success: false,
      data: null,
      error: { message: 'email and password are required' },
    });
    return;
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401).json({
      success: false,
      data: null,
      error: { message: 'invalid email or password' },
    });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.status(401).json({
      success: false,
      data: null,
      error: { message: 'invalid email or password' },
    });
    return;
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });

  res.status(200).json({
    success: true,
    data: {
      token,
      user: {
        userId: user._id,
        email: user.email,
        name: user.name,
      },
    },
    error: null,
  });
};

export const getCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.user!.userId;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404).json({
      success: false,
      data: null,
      error: { message: 'user not found' },
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: {
      userId: user._id,
      email: user.email,
      name: user.name,
    },
    error: null,
  });
};