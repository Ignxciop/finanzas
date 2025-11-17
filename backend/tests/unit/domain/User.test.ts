import { User } from '../../../src/domain/entities/User';
import { Email } from '../../../src/domain/value-objects/Email';
import { Password } from '../../../src/domain/value-objects/Password';
import { UserName } from '../../../src/domain/value-objects/UserName';

describe('User Entity', () => {
  const validEmail = new Email('test@example.com');
  const validPassword = new Password('password123');
  const validName = new UserName('José Núñez');

  describe('Creation', () => {
    it('should create a user with valid data', () => {
      const user = new User({
        name: validName,
        email: validEmail,
        password: validPassword,
      });

      expect(user.getName().getValue()).toBe('José Núñez');
      expect(user.getEmail().getValue()).toBe('test@example.com');
      expect(user.getPassword().getValue()).toBe('password123');
      expect(user.getCreatedAt()).toBeInstanceOf(Date);
      expect(user.getUpdatedAt()).toBeInstanceOf(Date);
    });

    it('should create a user with id', () => {
      const user = new User({
        id: '123',
        name: validName,
        email: validEmail,
        password: validPassword,
      });

      expect(user.getId()).toBe('123');
    });
  });

  describe('Update methods', () => {
    it('should update name', () => {
      const user = new User({
        name: validName,
        email: validEmail,
        password: validPassword,
      });

      const newName = new UserName('María García');
      const oldUpdatedAt = user.getUpdatedAt();

      // Esperar un poco para que el timestamp sea diferente
      setTimeout(() => {
        user.updateName(newName);
        expect(user.getName().getValue()).toBe('María García');
        expect(user.getUpdatedAt().getTime()).toBeGreaterThanOrEqual(oldUpdatedAt.getTime());
      }, 10);
    });

    it('should update password', () => {
      const user = new User({
        name: validName,
        email: validEmail,
        password: validPassword,
      });

      const newPassword = new Password('newpassword123');
      user.updatePassword(newPassword);

      expect(user.getPassword().getValue()).toBe('newpassword123');
    });
  });

  describe('JSON conversion', () => {
    it('should convert to JSON without password', () => {
      const user = new User({
        id: '123',
        name: validName,
        email: validEmail,
        password: validPassword,
      });

      const json = user.toJSON();

      expect(json).toEqual({
        id: '123',
        name: 'José Núñez',
        email: 'test@example.com',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
      expect(json).not.toHaveProperty('password');
    });
  });
});
