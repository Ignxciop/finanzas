import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../../infrastructure/errors/AppError.js';
import { logger } from '../../../infrastructure/logger/logger.js';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    logger.warn({ error: err.message, statusCode: err.statusCode, path: req.path }, 'Application error');
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Error de validación de value objects del dominio
  if (err.message.includes('requerido') || 
      err.message.includes('válido') || 
      err.message.includes('caracteres')) {
    logger.warn({ error: err.message, path: req.path }, 'Validation error');
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // Error no controlado
  logger.error({ error: err.message, stack: err.stack, path: req.path }, 'Unhandled error');
  
  return res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
  });
};
