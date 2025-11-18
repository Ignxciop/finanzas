import { RegisterUserUseCase } from '../../../src/application/use-cases/RegisterUserUseCase';
import { IUserRepository } from '../../../src/domain/repositories/IUserRepository';
import { User } from '../../../src/domain/entities/User';
import { Email } from '../../../src/domain/value-objects/Email';
import { ConflictError, ValidationError } from '../../../src/infrastructure/errors/AppError';

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

  async delete(id: string): Promise<void> {
    this.users = this.users.filter(u => u.getId() !== id);
  }

  clear() {
    this.users = [];
  }
}

describe('RegisterUserUseCase', () => {
  let useCase: RegisterUserUseCase;
  let repository: MockUserRepository;

  beforeEach(() => {
    repository = new MockUserRepository();
    useCase = new RegisterUserUseCase(repository);
  });

  describe('Successful registration', () => {
    it('should register a new user', async () => {
      const dto = {
        name: 'José Núñez',
        email: 'jose@example.com',
        password: 'password123',
      };

      const result = await useCase.execute(dto);

      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('token');
      expect(result.user.name).toBe('José Núñez');
      expect(result.user.email).toBe('jose@example.com');
      expect(result.user).toHaveProperty('id');
    });

    it('should hash the password', async () => {
      const dto = {
        name: 'José Núñez',
        email: 'jose@example.com',
        password: 'password123',
      };

      await useCase.execute(dto);

      const savedUser = await repository.findByEmail(new Email('jose@example.com'));
      expect(savedUser?.getPassword().getValue()).not.toBe('password123');
    });
  });

  describe('Validation errors', () => {
    it('should throw error for missing fields', async () => {
      const dto = {
        name: '',
        email: '',
        password: '',
      };

      await expect(useCase.execute(dto)).rejects.toThrow('Todos los campos son requeridos');
    });

    it('should throw error for invalid email', async () => {
      const dto = {
        name: 'José Núñez',
        email: 'invalid-email',
        password: 'password123',
      };

      await expect(useCase.execute(dto)).rejects.toThrow('El formato del correo electrónico no es válido');
    });

    it('should throw error for short password', async () => {
      const dto = {
        name: 'José Núñez',
        email: 'jose@example.com',
        password: '12345',
      };

      await expect(useCase.execute(dto)).rejects.toThrow('La contraseña debe tener al menos 6 caracteres');
    });

    it('should throw error for short name', async () => {
      const dto = {
        name: 'Jo',
        email: 'jose@example.com',
        password: 'password123',
      };

      await expect(useCase.execute(dto)).rejects.toThrow('El nombre debe tener al menos 3 caracteres');
    });
  });

  describe('Duplicate user', () => {
    it('should throw error for existing email', async () => {
      const dto = {
        name: 'José Núñez',
        email: 'jose@example.com',
        password: 'password123',
      };

      await useCase.execute(dto);

      await expect(useCase.execute(dto)).rejects.toThrow('El correo electrónico ya está registrado');
    });
  });
});
