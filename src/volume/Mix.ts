import { Engine } from "src/engine";
import ChainNode from "src/ChainNode";

export function mixFactory(engine) {
  return function (...sources: ChainNode[]) {
    return new Mix(engine, ...sources);
  };
}

export class Mix extends ChainNode {
  readonly node: GainNode;

  constructor(engine: Engine, ...sources: ChainNode[]) {
    super();
    this.node = engine.audioContext.createGain();
    sources.forEach((source) => {
      source.connect(this);
    });
  }
}
