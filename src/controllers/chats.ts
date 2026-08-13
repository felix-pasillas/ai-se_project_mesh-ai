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

export const getChatById = (req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: {
      chatId: req.params.id,
      title: 'Sample Chat',
      createdAt: '2026-01-01T00:00:00Z',
    },
    error: null,
  });
};

export const deleteChat = (req: Request, res: Response): void => {
  res.status(204).send();
};

export const sendMessage = (req: Request, res: Response): void => {
  const body = req.body ?? {};

  res.status(201).json({
    success: true,
    data: {
      chatId: req.params.id,
      messageId: 'msg_001',
      userMessage: body.message ?? null,
      reply: 'This is a fake AI reply.',
      createdAt: new Date().toISOString(),
    },
    error: null,
  });
};