// node-renderers.ts
import { NodeType } from "../types";
import { drawCircle, drawSquare, drawCross } from "./primitives";

export type NodeRenderer = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
) => void;

export const nodeRenderers: Record<NodeType, NodeRenderer> = {
  female: (ctx, x, y) => {
    drawCircle(ctx, x, y, "#ec4899");
  },

  femaleDead: (ctx, x, y) => {
    drawCircle(ctx, x, y, "#ec4899");
    drawCross(ctx, x, y);
  },

  male: (ctx, x, y) => {
    drawSquare(ctx, x, y, "#4f46e5");
  },

  maleDead: (ctx, x, y) => {
    drawSquare(ctx, x, y, "#4f46e5");
    drawCross(ctx, x, y);
  },
};
