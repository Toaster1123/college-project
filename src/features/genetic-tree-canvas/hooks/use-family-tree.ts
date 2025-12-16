import { useEffect, useRef, useState } from "react";
import {
  addDataCoords,
  createWheelZoomHandler,
  zoomInCanvas,
  zoomOutCanvas,
} from "../lib";
import { drawTreeShapes } from "../lib/build-family-tree/draw-tree-shapes";
import { TableTypes } from "@/features";
import { drawTreeLines } from "../lib/build-family-tree/draw-tree-lines";

const data: TableTypes[] = [
  {
    relation: "Отец",
    disease: "",
    isAlive: true,
    isPregnant: false,
    isConsanguineous: false,
    gender: "муж",
    parents: [
      "e45d3d8b-17c9-4877-8bb6-7d367eb93a43",
      "8ca6e6a0-971e-4c78-bb43-9c47cd834779",
    ],
    id: "086b8bc5-7bd4-4ef0-a6c8-071c71a66c09",
  },
  {
    relation: "Мать",
    disease: "",
    isAlive: true,
    isPregnant: false,
    isConsanguineous: false,
    gender: "жен",
    parents: [
      "ed933cba-c35d-48e6-bd66-016c633a5696",
      "45c6ade9-79b2-46e4-a0b2-30059bc6eda2",
    ],
    id: "42bcf569-5add-4375-92b7-0170b3cc1687",
  },
  {
    relation: "Сын",
    disease: "",
    isAlive: true,
    isPregnant: false,
    isConsanguineous: false,
    gender: "муж",
    parents: [
      "086b8bc5-7bd4-4ef0-a6c8-071c71a66c09",
      "42bcf569-5add-4375-92b7-0170b3cc1687",
    ],
    id: "17f1054a-1a73-486c-b8a7-ea6f90be1c2c",
  },
  {
    relation: "Сын",
    disease: "",
    isAlive: true,
    isPregnant: false,
    isConsanguineous: false,
    gender: "муж",
    parents: [
      "086b8bc5-7bd4-4ef0-a6c8-071c71a66c09",
      "42bcf569-5add-4375-92b7-0170b3cc1687",
    ],
    id: "17f1054a-1a73-486c-b8a7-0170b3cc1682",
  },
  {
    relation: "Дедушка (по отцу)",
    disease: "",
    isAlive: true,
    isPregnant: false,
    isConsanguineous: false,
    gender: "муж",
    parents: [],
    id: "e45d3d8b-17c9-4877-8bb6-7d367eb93a43",
  },
  {
    relation: "Бабушка (по отцу)",
    disease: "",
    isAlive: true,
    isPregnant: false,
    isConsanguineous: false,
    gender: "жен",
    parents: [],
    id: "8ca6e6a0-971e-4c78-bb43-9c47cd834779",
  },
  {
    relation: "Дедушка (по матери)",
    disease: "",
    isAlive: false,
    isPregnant: false,
    isConsanguineous: false,
    gender: "муж",
    parents: [],
    id: "ed933cba-c35d-48e6-bd66-016c633a5696",
  },
  {
    relation: "Бабушка (по матери)",
    disease: "",
    isAlive: true,
    isPregnant: false,
    isConsanguineous: false,
    gender: "жен",
    parents: [],
    id: "45c6ade9-79b2-46e4-a0b2-30059bc6eda2",
  },
];

const render = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const renderNodes = addDataCoords(data, canvas.width, canvas.height);

  console.log(renderNodes);
  drawTreeLines(ctx, renderNodes);
  drawTreeShapes(ctx, renderNodes);
};

export const useFamilyTreeCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const zoomRef = useRef(100);
  const [zoomValue, setZoomValue] = useState(100);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    render(ctx, canvas);

    const wheelHandler = createWheelZoomHandler({
      ctx,
      canvas,
      zoomRef,
      setZoomValue,
      render,
    });

    canvas.addEventListener("wheel", wheelHandler);

    return () => {
      canvas.removeEventListener("wheel", wheelHandler);
    };
  }, []);

  const zoomIn = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    zoomInCanvas({
      ctx,
      canvas,
      zoomRef,
      setZoomValue,
      render,
    });
  };

  const zoomOut = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    zoomOutCanvas({
      ctx,
      canvas,
      zoomRef,
      setZoomValue,
      render,
    });
  };

  return {
    canvasRef,
    zoomIn,
    zoomOut,
    zoomValue,
  };
};
