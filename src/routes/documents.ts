import { Router } from 'express';
import {
  getDocuments,
  createDocument,
  getDocumentById,
  deleteDocument,
} from '../controllers/documents.js';
import { auth } from '../middleware/auth.js';

const documentsRouter = Router();

documentsRouter.use(auth);

documentsRouter.get('/', getDocuments);
documentsRouter.post('/', createDocument);
documentsRouter.get('/:id', getDocumentById);
documentsRouter.delete('/:id', deleteDocument);

export { documentsRouter };