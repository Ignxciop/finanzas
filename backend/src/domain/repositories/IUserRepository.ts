import { User } from '../entities/User.js';
import { Email } from '../value-objects/Email.js';

export interface IUserRepository {
  findByEmail(email: Email): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<User>;
  exists(email: Email): Promise<boolean>;
}
