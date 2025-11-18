import { IUserRepository } from '../../domain/repositories/IUserRepository.js';
import { NotFoundError } from '../../infrastructure/errors/AppError.js';

export class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundError('Usuario no encontrado');
    }

    await this.userRepository.delete(userId);
  }
}
