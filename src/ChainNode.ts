import { Parameter } from "src/parameters/index";

export default abstract class ChainNode {
  readonly node: AudioNode;

  protected constructor(engine) {
    engine.register(this);
  }

  public connect(chainNode: ChainNode) {
    this.node.connect(chainNode.node);
  }

  abstract get params(): Map<String, Parameter>;
}
