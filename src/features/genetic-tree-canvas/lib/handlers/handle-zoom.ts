const MIN_ZOOM = 50;
const MAX_ZOOM = 150;

type ZoomParams = {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  zoomRef: React.MutableRefObject<number>;
  setZoomValue: (value: number) => void;
  render: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
};

const applyZoom = (
  scale: number,
  { ctx, canvas, zoomRef, setZoomValue, render }: ZoomParams
) => {
  const nextZoom = Math.round(zoomRef.current * scale);

  if (nextZoom < MIN_ZOOM || nextZoom > MAX_ZOOM) return;

  zoomRef.current = nextZoom;
  setZoomValue(nextZoom);

  ctx.scale(scale, scale);
  render(ctx, canvas);
};

export const createWheelZoomHandler = (params: ZoomParams) => {
  return (e: WheelEvent) => {
    e.preventDefault();
    const scale = e.deltaY < 0 ? 1.1 : 0.9;
    applyZoom(scale, params);
  };
};

export const zoomInCanvas = (params: ZoomParams) => {
  applyZoom(1.1, params);
};

export const zoomOutCanvas = (params: ZoomParams) => {
  applyZoom(0.9, params);
};
