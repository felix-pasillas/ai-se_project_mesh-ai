import type { Request, Response, NextFunction } from 'express';

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    data: null,
    error: 'Not Found',
  });
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err);
  res.status(500).json({
    success: false,
    data: null,
    error: 'Internal Server Error',
  });
};
