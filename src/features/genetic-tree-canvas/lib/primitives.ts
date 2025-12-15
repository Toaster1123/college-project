const SIZE = 32;

export const drawCircle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string
) => {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, SIZE, 0, Math.PI * 2);
  ctx.fill();
};

export const drawSquare = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string
) => {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.rect(x - SIZE, y - SIZE, SIZE * 2, SIZE * 2);
  ctx.fill();
};

export const drawCross = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
) => {
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(x - SIZE, y - SIZE);
  ctx.lineTo(x + SIZE, y + SIZE);
  ctx.moveTo(x + SIZE, y - SIZE);
  ctx.lineTo(x - SIZE, y + SIZE);
  ctx.stroke();
};
