import { IUserRepository } from '../../domain/repositories/IUserRepository.js';
import { User } from '../../domain/entities/User.js';
import { Email } from '../../domain/value-objects/Email.js';
import { Password } from '../../domain/value-objects/Password.js';
import { UserName } from '../../domain/value-objects/UserName.js';
import { RegisterUserDTO } from '../dto/RegisterUserDTO.js';
import { AuthResponseDTO } from '../dto/AuthResponseDTO.js';
import { HashService } from '../../infrastructure/security/hash.js';
import { JwtService } from '../../infrastructure/security/jwt.js';
import { ConflictError, ValidationError } from '../../infrastructure/errors/AppError.js';

export class RegisterUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(dto: RegisterUserDTO): Promise<AuthResponseDTO> {
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

    // Generar token JWT
    const token = JwtService.sign({
      userId: savedUser.getId()!,
      email: savedUser.getEmail().getValue(),
    });

    // Retornar respuesta
    return {
      user: {
        id: savedUser.getId()!,
        name: savedUser.getName().getValue(),
        email: savedUser.getEmail().getValue(),
      },
      token,
    };
  }

  private validateInput(dto: RegisterUserDTO): void {
    if (!dto.name || !dto.email || !dto.password) {
      throw new ValidationError('Todos los campos son requeridos');
    }
  }
}
