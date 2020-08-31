export default abstract class ChainNode {
    readonly node: AudioNode;

    public pipe(...nodes: ChainNode[]) {
        let prevNode: ChainNode = this;
        nodes.forEach(chainNode => {
            prevNode.connect(chainNode);
            prevNode = chainNode;
        });
        return prevNode;
    }

    public connect(chainNode: ChainNode) {
        this.node.connect(chainNode.node);
    }
}
