import { Router } from 'express';
import multer from 'multer';
import {
  getDocuments,
  uploadDocument,
  getDocumentById,
  deleteDocument,
} from '../controllers/documents.js';
import { auth } from '../middleware/auth.js';

const upload = multer({ dest: 'uploads/' });

const documentsRouter = Router();

documentsRouter.use(auth);

documentsRouter.get('/', getDocuments);
documentsRouter.post('/', upload.single('file'), uploadDocument);
documentsRouter.get('/:id', getDocumentById);
documentsRouter.delete('/:id', deleteDocument);

export { documentsRouter };