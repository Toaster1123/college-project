import { FamilyNode } from "../types";
import { nodeRenderers } from "./node-collection";

export const drawNode = (ctx: CanvasRenderingContext2D, node: FamilyNode) => {
  const render = nodeRenderers[node.type];

  if (!render) {
    console.warn("Unknown node type:", node.type);
    return;
  }

  render(ctx, node.x, node.y);
};
