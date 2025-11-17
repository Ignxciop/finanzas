export class UserName {
  private readonly value: string;

  constructor(name: string) {
    this.value = name.trim();
    this.validate();
  }

  private validate(): void {
    if (!this.value) {
      throw new Error('El nombre es requerido');
    }

    if (this.value.length < 3) {
      throw new Error('El nombre debe tener al menos 3 caracteres');
    }

    if (this.value.length > 100) {
      throw new Error('El nombre es demasiado largo');
    }

    // Validar que solo contenga letras, espacios y algunos caracteres especiales
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]+$/;
    if (!nameRegex.test(this.value)) {
      throw new Error('El nombre contiene caracteres no válidos');
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: UserName): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
