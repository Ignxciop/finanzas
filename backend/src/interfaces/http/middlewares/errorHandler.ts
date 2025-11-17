import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../../infrastructure/errors/AppError.js';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Error de validación de value objects del dominio
  if (err.message.includes('requerido') || 
      err.message.includes('válido') || 
      err.message.includes('caracteres')) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // Error no controlado
  console.error('Error no controlado:', err);
  
  return res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
  });
};
