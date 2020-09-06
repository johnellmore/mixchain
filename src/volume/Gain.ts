import { Engine } from "src/engine";
import { SPL } from "src/units";
import ChainNode from "src/ChainNode";
import { Parameter, DecibelParameter } from "src/parameters";

export function gainFactory(engine) {
  return function (spl: SPL) {
    return new Gain(engine, spl);
  };
}

export class Gain extends ChainNode {
  readonly node: GainNode;

  constructor(engine: Engine, spl: SPL) {
    super(engine);
    this.node = engine.audioContext.createGain();
    this.node.gain.value = spl.unityCoefficient();
  }

  get params(): Parameter[] {
    return [new DecibelParameter("Gain", this.node.gain)];
  }
}
