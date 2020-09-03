export function Hz(value: number): Hertz {
  return new Hertz(value);
}

export interface Frequency {
  hertz(): number;
}

export class Hertz {
  constructor(readonly value: number) {}

  hertz(): number {
    return this.value;
  }
}
