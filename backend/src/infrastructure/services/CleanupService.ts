import prisma from '../db/prismaClient.js';
import { logger } from '../logger/logger.js';

export class CleanupService {
  private static CLEANUP_INTERVAL = 60 * 60 * 1000; // 1 hora en milisegundos
  private static VERIFICATION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 horas en milisegundos

  /**
   * Elimina usuarios no verificados cuyo registro tenga más de 24 horas
   */
  static async cleanupUnverifiedUsers(): Promise<void> {
    try {
      const cutoffDate = new Date(Date.now() - this.VERIFICATION_TIMEOUT);

      // Buscar usuarios no verificados creados hace más de 24 horas
      const unverifiedUsers = await prisma.user.findMany({
        where: {
          emailVerified: false,
          createdAt: {
            lt: cutoffDate, // less than (antes de la fecha límite)
          },
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });

      if (unverifiedUsers.length === 0) {
        logger.info('No hay usuarios no verificados para eliminar');
        return;
      }

      // Eliminar usuarios (los tokens se eliminan en cascada)
      const userIds = unverifiedUsers.map(u => u.id);
      const deleteResult = await prisma.user.deleteMany({
        where: {
          id: {
            in: userIds,
          },
        },
      });

      logger.info({
        deletedCount: deleteResult.count,
        users: unverifiedUsers.map(u => ({ email: u.email, createdAt: u.createdAt })),
      }, `Limpieza automática: ${deleteResult.count} usuario(s) no verificado(s) eliminado(s)`);
    } catch (error) {
      logger.error({ error }, 'Error en limpieza automática de usuarios no verificados');
    }
  }

  /**
   * Elimina tokens de verificación expirados
   */
  static async cleanupExpiredTokens(): Promise<void> {
    try {
      const now = new Date();

      const deleteResult = await prisma.verificationToken.deleteMany({
        where: {
          expiresAt: {
            lt: now,
          },
        },
      });

      if (deleteResult.count > 0) {
        logger.info({ deletedCount: deleteResult.count }, `Limpieza automática: ${deleteResult.count} token(s) expirado(s) eliminado(s)`);
      }
    } catch (error) {
      logger.error({ error }, 'Error en limpieza automática de tokens expirados');
    }
  }

  /**
   * Ejecuta todas las tareas de limpieza
   */
  static async runCleanup(): Promise<void> {
    logger.info('Ejecutando limpieza automática...');
    await this.cleanupUnverifiedUsers();
    await this.cleanupExpiredTokens();
    logger.info('Limpieza automática completada');
  }

  /**
   * Inicia el proceso de limpieza automática periódica
   */
  static startScheduledCleanup(): void {
    // Ejecutar inmediatamente al iniciar
    this.runCleanup();

    // Programar ejecución periódica cada hora
    setInterval(() => {
      this.runCleanup();
    }, this.CLEANUP_INTERVAL);

    logger.info({
      interval: `${this.CLEANUP_INTERVAL / 1000 / 60} minutos`,
      verificationTimeout: `${this.VERIFICATION_TIMEOUT / 1000 / 60 / 60} horas`,
    }, 'Servicio de limpieza automática iniciado');
  }
}
