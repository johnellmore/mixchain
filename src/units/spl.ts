export function dB(value: number): Decibel {
  return new Decibel(value);
}

export function unityCoefficient(value: number): Decibel {
  return new UnityCoefficient(value);
}

export interface SPL {
  decibels(): number;
  unityCoefficient(): number;
}

export class Decibel implements SPL {
  constructor(readonly value: number) {}

  decibels(): number {
    return this.value;
  }

  unityCoefficient(): number {
    return Math.pow(10, this.value / 20);
  }
}

export class UnityCoefficient implements SPL {
  constructor(readonly value: number) {}

  decibels(): number {
    return 20 * Math.log10(this.value);
  }

  unityCoefficient(): number {
    return this.value;
  }
}
