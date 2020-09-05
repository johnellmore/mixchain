import ChainNode from "src/ChainNode";

export function pipe(...nodes: ChainNode[]) {
  if (nodes.length < 1) {
    throw new Error("Can only pipe() 1 or more nodes.");
  }
  let [lastNodeInChain, ...nodesToConnect] = nodes;

  nodesToConnect.forEach((nodeToConnect) => {
    lastNodeInChain.connect(nodeToConnect);
    lastNodeInChain = nodeToConnect;
  });
  return lastNodeInChain;
}
