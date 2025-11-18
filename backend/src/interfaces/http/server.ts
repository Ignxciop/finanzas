import express, { Application } from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import { config } from '../../infrastructure/config/env.js';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { logger } from '../../infrastructure/logger/logger.js';
import { generalLimiter } from './middlewares/rateLimiter.js';

export const createServer = (): Application => {
  const app = express();

  // Logger HTTP
  app.use(
    pinoHttp({
      logger,
      // No serializar automáticamente req/res completos
      autoLogging: {
        ignore: (req) => req.url === '/health' // Ignorar health checks
      },
      serializers: {
        req: (req) => ({
          method: req.method,
          url: req.url,
        }),
        res: (res) => ({
          statusCode: res.statusCode,
        }),
      },
      customLogLevel: (req, res, err) => {
        if (res.statusCode >= 500 || err) return 'error';
        if (res.statusCode >= 400) return 'warn';
        if (res.statusCode >= 300) return 'silent';
        return 'info';
      },
      customSuccessMessage: (req, res) => {
        return `${req.method} ${req.url} → ${res.statusCode}`;
      },
      customErrorMessage: (req, res, err) => {
        return `${req.method} ${req.url} → ${res.statusCode} - ${err.message}`;
      },
    })
  );

  // Middlewares
  app.use(cors({ origin: config.cors.origin }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Rate limiting general
  app.use('/api', generalLimiter);

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
