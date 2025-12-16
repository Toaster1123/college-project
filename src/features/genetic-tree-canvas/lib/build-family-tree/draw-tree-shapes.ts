import { TableTypes } from "@/features/genetic-tree-form";
import { drawNode } from "../handlers";

interface IAddDataCoord extends TableTypes {
  x: number;
  y: number;
}

export const drawTreeShapes = (
  ctx: CanvasRenderingContext2D,
  nodes: IAddDataCoord[]
) => {
  nodes.forEach((node) => {
    drawNode(ctx, node);
  });
};
