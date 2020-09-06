import { Engine } from "src/engine";
import ChainNode from "src/ChainNode";
import { Parameter, DecibelParameter, ToggleParameter } from "src/parameters";

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
    this.muted = muted;
  }

  get muted(): boolean {
    return this.node.gain.value === 0;
  }

  set muted(muted: boolean) {
    this.node.gain.value = muted ? 0 : 1;
  }

  get params(): Map<String, Parameter> {
    const list: Parameter[] = [
      new ToggleParameter(
        "Muted",
        () => this.muted,
        (newMute) => (this.muted = newMute)
      ),
    ];
    return new Map(list.map((param) => [param.label, param]));
  }
}
