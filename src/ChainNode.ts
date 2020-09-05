import { Parameter } from "src/Parameter";

export default abstract class ChainNode {
  readonly node: AudioNode;

  protected constructor(engine) {
    engine.register(this);
  }

  public connect(chainNode: ChainNode) {
    this.node.connect(chainNode.node);
  }

  abstract get params(): Parameter[];
}
