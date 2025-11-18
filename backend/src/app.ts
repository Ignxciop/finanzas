import { createServer } from './interfaces/http/server.js';
import { config } from './infrastructure/config/env.js';
import { logger } from './infrastructure/logger/logger.js';
import { CleanupService } from './infrastructure/services/CleanupService.js';

const app = createServer();

app.listen(config.port, () => {
  logger.info({ port: config.port, env: config.nodeEnv, cors: config.cors.origin }, 'Server started');
  
  // Iniciar servicio de limpieza automática
  CleanupService.startScheduledCleanup();
});

// Manejo de errores no capturados
process.on('unhandledRejection', (reason, promise) => {
  logger.error({ reason, promise }, 'Unhandled rejection');
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  logger.error({ error }, 'Uncaught exception');
  process.exit(1);
});
