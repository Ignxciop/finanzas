import { IUserRepository } from '../../../domain/repositories/IUserRepository.js';
import { User } from '../../../domain/entities/User.js';
import { Email } from '../../../domain/value-objects/Email.js';
import prisma from '../prismaClient.js';
import { UserMapper } from '../../mappers/UserMapper.js';

export class UserRepository implements IUserRepository {
  async findByEmail(email: Email): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email: email.getValue() },
    });

    if (!user) return null;

    return UserMapper.toDomain(user);
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    return UserMapper.toDomain(user);
  }

  async save(user: User): Promise<User> {
    const userData = UserMapper.toPrisma(user);

    const savedUser = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      },
    });

    return UserMapper.toDomain(savedUser);
  }

  async exists(email: Email): Promise<boolean> {
    const count = await prisma.user.count({
      where: { email: email.getValue() },
    });

    return count > 0;
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
  }
}
