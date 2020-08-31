export function dB(value: number): Decibel {
    return new Decibel(value);
}

export function Hz(value: number): Hertz {
    return new Hertz(value);
}

export class Decibel {
    constructor(readonly value: number) {}
}

export class Hertz {
    constructor(readonly value: number) {}
}
