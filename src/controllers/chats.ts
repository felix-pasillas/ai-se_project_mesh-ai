import type { Request, Response } from 'express';

export const getChats = (req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: [
      {
        chatId: 'chat_001',
        title: 'First conversation',
        createdAt: '2026-01-01T00:00:00Z',
      },
      {
        chatId: 'chat_002',
        title: 'Second conversation',
        createdAt: '2026-01-02T00:00:00Z',
      },
    ],
    error: null,
  });
};

export const createChat = (req: Request, res: Response): void => {
  const body = req.body ?? {};

  res.status(201).json({
    success: true,
    data: {
      chatId: 'chat_003',
      title: body.title ?? 'New Chat',
      createdAt: new Date().toISOString(),
    },
    error: null,
  });
};
