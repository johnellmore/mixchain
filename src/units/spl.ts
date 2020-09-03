export function dB(value: number): Decibel {
  return new Decibel(value);
}

export function coefficient(value: number): Decibel {
  return new Coefficient(value);
}

export interface SPL {
  decibels(): number;
  coefficient(): number;
}

export class Decibel implements SPL {
  constructor(readonly value: number) {}

  decibels(): number {
    return this.value;
  }

  coefficient(): number {
    return Math.pow(10, this.value / 20);
  }
}

export class Coefficient implements SPL {
  constructor(readonly value: number) {}

  decibels(): number {
    return 20 * Math.log10(this.value);
  }

  coefficient(): number {
    return this.value;
  }
}
