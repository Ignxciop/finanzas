import { Router } from 'express';
import { EmailController } from '../controllers/EmailController.js';
import { authLimiter, strictLimiter } from '../middlewares/rateLimiter.js';

const router = Router();
const emailController = new EmailController();

// Enviar email de verificación
router.post('/send-verification', authLimiter, emailController.sendVerificationEmail);

// Verificar email
router.post('/verify', emailController.verifyEmail);

// Solicitar recuperación de contraseña
router.post('/forgot-password', authLimiter, emailController.requestPasswordReset);

// Restablecer contraseña
router.post('/reset-password', strictLimiter, emailController.resetPassword);

export default router;
