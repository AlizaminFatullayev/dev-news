import express from 'express';
import cors from 'cors';
import articlesRouter from './routes/articles.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/articles', articlesRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'DevNews API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 DevNews API running on http://localhost:${PORT}`);
});
