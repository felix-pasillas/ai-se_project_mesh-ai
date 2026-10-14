# MeshAI

MeshAI is a full-stack AI assistant. Users upload documents to a personal knowledge base and ask questions about them in a chat interface. Answers are generated with retrieval-augmented generation (RAG) over the uploaded content.

**Live:** <https://mytodoapp.surfnet.ca>

## Tech stack

- **React + TypeScript** (Vite) for the client
- **Express + TypeScript** for the API, with JWT authentication
- **MongoDB** (Mongoose) for users, documents, chunks, and chats
- **Nebius Token Factory** (via the OpenAI SDK) for embeddings and chat completions
- **Docker** and Docker Compose for containerization
- **Caddy** as the reverse proxy and static file server, with automatic HTTPS
- **AWS EC2** for hosting
- **GitHub Actions** for CI (build and lint for client and server)

## Getting started

Prerequisites: Node.js 20+, Docker (for the containerized setup), and a Nebius API key.

### Run locally with Node

1. Clone the repository and `cd` into it.
2. Install dependencies for the root, server, and client:

```
   npm run install:all
```

3. Create `server/.env` with the variables listed below (`MONGO_URI`, `JWT_SECRET`, `NEBIUS_API_KEY`). Use `.env.example` as a reference for the names.
4. Start the server and client together:

```
   npm run dev
```

The client runs on Vite's dev server and proxies `/api` requests to the backend on port 3000.

### Run with Docker

1. Copy `.env.example` to `.env` in the project root and fill in the values. Set `SITE_ADDRESS=localhost` for local use.
2. Build and start the full stack (MongoDB, backend, frontend, and Caddy):

```
   docker compose up --build
```

3. Open `https://localhost`. Your browser will warn about the certificate because Caddy signs it with a local authority for `localhost`. Proceed past the warning.

In the Docker setup, Compose points the backend at the bundled MongoDB container, so the `MONGO_URI` value in `.env` is not used there.

## Environment variables

| Variable         | Description                                                                       |
| ---------------- | --------------------------------------------------------------------------------- |
| `MONGO_URI`      | MongoDB connection string (used by `npm run dev`)                                 |
| `JWT_SECRET`     | Secret key used to sign authentication tokens                                     |
| `NEBIUS_API_KEY` | API key for the Nebius AI service                                                 |
| `SITE_ADDRESS`   | Domain name Caddy serves (Docker only), for example `localhost` or your subdomain |
| `PORT`           | Optional. Backend port, defaults to `3000`                                        |

`NODE_ENV` is set automatically: `development` by `npm run dev`, and `production` in the Docker setup. In production the backend uses JSON logging, request logging in the `combined` format, and rate limiting on the login and register routes.

## Deployment

The app runs on an AWS EC2 instance with Docker Compose. Caddy terminates HTTPS and routes `/api/*` to the backend (stripping the `/api` prefix) and everything else to the frontend container. GitHub Actions validates the client and server (install, build, lint) on every pull request and on every push to `main`.

## Project Pitch Video

Check out this video, where I describe my
project and some challenges I faced while building it.
https://drive.google.com/file/d/1yakyYihVsqieXPGpvPwySml5YqwCULEX/view?usp=sharing
