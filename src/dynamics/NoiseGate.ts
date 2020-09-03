import { Engine } from "src/engine";
import ChainNode from "src/ChainNode";
import { Decibel } from "src/units/spl";
import { TimeInterval } from "src/units/time";

export function noiseGateFactory(engine) {
  return function (
    threshold: Decibel,
    attack: TimeInterval,
    hold: TimeInterval,
    release: TimeInterval
  ) {
    return new NoiseGate(engine, threshold, attack, hold, release);
  };
}

export class NoiseGate extends ChainNode {
  readonly node: GainNode;

  constructor(
    engine: Engine,
    threshold: Decibel,
    attack: TimeInterval,
    hold: TimeInterval,
    release: TimeInterval
  ) {
    super();
    this.node = engine.audioContext.createGain();
    // TODO implement noise gate
  }
}
