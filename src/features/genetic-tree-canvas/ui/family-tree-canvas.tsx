"use client";
import { FC } from "react";
import { useFamilyTreeCanvas } from "../hooks";

export const FamilyTreeCanvas: FC = () => {
  const { canvasRef, zoomIn, zoomOut } = useFamilyTreeCanvas();

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-md overflow-hidden p-2">
      <div className="flex gap-2 mb-2">
        <button onClick={zoomIn} className="px-2 py-1 border rounded">
          +
        </button>
        <button onClick={zoomOut} className="px-2 py-1 border rounded">
          -
        </button>
      </div>
      <canvas ref={canvasRef} width={1000} height={600} className="block" />
    </div>
  );
};
