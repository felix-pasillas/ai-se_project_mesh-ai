import express from 'express';
import router from './routes/index.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler, errorHandler } from './middleware/error.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);

app.use(router);

app.get('/health', (req, res): void => {
  res.status(200).json({
    success: true,
    data: { status: 'ok' },
    error: null,
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
