import { Engine } from "src/engine";
import ChainNode from "src/ChainNode";
import { SPL } from "src/units/spl";
import { TimeInterval } from "src/units/time";
import { Parameter } from "src/parameters/index";

export function noiseGateFactory(engine) {
  return function (
    threshold: SPL,
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
    threshold: SPL,
    attack: TimeInterval,
    hold: TimeInterval,
    release: TimeInterval
  ) {
    super(engine);
    this.node = engine.audioContext.createGain();
    // TODO implement noise gate
  }

  get params(): Map<String, Parameter> {
    return new Map();
  }
}
