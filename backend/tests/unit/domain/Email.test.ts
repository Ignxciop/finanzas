import { Email } from '../../../src/domain/value-objects/Email';

describe('Email Value Object', () => {
  describe('Valid emails', () => {
    it('should create a valid email', () => {
      const email = new Email('test@example.com');
      expect(email.getValue()).toBe('test@example.com');
    });

    it('should convert email to lowercase', () => {
      const email = new Email('TEST@EXAMPLE.COM');
      expect(email.getValue()).toBe('test@example.com');
    });

    it('should trim whitespace', () => {
      const email = new Email('  test@example.com  ');
      expect(email.getValue()).toBe('test@example.com');
    });
  });

  describe('Invalid emails', () => {
    it('should throw error for empty email', () => {
      expect(() => new Email('')).toThrow('El correo electrónico es requerido');
    });

    it('should throw error for invalid format', () => {
      expect(() => new Email('invalid-email')).toThrow('El formato del correo electrónico no es válido');
    });

    it('should throw error for email without @', () => {
      expect(() => new Email('testexample.com')).toThrow('El formato del correo electrónico no es válido');
    });

    it('should throw error for email without domain', () => {
      expect(() => new Email('test@')).toThrow('El formato del correo electrónico no es válido');
    });

    it('should throw error for too long email', () => {
      const longEmail = 'a'.repeat(250) + '@example.com';
      expect(() => new Email(longEmail)).toThrow('El correo electrónico es demasiado largo');
    });
  });

  describe('Equality', () => {
    it('should be equal for same email', () => {
      const email1 = new Email('test@example.com');
      const email2 = new Email('test@example.com');
      expect(email1.equals(email2)).toBe(true);
    });

    it('should be equal regardless of case', () => {
      const email1 = new Email('TEST@example.com');
      const email2 = new Email('test@EXAMPLE.COM');
      expect(email1.equals(email2)).toBe(true);
    });

    it('should not be equal for different emails', () => {
      const email1 = new Email('test1@example.com');
      const email2 = new Email('test2@example.com');
      expect(email1.equals(email2)).toBe(false);
    });
  });
});
