import { Decibel, unityCoefficient, dB } from "src/units";

export abstract class Parameter {
  readonly label: String;
  readonly param: AudioParam;

  constructor(label: String, param: AudioParam) {
    this.label = label;
    this.param = param;
  }
}

export class DecibelParameter extends Parameter {
  constructor(label: String, param: AudioParam) {
    super(label, param);
  }

  get value(): number {
    return unityCoefficient(this.param.value).decibels();
  }

  set value(newValue: number) {
    const newGain = dB(newValue).unityCoefficient();
    this.param.value = newGain;
  }
}

export class HertzParameter extends Parameter {
  constructor(label: String, param: AudioParam) {
    super(label, param);
  }

  get value(): number {
    return this.param.value;
  }

  set value(newValue: number) {
    this.param.value = newValue;
  }
}
