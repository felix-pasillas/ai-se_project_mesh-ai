import { Router } from 'express';
import { getChats, createChat } from '../controllers/chats.js';

const chatsRouter = Router();

chatsRouter.get('/', getChats);
chatsRouter.post('/', createChat);

export { chatsRouter };
