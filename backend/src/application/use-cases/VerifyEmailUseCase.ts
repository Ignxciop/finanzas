import prisma from '../../infrastructure/db/prismaClient.js';
import { NotFoundError, ValidationError } from '../../infrastructure/errors/AppError.js';

export class VerifyEmailUseCase {
  async execute(token: string): Promise<void> {
    if (!token) {
      throw new ValidationError('Token es requerido');
    }

    // Buscar token
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!verificationToken) {
      throw new NotFoundError('Token inválido o expirado');
    }

    // Verificar si ya fue usado
    if (verificationToken.used) {
      throw new ValidationError('Este token ya fue utilizado');
    }

    // Verificar si expiró
    if (verificationToken.expiresAt < new Date()) {
      throw new ValidationError('El token ha expirado');
    }

    // Verificar que sea del tipo correcto
    if (verificationToken.type !== 'EMAIL_VERIFICATION') {
      throw new ValidationError('Tipo de token inválido');
    }

    // Marcar email como verificado y token como usado
    await prisma.$transaction([
      prisma.user.update({
        where: { id: verificationToken.userId },
        data: { emailVerified: true },
      }),
      prisma.verificationToken.update({
        where: { id: verificationToken.id },
        data: { used: true },
      }),
    ]);
  }
}
