import { Engine } from "src/engine";
import { sineFactory } from "src/sources/Sine";
import { gainFactory } from "src/volume/Gain";
import { mixFactory } from "src/volume/Mix";

export default class Toolkit {
  private engine: Engine;

  constructor(engine: Engine) {
    this.engine = engine;
  }

  get sine() {
    return sineFactory(this.engine);
  }

  get gain() {
    return gainFactory(this.engine);
  }

  get mix() {
    return mixFactory(this.engine);
  }
}
