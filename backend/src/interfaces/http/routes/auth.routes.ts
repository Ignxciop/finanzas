import { Router } from 'express';
import { AuthController } from '../controllers/AuthController.js';

const router = Router();
const authController = new AuthController();

router.post('/register', authController.register);

export default router;
