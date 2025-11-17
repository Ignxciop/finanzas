import { IUserRepository } from '../../domain/repositories/IUserRepository.js';
import { UserResponseDTO } from '../dto/UserResponseDTO.js';
import { UserMapper } from '../../infrastructure/mappers/UserMapper.js';
import { NotFoundError } from '../../infrastructure/errors/AppError.js';

export class GetCurrentUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string): Promise<UserResponseDTO> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundError('Usuario no encontrado');
    }

    return UserMapper.toDTO(user);
  }
}
