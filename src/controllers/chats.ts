import type { Request, Response } from 'express';
import Chat from '../models/chat.js';
import Message from '../models/message.js';

export const createChat = async (req: Request, res: Response): Promise<void> => {
  const { title } = req.body ?? {};
  const userId = req.user!.userId;

  if (!title) {
    res.status(400).json({
      success: false,
      data: null,
      error: { message: 'title is required' },
    });
    return;
  }

  const chat = await Chat.create({ title, userId });

  res.status(201).json({
    success: true,
    data: chat,
    error: null,
  });
};

export const getChats = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user!.userId;

  const chats = await Chat.find({ userId });

  res.status(200).json({
    success: true,
    data: chats,
    error: null,
  });
};

export const getChat = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user!.userId;

  const chat = await Chat.findOne({ _id: req.params.id, userId });

  if (!chat) {
    res.status(404).json({
      success: false,
      data: null,
      error: { message: 'chat not found' },
    });
    return;
  }

  const messages = await Message.find({ chatId: chat._id }).sort({
    createdAt: 1,
  });

  res.status(200).json({
    success: true,
    data: { chat, messages },
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