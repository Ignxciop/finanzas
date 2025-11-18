import { Router } from 'express';
import { AuthController } from '../controllers/AuthController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { authLimiter, strictLimiter } from '../middlewares/rateLimiter.js';

const router = Router();
const authController = new AuthController();

// Rutas públicas con rate limiting estricto
router.post('/register', authLimiter, authController.register);
router.post('/login', authLimiter, authController.login);

// Rutas protegidas
router.get('/me', authMiddleware, authController.me);

// Rutas sensibles con rate limiting muy estricto
router.delete('/account', authMiddleware, strictLimiter, authController.deleteAccount);

export default router;
