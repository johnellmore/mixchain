import { Engine } from "src/engine";
import { SPL } from "src/units/index";
import ChainNode from "src/ChainNode";
import { Parameter, DecibelParameter } from "src/parameters/index";

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

  get params(): Map<String, Parameter> {
    const list: Parameter[] = [new DecibelParameter("Gain", this.node.gain)];
    return new Map(list.map((param) => [param.label, param]));
  }
}
