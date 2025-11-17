import { Password } from '../../../src/domain/value-objects/Password';

describe('Password Value Object', () => {
  describe('Valid passwords', () => {
    it('should create a valid password', () => {
      const password = new Password('password123');
      expect(password.getValue()).toBe('password123');
    });

    it('should accept password with exactly 6 characters', () => {
      const password = new Password('123456');
      expect(password.getValue()).toBe('123456');
    });
  });

  describe('Invalid passwords', () => {
    it('should throw error for empty password', () => {
      expect(() => new Password('')).toThrow('La contraseña es requerida');
    });

    it('should throw error for password less than 6 characters', () => {
      expect(() => new Password('12345')).toThrow('La contraseña debe tener al menos 6 caracteres');
    });

    it('should throw error for password more than 100 characters', () => {
      const longPassword = 'a'.repeat(101);
      expect(() => new Password(longPassword)).toThrow('La contraseña es demasiado larga');
    });
  });

  describe('Security', () => {
    it('should hide password in toString', () => {
      const password = new Password('secret123');
      expect(password.toString()).toBe('***HIDDEN***');
    });
  });
});
