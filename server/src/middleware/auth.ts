import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      data: null,
      error: { message: 'authorization token required' },
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({
      success: false,
      data: null,
      error: { message: 'authorization token required' },
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as unknown as {
      userId: string;
    };

    req.user = { userId: decoded.userId };
    next();
  } catch (_err) {
    res.status(401).json({
      success: false,
      data: null,
      error: { message: 'invalid or expired token' },
    });
  }
};