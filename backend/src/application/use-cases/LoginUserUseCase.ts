import { IUserRepository } from '../../domain/repositories/IUserRepository.js';
import { Email } from '../../domain/value-objects/Email.js';
import { Password } from '../../domain/value-objects/Password.js';
import { LoginDTO } from '../dto/LoginDTO.js';
import { AuthResponseDTO } from '../dto/AuthResponseDTO.js';
import { HashService } from '../../infrastructure/security/hash.js';
import { JwtService } from '../../infrastructure/security/jwt.js';
import { UnauthorizedError, ValidationError } from '../../infrastructure/errors/AppError.js';

export class LoginUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(dto: LoginDTO): Promise<AuthResponseDTO> {
    // Validar datos de entrada
    this.validateInput(dto);

    // Crear value objects
    const email = new Email(dto.email);
    const password = new Password(dto.password);

    // Buscar usuario por email
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedError('Credenciales inválidas');
    }

    // Verificar contraseña
    const isPasswordValid = await HashService.compare(
      password.getValue(),
      user.getPassword().getValue()
    );

    if (!isPasswordValid) {
      throw new UnauthorizedError('Credenciales inválidas');
    }

    // Generar token JWT
    const token = JwtService.sign({
      userId: user.getId()!,
      email: user.getEmail().getValue(),
    });

    // Retornar respuesta
    return {
      user: {
        id: user.getId()!,
        name: user.getName().getValue(),
        email: user.getEmail().getValue(),
      },
      token,
    };
  }

  private validateInput(dto: LoginDTO): void {
    if (!dto.email || !dto.password) {
      throw new ValidationError('Email y contraseña son requeridos');
    }
  }
}
