import { DeleteUserUseCase } from '../../../src/application/use-cases/DeleteUserUseCase.js';
import { IUserRepository } from '../../../src/domain/repositories/IUserRepository.js';
import { User } from '../../../src/domain/entities/User.js';
import { Email } from '../../../src/domain/value-objects/Email.js';
import { Password } from '../../../src/domain/value-objects/Password.js';
import { UserName } from '../../../src/domain/value-objects/UserName.js';
import { NotFoundError } from '../../../src/infrastructure/errors/AppError.js';

describe('DeleteUserUseCase', () => {
  let useCase: DeleteUserUseCase;
  let mockUserRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      save: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
      exists: jest.fn(),
      delete: jest.fn(),
    } as jest.Mocked<IUserRepository>;

    useCase = new DeleteUserUseCase(mockUserRepository);
  });

  describe('execute', () => {
    it('should delete user when user exists', async () => {
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
      mockUserRepository.delete.mockResolvedValue(undefined);

      // Act
      await useCase.execute(userId);

      // Assert
      expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
      expect(mockUserRepository.delete).toHaveBeenCalledWith(userId);
    });

    it('should throw NotFoundError when user does not exist', async () => {
      // Arrange
      const userId = '123e4567-e89b-12d3-a456-426614174000';
      mockUserRepository.findById.mockResolvedValue(null);

      // Act & Assert
      await expect(useCase.execute(userId)).rejects.toThrow('Usuario no encontrado');
      expect(mockUserRepository.delete).not.toHaveBeenCalled();
    });

    it('should call delete only once', async () => {
      // Arrange
      const userId = 'abc123';
      const mockUser = new User({
        id: userId,
        name: new UserName('John Doe'),
        email: new Email('john@example.com'),
        password: new Password('hashedPassword'),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      mockUserRepository.findById.mockResolvedValue(mockUser);
      mockUserRepository.delete.mockResolvedValue(undefined);

      // Act
      await useCase.execute(userId);

      // Assert
      expect(mockUserRepository.delete).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.delete).toHaveBeenCalledWith(userId);
    });

    it('should handle repository delete errors', async () => {
      // Arrange
      const userId = '123e4567-e89b-12d3-a456-426614174000';
      const mockUser = new User({
        id: userId,
        name: new UserName('Test User'),
        email: new Email('test@example.com'),
        password: new Password('hashedPassword'),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const deleteError = new Error('Database deletion failed');
      mockUserRepository.findById.mockResolvedValue(mockUser);
      mockUserRepository.delete.mockRejectedValue(deleteError);

      // Act & Assert
      await expect(useCase.execute(userId)).rejects.toThrow('Database deletion failed');
    });

    it('should validate user exists before deletion', async () => {
      // Arrange
      const userId = 'nonexistent-id';
      mockUserRepository.findById.mockResolvedValue(null);

      // Act & Assert
      await expect(useCase.execute(userId)).rejects.toThrow('Usuario no encontrado');
      expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
      expect(mockUserRepository.delete).not.toHaveBeenCalled();
    });
  });
});
