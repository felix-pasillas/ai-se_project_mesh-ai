import mongoose from 'mongoose';
import type { Request, Response } from 'express';
import Chat from '../models/chat.js';
import Document from '../models/document.js';
import Chunk from '../models/chunk.js';
import Message from '../models/message.js';
import { createEmbedding } from '../utils/embeddings.js';
import { rankBySimilarity } from '../utils/vector-search.js';
import { getClient, LLM_MODEL, buildContext } from '../utils/openai-client.js';

export const createMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { question } = req.body ?? {};
  const chatId = req.params.id as string;
  const userId = req.user!.userId;

  if (!question) {
    res.status(400).json({
      success: false,
      data: null,
      error: { message: 'question is required' },
    });
    return;
  }

  const chat = await Chat.findOne({ _id: chatId, userId });

  if (!chat) {
    res.status(404).json({
      success: false,
      data: null,
      error: { message: 'chat not found' },
    });
    return;
  }

  // RAG pipeline — same as queryDocuments
  const userDocs = await Document.find({ userId }, '_id');
  const docIds = userDocs.map(
    (d: { _id: mongoose.Types.ObjectId }) => d._id
  );
  const chunkRecords = await Chunk.find({ documentId: { $in: docIds } });
  const chunks = chunkRecords.map((c) => ({
    id: String(c._id),
    documentId: String(c.documentId),
    text: c.text,
    embedding: c.embedding,
  }));
  const queryEmbedding = await createEmbedding(question);
  const ranked = rankBySimilarity(queryEmbedding, chunks, 5);
  const context = buildContext(ranked);

  const completion = await getClient().chat.completions.create({
    model: LLM_MODEL,
    messages: [
      {
        role: 'system',
        content:
          'You are a helpful assistant. Answer the question using only the provided context. If the context does not contain the answer, say you do not know.',
      },
      {
        role: 'user',
        content: `Context:\n${context}\n\nQuestion: ${question}`,
      },
    ],
  });

  const answer = completion.choices[0]?.message?.content ?? '';

  const userMessage = await Message.create({
    chatId,
    role: 'user',
    content: question,
  });

  const assistantMessage = await Message.create({
    chatId,
    role: 'assistant',
    content: answer,
  });

  res.status(201).json({
    success: true,
    data: [userMessage, assistantMessage],
    error: null,
  });
};