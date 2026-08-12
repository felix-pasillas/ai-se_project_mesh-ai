import express from 'express';
import router from './routes/index.js';
import { logger } from './middleware/logger.js';

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

app.use((req, res): void => {
  res.status(404).json({
    success: false,
    data: null,
    error: 'Not Found',
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
