import { pipe } from "src/pipe";
import { Engine } from "src/engine";
import { sineFactory } from "src/sources/Sine";
import { gainFactory } from "src/volume/Gain";
import { noiseGateFactory } from "src/dynamics/NoiseGate";
import { mixFactory } from "src/volume/Mix";

export default class Toolkit {
  private engine: Engine;

  constructor(engine: Engine) {
    this.engine = engine;
  }

  get pipe() {
    return pipe;
  }

  get sine() {
    return sineFactory(this.engine);
  }

  get gain() {
    return gainFactory(this.engine);
  }

  get noiseGate() {
    return noiseGateFactory(this.engine);
  }

  get mix() {
    return mixFactory(this.engine);
  }
}
