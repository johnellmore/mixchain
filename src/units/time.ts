export function ms(value: number): TimeInterval {
  return new Seconds(value / 1000);
}

export interface TimeInterval {
  seconds(): number;
  ms(): number;
}

export class Seconds implements TimeInterval {
  constructor(readonly value: number) {}

  seconds(): number {
    return this.value;
  }

  ms(): number {
    return this.value * 1000;
  }
}
