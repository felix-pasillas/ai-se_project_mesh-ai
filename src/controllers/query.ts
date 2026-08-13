import type { Request, Response } from 'express';

export const askQuestion = (req: Request, res: Response): void => {
  const body = req.body ?? {};

  res.status(200).json({
    success: true,
    data: {
      question: body.question ?? null,
      answer: 'This is a fake AI-generated answer.',
      sources: [],
    },
    error: null,
  });
};
