import { Router } from 'express';
import {
  getDocuments,
  createDocument,
  getDocumentById,
  deleteDocument,
} from '../controllers/documents.js';

const documentsRouter = Router();

documentsRouter.get('/', getDocuments);
documentsRouter.post('/', createDocument);
documentsRouter.get('/:id', getDocumentById);
documentsRouter.delete('/:id', deleteDocument);

export { documentsRouter };
