import { Router } from 'express';
import authRoutes from './auth.routes.js';
import emailRoutes from './email.routes.js';
import cleanupRoutes from './cleanup.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/email', emailRoutes);
router.use('/cleanup', cleanupRoutes);

export default router;
