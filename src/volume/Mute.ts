import { Engine } from "src/engine";
import ChainNode from "src/ChainNode";
import { Parameter, DecibelParameter } from "src/parameters";
import { ToggleParameter } from "../parameters";

export function muteFactory(engine) {
  return function (muted: boolean) {
    return new Mute(engine, muted);
  };
}

export class Mute extends ChainNode {
  readonly node: GainNode;

  constructor(engine: Engine, muted: boolean) {
    super(engine);
    this.node = engine.audioContext.createGain();
    this.setMuted(muted);
  }

  isMuted(): boolean {
    return this.node.gain.value === 0;
  }

  setMuted(muted: boolean): void {
    this.node.gain.value = muted ? 0 : 1;
  }

  get params(): Parameter[] {
    return [new ToggleParameter("Muted", this.isMuted, this.setMuted)];
  }
}
