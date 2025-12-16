import { NodeType } from "../types";
import { drawCircle, drawSquare, drawCross, drawText } from "./primitives";

export type NodeRenderer = (
  ctx: CanvasRenderingContext2D,
  name: string,
  x: number,
  y: number
) => void;

export const nodeRenderers: Record<NodeType, NodeRenderer> = {
  female: (ctx, name, x, y) => {
    drawCircle(ctx, x, y, "#ec4899");
    drawText(ctx, name, x, y);
  },

  femaleDead: (ctx, name, x, y) => {
    drawCircle(ctx, x, y, "#ec4899");
    drawCross(ctx, x, y);
    drawText(ctx, name, x, y);
  },

  male: (ctx, name, x, y) => {
    drawSquare(ctx, x, y, "#4f46e5");
    drawText(ctx, name, x, y);
  },

  maleDead: (ctx, name, x, y) => {
    drawSquare(ctx, x, y, "#4f46e5");
    drawCross(ctx, x, y);
    drawText(ctx, name, x, y);
  },
};
