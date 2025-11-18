import crypto from 'crypto';

export class TokenGenerator {
  /**
   * Genera un token aleatorio seguro
   * @param length - Longitud del token en bytes (default: 32)
   * @returns Token hexadecimal
   */
  static generate(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex');
  }

  /**
   * Crea una fecha de expiración
   * @param hours - Horas hasta la expiración
   * @returns Fecha de expiración
   */
  static createExpirationDate(hours: number): Date {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + hours);
    return expiresAt;
  }
}
