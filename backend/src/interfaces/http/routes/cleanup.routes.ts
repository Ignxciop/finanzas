import { Router } from 'express';
import { CleanupController } from '../controllers/CleanupController.js';
import { strictLimiter } from '../middlewares/rateLimiter.js';

const router = Router();
const cleanupController = new CleanupController();

// Endpoint para ejecutar limpieza manual (solo para administradores o desarrollo)
router.post('/run', strictLimiter, cleanupController.runCleanup);

export default router;
