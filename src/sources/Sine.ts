import { Engine } from "src/engine";
import { Frequency } from "src/units";
import ChainNode from "src/ChainNode";

export function sineFactory(engine) {
  return function (freq: Frequency) {
    return new Sine(engine, freq);
  };
}

export class Sine extends ChainNode {
  readonly node: OscillatorNode;

  constructor(engine: Engine, freq: Frequency) {
    super();
    this.node = engine.audioContext.createOscillator();
    this.node.type = "sine";
    this.node.frequency.value = freq.hertz();
  }
}