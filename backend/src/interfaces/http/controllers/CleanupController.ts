import { Request, Response, NextFunction } from 'express';
import { CleanupService } from '../../../infrastructure/services/CleanupService.js';
import { logger } from '../../../infrastructure/logger/logger.js';

export class CleanupController {
  /**
   * Ejecuta la limpieza manual de usuarios no verificados y tokens expirados
   */
  runCleanup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info('Limpieza manual solicitada');
      
      await CleanupService.runCleanup();

      res.status(200).json({
        success: true,
        message: 'Limpieza ejecutada exitosamente',
      });
    } catch (error) {
      next(error);
    }
  };
}
