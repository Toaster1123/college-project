import { IAddDataCoord } from "../../types";

export const drawTreeLines = (
  ctx: CanvasRenderingContext2D,
  nodes: IAddDataCoord[]
) => {
  console.log(nodes);

  ctx.strokeStyle = "#555";

  const sameParentChildArray = [ ]

  nodes.forEach(member => {
      if (member.parents.length === 0) return;

  sameParentChildArray.filter((item) => )

  })

  nodes.forEach((member) => {
    if (member.parents.length === 0) return;

    const childCoord = { x: member.x, y: member.y };
    const parents = nodes.filter((parent) =>
      member.parents.includes(parent.id)
    );

    parents.forEach((parent) => {
      if (
        parent.id === "42bcf569-5add-4375-92b7-0170b3cc1687" ||
        parent.id === "17f1054a-1a73-486c-b8a7-ea6f90be1c2c" ||
        parent.id === "086b8bc5-7bd4-4ef0-a6c8-071c71a66c09"
      ) {
        ctx.beginPath();

        ctx.moveTo(400, 150);
        ctx.lineTo(800, 150);

        ctx.moveTo(600, 150);
        ctx.lineTo(600, 225);

        ctx.moveTo(400, 300);
        ctx.lineTo(400, 225);
        ctx.lineTo(800, 225);
        ctx.lineTo(800, 300);

        ctx.stroke();
        return;
      }
      ctx.beginPath();

      ctx.moveTo(childCoord.x, childCoord.y);
      ctx.lineTo(parent.x, childCoord.y);
      ctx.lineTo(parent.x, parent.y);

      ctx.stroke();
    });
  });
};
