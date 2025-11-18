import { Email } from '../../domain/value-objects/Email.js';
import { UserRepository } from '../../infrastructure/db/repositories/UserRepository.js';
import { emailService } from '../../infrastructure/services/EmailService.js';
import { TokenGenerator } from '../../infrastructure/security/TokenGenerator.js';
import prisma from '../../infrastructure/db/prismaClient.js';
import { NotFoundError, ValidationError } from '../../infrastructure/errors/AppError.js';

export class SendVerificationEmailUseCase {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute(email: string): Promise<void> {
    // Validar email
    const emailVO = new Email(email);

    // Buscar usuario
    const user = await this.userRepository.findByEmail(emailVO);
    if (!user) {
      throw new NotFoundError('Usuario no encontrado');
    }

    // Verificar si ya está verificado
    if (user.getId()) {
      const userRecord = await prisma.user.findUnique({
        where: { id: user.getId()! },
        select: { emailVerified: true },
      });

      if (userRecord?.emailVerified) {
        throw new ValidationError('El email ya está verificado');
      }
    }

    // Generar token
    const token = TokenGenerator.generate(32);
    const expiresAt = TokenGenerator.createExpirationDate(24); // 24 horas

    // Guardar token en BD
    await prisma.verificationToken.create({
      data: {
        token,
        type: 'EMAIL_VERIFICATION',
        userId: user.getId()!,
        expiresAt,
      },
    });

    // Enviar email
    await emailService.sendVerificationEmail(email, token);
  }
}
