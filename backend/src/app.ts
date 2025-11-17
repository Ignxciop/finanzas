import { createServer } from './interfaces/http/server.js';
import { config } from './infrastructure/config/env.js';

const app = createServer();

app.listen(config.port, () => {
  console.log(`🚀 Servidor corriendo en puerto ${config.port}`);
  console.log(`📝 Entorno: ${config.nodeEnv}`);
  console.log(`🔗 CORS permitido desde: ${config.cors.origin}`);
  console.log(`\n✅ Backend listo para recibir peticiones`);
});

// Manejo de errores no capturados
process.on('unhandledRejection', (reason, promise) => {
  console.error('Promesa rechazada no manejada:', promise, 'razón:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('Excepción no capturada:', error);
  process.exit(1);
});
