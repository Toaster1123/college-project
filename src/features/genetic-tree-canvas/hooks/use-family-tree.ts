import { useEffect, useRef } from "react";
import { drawNode } from "../lib/draw-node";
import { FamilyNode } from "../types";
const nodes: FamilyNode[] = [
  { id: "1", type: "male", x: 200, y: 200 },
  { id: "2", type: "female", x: 350, y: 200 },
  { id: "3", type: "femaleDead", x: 275, y: 350 },
];
export const useFamilyTreeCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    nodes.forEach((node) => drawNode(ctx, node));
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach((node) => drawNode(ctx, node));
    };

    render();

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const scale = e.deltaY < 0 ? 1.1 : 0.9;

      ctx.scale(scale, scale);
      render();
    };

    canvas.addEventListener("wheel", handleWheel);

    return () => {
      canvas.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const zoomIn = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(1.1, 1.1);
    nodes.forEach((node) => drawNode(ctx, node));
  };

  const zoomOut = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(0.9, 0.9);
    nodes.forEach((node) => drawNode(ctx, node));
  };

  return { canvasRef, zoomIn, zoomOut };
};
