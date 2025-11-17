import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../../../infrastructure/security/jwt.js';
import { UnauthorizedError } from '../../../infrastructure/errors/AppError.js';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Token no proporcionado');
    }

    const token = authHeader.substring(7);
    const payload = JwtService.verify(token);

    req.user = payload;
    next();
  } catch (error) {
    next(new UnauthorizedError('Token inválido o expirado'));
  }
};
