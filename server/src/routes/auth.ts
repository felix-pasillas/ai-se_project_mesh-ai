import { Router } from 'express';
import { register, login, getCurrentUser } from '../controllers/auth.js';
import { auth } from '../middleware/auth.js';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/me', auth, getCurrentUser);

export { authRouter };