import { Password } from '../../domain/value-objects/Password.js';
import { HashService } from '../../infrastructure/security/hash.js';
import prisma from '../../infrastructure/db/prismaClient.js';
import { NotFoundError, ValidationError } from '../../infrastructure/errors/AppError.js';

export class ResetPasswordUseCase {
  async execute(token: string, newPassword: string): Promise<void> {
    if (!token || !newPassword) {
      throw new ValidationError('Token y nueva contraseña son requeridos');
    }

    // Validar nueva contraseña
    const passwordVO = new Password(newPassword);

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
    if (verificationToken.type !== 'PASSWORD_RESET') {
      throw new ValidationError('Tipo de token inválido');
    }

    // Hashear nueva contraseña
    const hashedPassword = await HashService.hash(passwordVO.getValue());

    // Actualizar contraseña y marcar token como usado
    await prisma.$transaction([
      prisma.user.update({
        where: { id: verificationToken.userId },
        data: { password: hashedPassword },
      }),
      prisma.verificationToken.update({
        where: { id: verificationToken.id },
        data: { used: true },
      }),
    ]);
  }
}
