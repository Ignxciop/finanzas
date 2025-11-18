import { IUserRepository } from '../../domain/repositories/IUserRepository.js';
import { User } from '../../domain/entities/User.js';
import { Email } from '../../domain/value-objects/Email.js';
import { Password } from '../../domain/value-objects/Password.js';
import { UserName } from '../../domain/value-objects/UserName.js';
import { RegisterUserDTO } from '../dto/RegisterUserDTO.js';
import { RegisterResponseDTO } from '../dto/RegisterResponseDTO.js';
import { HashService } from '../../infrastructure/security/hash.js';
import { ConflictError, ValidationError } from '../../infrastructure/errors/AppError.js';
import { emailService } from '../../infrastructure/services/EmailService.js';
import { TokenGenerator } from '../../infrastructure/security/TokenGenerator.js';
import prisma from '../../infrastructure/db/prismaClient.js';
import { logger } from '../../infrastructure/logger/logger.js';

export class RegisterUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(dto: RegisterUserDTO): Promise<RegisterResponseDTO> {
    // Validar datos de entrada
    this.validateInput(dto);

    // Crear value objects
    const email = new Email(dto.email);
    const password = new Password(dto.password);
    const name = new UserName(dto.name);

    // Verificar si el usuario ya existe
    const userExists = await this.userRepository.exists(email);
    if (userExists) {
      throw new ConflictError('El correo electrónico ya está registrado');
    }

    // Hash de la contraseña
    const hashedPassword = await HashService.hash(password.getValue());

    // Crear usuario
    const user = new User({
      name,
      email,
      password: new Password(hashedPassword),
    });

    // Guardar en la base de datos
    const savedUser = await this.userRepository.save(user);

    // Enviar email de verificación (no bloqueante)
    this.sendVerificationEmailAsync(savedUser.getEmail().getValue(), savedUser.getId()!);

    // Retornar respuesta sin token (requiere verificación de email primero)
    return {
      user: {
        id: savedUser.getId()!,
        name: savedUser.getName().getValue(),
        email: savedUser.getEmail().getValue(),
      },
      message: 'Registro exitoso. Por favor verifica tu correo electrónico para activar tu cuenta.',
    };
  }

  private validateInput(dto: RegisterUserDTO): void {
    if (!dto.name || !dto.email || !dto.password) {
      throw new ValidationError('Todos los campos son requeridos');
    }
  }

  private async sendVerificationEmailAsync(email: string, userId: string): Promise<void> {
    try {
      // Generar token
      const token = TokenGenerator.generate(32);
      const expiresAt = TokenGenerator.createExpirationDate(24); // 24 horas

      // Guardar token en BD
      await prisma.verificationToken.create({
        data: {
          token,
          type: 'EMAIL_VERIFICATION',
          userId,
          expiresAt,
        },
      });

      // Enviar email
      await emailService.sendVerificationEmail(email, token);
      logger.info(`Email de verificación enviado automáticamente a: ${email}`);
    } catch (error) {
      // No fallar el registro si falla el email
      logger.error(`Error al enviar email de verificación durante registro: ${error}`);
    }
  }
}
