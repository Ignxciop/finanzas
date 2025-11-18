import { Email } from '../../domain/value-objects/Email.js';
import { UserRepository } from '../../infrastructure/db/repositories/UserRepository.js';
import { emailService } from '../../infrastructure/services/EmailService.js';
import { TokenGenerator } from '../../infrastructure/security/TokenGenerator.js';
import prisma from '../../infrastructure/db/prismaClient.js';
import { NotFoundError } from '../../infrastructure/errors/AppError.js';

export class RequestPasswordResetUseCase {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute(email: string): Promise<void> {
    // Validar email
    const emailVO = new Email(email);

    // Buscar usuario
    const user = await this.userRepository.findByEmail(emailVO);
    
    // Por seguridad, no revelamos si el email existe o no
    if (!user) {
      // Simplemente retornamos sin error para no dar pistas
      return;
    }

    // Generar token
    const token = TokenGenerator.generate(32);
    const expiresAt = TokenGenerator.createExpirationDate(1); // 1 hora

    // Guardar token en BD
    await prisma.verificationToken.create({
      data: {
        token,
        type: 'PASSWORD_RESET',
        userId: user.getId()!,
        expiresAt,
      },
    });

    // Enviar email
    await emailService.sendPasswordResetEmail(email, token);
  }
}
