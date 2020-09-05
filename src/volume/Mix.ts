import { Engine } from "src/engine";
import ChainNode from "src/ChainNode";
import { Parameter } from "src/Parameter";

export function mixFactory(engine) {
  return function (...sources: ChainNode[]) {
    return new Mix(engine, ...sources);
  };
}

export class Mix extends ChainNode {
  readonly node: GainNode;

  constructor(engine: Engine, ...sources: ChainNode[]) {
    super(engine);
    this.node = engine.audioContext.createGain();
    sources.forEach((source) => {
      source.connect(this);
    });
  }

  get params(): Parameter[] {
    return [];
  }
}
