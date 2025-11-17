import { UserName } from '../../../src/domain/value-objects/UserName';

describe('UserName Value Object', () => {
  describe('Valid names', () => {
    it('should create a valid name', () => {
      const name = new UserName('José Núñez');
      expect(name.getValue()).toBe('José Núñez');
    });

    it('should trim whitespace', () => {
      const name = new UserName('  José Núñez  ');
      expect(name.getValue()).toBe('José Núñez');
    });

    it('should accept names with accents', () => {
      const name = new UserName('María García');
      expect(name.getValue()).toBe('María García');
    });

    it('should accept names with hyphens', () => {
      const name = new UserName('María-José');
      expect(name.getValue()).toBe('María-José');
    });
  });

  describe('Invalid names', () => {
    it('should throw error for empty name', () => {
      expect(() => new UserName('')).toThrow('El nombre es requerido');
    });

    it('should throw error for name less than 3 characters', () => {
      expect(() => new UserName('Jo')).toThrow('El nombre debe tener al menos 3 caracteres');
    });

    it('should throw error for name more than 100 characters', () => {
      const longName = 'a'.repeat(101);
      expect(() => new UserName(longName)).toThrow('El nombre es demasiado largo');
    });

    it('should throw error for name with numbers', () => {
      expect(() => new UserName('José123')).toThrow('El nombre contiene caracteres no válidos');
    });

    it('should throw error for name with special characters', () => {
      expect(() => new UserName('José@García')).toThrow('El nombre contiene caracteres no válidos');
    });
  });

  describe('Equality', () => {
    it('should be equal for same name', () => {
      const name1 = new UserName('José Núñez');
      const name2 = new UserName('José Núñez');
      expect(name1.equals(name2)).toBe(true);
    });

    it('should not be equal for different names', () => {
      const name1 = new UserName('José Núñez');
      const name2 = new UserName('María García');
      expect(name1.equals(name2)).toBe(false);
    });
  });
});
