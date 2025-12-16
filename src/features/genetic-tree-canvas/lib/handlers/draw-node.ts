import { TableTypes } from "@/features/genetic-tree-form";
import { NodeType } from "../../types";
import { nodeRenderers } from "../node-collection";
interface IAddDataCoord extends TableTypes {
  x: number;
  y: number;
}

export const drawNode = (
  ctx: CanvasRenderingContext2D,
  node: IAddDataCoord
) => {
  const getNode = (isAlive: boolean, gender: "муж" | "жен"): NodeType => {
    if (isAlive) {
      if (gender === "муж") return "male";
      else return "female";
    } else {
      if (gender === "муж") return "maleDead";
      else return "femaleDead";
    }
  };
  const render = nodeRenderers[getNode(node.isAlive, node.gender)];

  if (!render) {
    console.warn("Unknown node type:");
    return;
  }

  render(ctx, node.relation, node.x, node.y);
};
