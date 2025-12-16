"use client";
import { FC } from "react";
import { useFamilyTreeCanvas } from "../hooks";

export const FamilyTreeCanvas: FC = () => {
  const { canvasRef, zoomIn, zoomOut, zoomValue } = useFamilyTreeCanvas();

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-md overflow-hidden p-2">
      <div className="flex justify-end gap-2 items-center mb-2">
        <button onClick={zoomOut} className="px-2 py-1 border rounded">
          -
        </button>
        <div className="w-10 gap-1 text-neutral-600 flex justify-center">
          <span>{zoomValue}</span>
          <span>%</span>
        </div>
        <button onClick={zoomIn} className="px-2 py-1 border rounded">
          +
        </button>
      </div>
      <div className="flex w-full justify-center">
        <canvas ref={canvasRef} width={1200} height={600} className="block" />
      </div>
    </div>
  );
};
