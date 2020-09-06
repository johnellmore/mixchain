import { Decibel, unityCoefficient, dB } from "src/units";

export abstract class Parameter {
  readonly label: String;

  constructor(label: String) {
    this.label = label;
  }
}

export class DecibelParameter extends Parameter {
  readonly param: AudioParam;

  constructor(label: String, param: AudioParam) {
    super(label);
    this.param = param;
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
  readonly param: AudioParam;

  constructor(label: String, param: AudioParam) {
    super(label);
    this.param = param;
  }

  get value(): number {
    return this.param.value;
  }

  set value(newValue: number) {
    this.param.value = newValue;
  }
}

type ToggleGetter = () => boolean;
type ToggleSetter = (toggle: boolean) => void;
export class ToggleParameter extends Parameter {
  readonly getter: ToggleGetter;
  readonly setter: ToggleSetter;

  constructor(label: String, getter: ToggleGetter, setter: ToggleSetter) {
    super(label);
    this.getter = getter;
    this.setter = setter;
  }

  get value(): boolean {
    return this.getter();
  }

  set value(newValue: boolean) {
    this.setter(newValue);
  }
}
