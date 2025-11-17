import { Email } from '../value-objects/Email.js';
import { Password } from '../value-objects/Password.js';
import { UserName } from '../value-objects/UserName.js';

export interface UserProps {
  id?: string;
  name: UserName;
  email: Email;
  password: Password;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User {
  private readonly id?: string;
  private name: UserName;
  private email: Email;
  private password: Password;
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(props: UserProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  getId(): string | undefined {
    return this.id;
  }

  getName(): UserName {
    return this.name;
  }

  getEmail(): Email {
    return this.email;
  }

  getPassword(): Password {
    return this.password;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  updateName(name: UserName): void {
    this.name = name;
    this.updatedAt = new Date();
  }

  updatePassword(password: Password): void {
    this.password = password;
    this.updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name.getValue(),
      email: this.email.getValue(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
