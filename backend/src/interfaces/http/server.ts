import express, { Application } from 'express';
import cors from 'cors';
import { config } from '../../infrastructure/config/env.js';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';

export const createServer = (): Application => {
  const app = express();

  // Middlewares
  app.use(cors({ origin: config.cors.origin }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use('/api', routes);

  // Health check
  app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
  });

  // Error handler (debe ser el último middleware)
  app.use(errorHandler);

  return app;
};
