export class Password {
  private readonly value: string;

  constructor(password: string) {
    this.value = password;
    this.validate();
  }

  private validate(): void {
    if (!this.value) {
      throw new Error('La contraseña es requerida');
    }

    if (this.value.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    if (this.value.length > 100) {
      throw new Error('La contraseña es demasiado larga');
    }
  }

  getValue(): string {
    return this.value;
  }

  toString(): string {
    return '***HIDDEN***';
  }
}
