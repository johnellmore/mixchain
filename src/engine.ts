import Toolkit from "src/Toolkit";
import ChainNode from "src/ChainNode";

interface setupCallback {
  (toolkit: Toolkit): ChainNode;
}

export default function engine(setup: setupCallback): Engine {
  // create the environment structure
  const engine = new Engine();
  const toolkit = new Toolkit(engine);

  // let the user fill in the environment
  const out = setup(toolkit);

  // hookup the final output
  out.node.connect(engine.audioContext.destination);

  return engine;
}

export class Engine {
  readonly audioContext: AudioContext;

  constructor() {
    this.audioContext = new AudioContext();
  }
}
