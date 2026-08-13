import type { Request, Response } from 'express';

export const getDocuments = (req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: [
      {
        documentId: 'doc_001',
        filename: 'report.pdf',
        uploadedAt: '2026-01-01T00:00:00Z',
      },
      {
        documentId: 'doc_002',
        filename: 'notes.pdf',
        uploadedAt: '2026-01-02T00:00:00Z',
      },
    ],
    error: null,
  });
};

export const createDocument = (req: Request, res: Response): void => {
  const body = req.body ?? {};

  res.status(201).json({
    success: true,
    data: {
      documentId: 'doc_003',
      filename: body.filename ?? 'untitled.pdf',
      uploadedAt: new Date().toISOString(),
    },
    error: null,
  });
};

export const getDocumentById = (req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: {
      documentId: req.params.id,
      filename: 'sample-document.pdf',
      uploadedAt: '2026-01-01T00:00:00Z',
    },
    error: null,
  });
};

export const deleteDocument = (req: Request, res: Response): void => {
  res.status(204).send();
};
