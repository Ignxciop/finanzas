import { User as DomainUser } from '../../domain/entities/User.js';
import { Email } from '../../domain/value-objects/Email.js';
import { Password } from '../../domain/value-objects/Password.js';
import { UserName } from '../../domain/value-objects/UserName.js';
import { User as PrismaUser } from '@prisma/client';
import { UserResponseDTO } from '../../application/dto/UserResponseDTO.js';

export class UserMapper {
  static toDomain(prismaUser: PrismaUser): DomainUser {
    return new DomainUser({
      id: prismaUser.id,
      name: new UserName(prismaUser.name),
      email: new Email(prismaUser.email),
      password: new Password(prismaUser.password),
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
    });
  }

  static toPrisma(domainUser: DomainUser): Omit<PrismaUser, 'createdAt' | 'updatedAt'> {
    return {
      id: domainUser.getId() || '',
      name: domainUser.getName().getValue(),
      email: domainUser.getEmail().getValue(),
      password: domainUser.getPassword().getValue(),
    };
  }

  static toDTO(domainUser: DomainUser): UserResponseDTO {
    return {
      id: domainUser.getId() || '',
      name: domainUser.getName().getValue(),
      email: domainUser.getEmail().getValue(),
    };
  }
}

