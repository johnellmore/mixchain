import { Engine } from "src/engine";
import { Frequency } from "src/units";
import ChainNode from "src/ChainNode";
import { Parameter, HertzParameter } from "src/parameters";

export function sineFactory(engine) {
  return function (freq: Frequency) {
    return new Sine(engine, freq);
  };
}

export class Sine extends ChainNode {
  readonly node: OscillatorNode;

  constructor(engine: Engine, freq: Frequency) {
    super(engine);
    this.node = engine.audioContext.createOscillator();
    this.node.type = "sine";
    this.node.frequency.value = freq.hertz();
    this.node.start();
  }

  get params(): Parameter[] {
    return [new HertzParameter("Frequency", this.node.frequency)];
  }
}
