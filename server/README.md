# MeshAI Server

Backend API for MeshAI — a knowledge base and chat assistant that answers questions using retrieval-augmented generation (RAG) over documents you upload.

## Tech Stack

- Express 5 + TypeScript
- MongoDB with Mongoose
- JWT authentication (`jsonwebtoken`, `bcrypt`)
- File uploads via `multer`
- PDF parsing via `pdf-parse`
- LLM/embeddings via the OpenAI SDK, pointed at Nebius Token Factory

## Getting Started

### Install dependencies

```bash
npm install
```

### Environment variables

Create a `.env` file in this directory with:

| Variable         | Description                                                      |
| ---------------- | ---------------------------------------------------------------- |
| `MONGO_URI`      | MongoDB connection string                                        |
| `JWT_SECRET`     | Secret used to sign and verify auth tokens                       |
| `NEBIUS_API_KEY` | API key for Nebius Token Factory (embeddings + chat completions) |
| `PORT`           | Port to run the server on (optional, defaults to `3000`)         |

### Run in development

```bash
npm run dev
```

Starts the server with `nodemon`, restarting on file changes.

### Build and run in production

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## API Overview

All routes are prefixed with `/`. Protected routes require an `Authorization: Bearer <token>` header.

| Method | Path                  | Description                                                                               | Auth |
| ------ | --------------------- | ----------------------------------------------------------------------------------------- | ---- |
| POST   | `/auth/register`      | Create a new user account                                                                 | No   |
| POST   | `/auth/login`         | Log in and receive a JWT                                                                  | No   |
| GET    | `/users/me`           | Get the current user's profile                                                            | Yes  |
| GET    | `/documents`          | List the current user's uploaded documents                                                | Yes  |
| POST   | `/documents`          | Upload a PDF (multipart `FormData`, field `file`); embeds and stores its chunks           | Yes  |
| GET    | `/chats`              | List the current user's chats                                                             | Yes  |
| POST   | `/chats`              | Create a new chat                                                                         | Yes  |
| GET    | `/chats/:id`          | Get a chat and its messages                                                               | Yes  |
| DELETE | `/chats/:id`          | Delete a chat                                                                             | Yes  |
| POST   | `/chats/:id/messages` | Ask a question in a chat; runs the RAG pipeline and returns the user + assistant messages | Yes  |
| POST   | `/query`              | One-off RAG query against the current user's documents (no chat persistence)              | Yes  |
| GET    | `/health`             | Health check                                                                              | No   |

## Response Shape

All API responses follow a consistent envelope:

```json
{
  "success": true,
  "data": {/* ... */},
  "error": null
}
```

On failure, `success` is `false`, `data` is `null`, and `error.message` describes what went wrong.
