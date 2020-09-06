import {
  Decibel,
  Hertz,
  unityCoefficient,
  dB,
  Hz,
  SPL,
  Frequency,
} from "src/units/index";

export abstract class Parameter {
  readonly label: String;

  constructor(label: String) {
    this.label = label;
  }

  abstract get value(): any;
  abstract set value(newValue: any);
}

export class DecibelParameter extends Parameter {
  readonly param: AudioParam;

  constructor(label: String, param: AudioParam) {
    super(label);
    this.param = param;
  }

  get value(): SPL {
    return dB(unityCoefficient(this.param.value).decibels());
  }

  set value(newValue: SPL) {
    const newGain = newValue.unityCoefficient();
    this.param.value = newGain;
  }
}

export class HertzParameter extends Parameter {
  readonly param: AudioParam;

  constructor(label: String, param: AudioParam) {
    super(label);
    this.param = param;
  }

  get value(): Frequency {
    return Hz(this.param.value);
  }

  set value(newValue: Frequency) {
    this.param.value = newValue.hertz();
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
