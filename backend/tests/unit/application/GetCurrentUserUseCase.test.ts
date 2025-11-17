import { GetCurrentUserUseCase } from '../../../src/application/use-cases/GetCurrentUserUseCase.js';
import { IUserRepository } from '../../../src/domain/repositories/IUserRepository.js';
import { User } from '../../../src/domain/entities/User.js';
import { Email } from '../../../src/domain/value-objects/Email.js';
import { Password } from '../../../src/domain/value-objects/Password.js';
import { UserName } from '../../../src/domain/value-objects/UserName.js';
import { NotFoundError } from '../../../src/infrastructure/errors/AppError.js';

describe('GetCurrentUserUseCase', () => {
  let useCase: GetCurrentUserUseCase;
  let mockUserRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      save: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
      exists: jest.fn(),
    } as jest.Mocked<IUserRepository>;

    useCase = new GetCurrentUserUseCase(mockUserRepository);
  });

  describe('execute', () => {
    it('should return user data when user exists', async () => {
      // Arrange
      const userId = '123e4567-e89b-12d3-a456-426614174000';
      const mockUser = new User({
        id: userId,
        name: new UserName('Test User'),
        email: new Email('test@example.com'),
        password: new Password('hashedPassword123'),
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      });

      mockUserRepository.findById.mockResolvedValue(mockUser);

      // Act
      const result = await useCase.execute(userId);

      // Assert
      expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
      expect(result).toEqual({
        id: userId,
        name: 'Test User',
        email: 'test@example.com',
      });
    });

    it('should throw NotFoundError when user does not exist', async () => {
      // Arrange
      const userId = '123e4567-e89b-12d3-a456-426614174000';
      mockUserRepository.findById.mockResolvedValue(null);

      // Act & Assert
      await expect(useCase.execute(userId)).rejects.toThrow('Usuario no encontrado');
    });

    it('should call repository with correct userId', async () => {
      // Arrange
      const userId = '999e4567-e89b-12d3-a456-426614174999';
      const mockUser = new User({
        id: userId,
        name: new UserName('Another User'),
        email: new Email('another@example.com'),
        password: new Password('hashedPassword456'),
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-01'),
      });

      mockUserRepository.findById.mockResolvedValue(mockUser);

      // Act
      await useCase.execute(userId);

      // Assert
      expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
    });

    it('should handle repository errors', async () => {
      // Arrange
      const userId = '123e4567-e89b-12d3-a456-426614174000';
      const repositoryError = new Error('Database connection failed');
      mockUserRepository.findById.mockRejectedValue(repositoryError);

      // Act & Assert
      await expect(useCase.execute(userId)).rejects.toThrow('Database connection failed');
    });

    it('should return correct user properties', async () => {
      // Arrange
      const userId = 'abc123';
      const userName = 'John Doe';
      const userEmail = 'john@example.com';
      
      const mockUser = new User({
        id: userId,
        name: new UserName(userName),
        email: new Email(userEmail),
        password: new Password('hashedPassword'),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      mockUserRepository.findById.mockResolvedValue(mockUser);

      // Act
      const result = await useCase.execute(userId);

      // Assert
      expect(result.id).toBe(userId);
      expect(result.name).toBe(userName);
      expect(result.email).toBe(userEmail);
      expect(result).not.toHaveProperty('password');
    });
  });
});
