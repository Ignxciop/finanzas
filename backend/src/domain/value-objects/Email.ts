export class Email {
  private readonly value: string;

  constructor(email: string) {
    this.value = email.toLowerCase().trim();
    this.validate();
  }

  private validate(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!this.value) {
      throw new Error('El correo electrónico es requerido');
    }

    if (!emailRegex.test(this.value)) {
      throw new Error('El formato del correo electrónico no es válido');
    }

    if (this.value.length > 255) {
      throw new Error('El correo electrónico es demasiado largo');
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
