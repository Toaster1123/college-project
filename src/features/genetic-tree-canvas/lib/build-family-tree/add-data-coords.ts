import { TableTypes } from "@/features/";
import { membersValues } from "@/shared";
import { IAddDataCoord } from "../../types";

export const addDataCoords = (
  data: TableTypes[],
  width: number,
  height: number
): IAddDataCoord[] => {
  const grouped: Record<number, TableTypes[]> = {};

  data.forEach((item) => {
    const member = membersValues.find(
      (member) => member.name === item.relation
    );
    const level = member?.level ?? 0;
    if (!grouped[level]) grouped[level] = [];
    grouped[level].push(item);
  });

  const result: IAddDataCoord[] = [];

  const levels = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => a - b);

  levels.forEach((level) => {
    const items = grouped[level];
    const spacingX = width / (items.length + 1);
    const y = (level / (levels.length + 1)) * height;

    items.forEach((item, index) => {
      const x = spacingX * (index + 1);
      result.push({ ...item, x, y });
    });
  });

  return result;
};
