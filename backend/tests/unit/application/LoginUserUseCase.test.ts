import { LoginUserUseCase } from '../../../src/application/use-cases/LoginUserUseCase';
import { IUserRepository } from '../../../src/domain/repositories/IUserRepository';
import { User } from '../../../src/domain/entities/User';
import { Email } from '../../../src/domain/value-objects/Email';
import { Password } from '../../../src/domain/value-objects/Password';
import { UserName } from '../../../src/domain/value-objects/UserName';
import { UnauthorizedError, ValidationError } from '../../../src/infrastructure/errors/AppError';
import { HashService } from '../../../src/infrastructure/security/hash';

// Mock del repositorio
class MockUserRepository implements IUserRepository {
  private users: User[] = [];

  async findByEmail(email: Email): Promise<User | null> {
    return this.users.find(u => u.getEmail().equals(email)) || null;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find(u => u.getId() === id) || null;
  }

  async save(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async exists(email: Email): Promise<boolean> {
    return this.users.some(u => u.getEmail().equals(email));
  }

  clear() {
    this.users = [];
  }

  // Helper para tests
  async addUser(user: User) {
    this.users.push(user);
  }
}

describe('LoginUserUseCase', () => {
  let useCase: LoginUserUseCase;
  let repository: MockUserRepository;

  beforeEach(async () => {
    repository = new MockUserRepository();
    useCase = new LoginUserUseCase(repository);

    // Crear un usuario de prueba con contraseña hasheada
    const hashedPassword = await HashService.hash('password123');
    const user = new User({
      id: '123',
      name: new UserName('José Núñez'),
      email: new Email('jose@example.com'),
      password: new Password(hashedPassword),
    });
    await repository.addUser(user);
  });

  describe('Successful login', () => {
    it('should login user with valid credentials', async () => {
      const dto = {
        email: 'jose@example.com',
        password: 'password123',
      };

      const result = await useCase.execute(dto);

      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('token');
      expect(result.user.email).toBe('jose@example.com');
      expect(result.user.name).toBe('José Núñez');
      expect(result.user.id).toBe('123');
    });

    it('should generate a valid JWT token', async () => {
      const dto = {
        email: 'jose@example.com',
        password: 'password123',
      };

      const result = await useCase.execute(dto);

      expect(result.token).toBeTruthy();
      expect(typeof result.token).toBe('string');
    });
  });

  describe('Validation errors', () => {
    it('should throw error for missing email', async () => {
      const dto = {
        email: '',
        password: 'password123',
      };

      await expect(useCase.execute(dto)).rejects.toThrow('Email y contraseña son requeridos');
    });

    it('should throw error for missing password', async () => {
      const dto = {
        email: 'jose@example.com',
        password: '',
      };

      await expect(useCase.execute(dto)).rejects.toThrow('Email y contraseña son requeridos');
    });

    it('should throw error for invalid email format', async () => {
      const dto = {
        email: 'invalid-email',
        password: 'password123',
      };

      await expect(useCase.execute(dto)).rejects.toThrow('El formato del correo electrónico no es válido');
    });
  });

  describe('Authentication errors', () => {
    it('should throw error for non-existent user', async () => {
      const dto = {
        email: 'noexiste@example.com',
        password: 'password123',
      };

      await expect(useCase.execute(dto)).rejects.toThrow('Credenciales inválidas');
    });

    it('should throw error for incorrect password', async () => {
      const dto = {
        email: 'jose@example.com',
        password: 'wrongpassword',
      };

      await expect(useCase.execute(dto)).rejects.toThrow('Credenciales inválidas');
    });

    it('should be case sensitive for email', async () => {
      const dto = {
        email: 'JOSE@EXAMPLE.COM',
        password: 'password123',
      };

      // El email se normaliza a lowercase en el Value Object
      const result = await useCase.execute(dto);
      expect(result.user.email).toBe('jose@example.com');
    });
  });
});
