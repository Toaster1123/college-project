import { TableTypes } from "../../genetic-tree-form/types";

interface Link {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface MemberWithCoords extends TableTypes {
  x: number;
  y: number;
}

interface BuildRelationsResult {
  nodes: MemberWithCoords[];
  links: Link[];
  maxX: number;
  maxY: number;
}

const HORIZONTAL_SPACING = 120;
const VERTICAL_SPACING = 150;
const START_X = 60;
const START_Y = 40;

export function buildRelations(members: TableTypes[]): BuildRelationsResult {
  const byId: Record<string, TableTypes> = {};
  members.forEach((m) => (byId[m.id] = m));

  // Найти центр дерева — человека с максимальным количеством потомков или центрального
  // Проще всего: найти человека, у которого есть дети (обычно это один из самых молодых с наибольшим потомством)
  const depths: Record<string, number> = {};

  const computeDepth = (id: string): number => {
    if (depths[id] !== undefined) return depths[id];

    const member = byId[id];
    const children = members.filter((m) => m.parents?.includes(id));

    if (children.length === 0) {
      depths[id] = 0;
    } else {
      depths[id] = 1 + Math.max(...children.map((c) => computeDepth(c.id)));
    }
    return depths[id];
  };

  members.forEach((m) => computeDepth(m.id));

  // BFS от центра для расположения
  // Найти человека "в центре" — того, у кого есть дети и родители
  let center = members.find(
    (m) =>
      m.parents &&
      m.parents.length > 0 &&
      members.some((x) => x.parents?.includes(m.id))
  );
  if (!center) {
    center = members[0];
  }

  const distances: Record<string, number> = {};
  const queue: string[] = [center.id];
  distances[center.id] = 0;

  while (queue.length > 0) {
    const id = queue.shift()!;
    const dist = distances[id];

    // Дети
    members
      .filter((m) => m.parents?.includes(id))
      .forEach((child) => {
        if (distances[child.id] === undefined) {
          distances[child.id] = dist - 1; // вверх (дети выше)
          queue.push(child.id);
        }
      });

    // Родители
    const member = byId[id];
    if (member.parents) {
      member.parents.forEach((parentId) => {
        if (distances[parentId] === undefined) {
          distances[parentId] = dist + 1; // вниз (родители ниже)
          queue.push(parentId);
        }
      });
    }
  }

  // Сгруппировать по расстояниям
  const byDistance: Record<number, TableTypes[]> = {};
  members.forEach((m) => {
    const dist = distances[m.id] ?? 0;
    if (!byDistance[dist]) byDistance[dist] = [];
    byDistance[dist].push(m);
  });

  // Расположить узлы
  const nodes: MemberWithCoords[] = [];
  let maxX = 0;
  let maxY = 0;

  Object.keys(byDistance)
    .map(Number)
    .sort((a, b) => a - b)
    .forEach((dist) => {
      const distMembers = byDistance[dist];
      distMembers.forEach((m, idx) => {
        const x = START_X + idx * HORIZONTAL_SPACING;
        const y = START_Y + dist * VERTICAL_SPACING;

        nodes.push({
          ...m,
          x,
          y,
        });

        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      });
    });

  // Строим линии
  const links: Link[] = [];
  const nodeMap: Record<string, { x: number; y: number }> = {};
  nodes.forEach((n) => {
    nodeMap[n.id] = { x: n.x, y: n.y };
  });

  // Группировка по парам родителей
  const parentPairs = new Map<string, string[]>();
  members.forEach((child) => {
    if (child.parents && child.parents.length > 0) {
      const sortedParents = [...child.parents].sort().join(",");
      if (!parentPairs.has(sortedParents)) {
        parentPairs.set(sortedParents, []);
      }
      parentPairs.get(sortedParents)!.push(child.id);
    }
  });

  // Рисование линий (как на первой фото)
  parentPairs.forEach((childIds, parentKey) => {
    const parentIds = parentKey.split(",");

    if (parentIds.length === 1) {
      // Один родитель
      const parentId = parentIds[0];
      const parentPos = nodeMap[parentId];
      if (!parentPos) return;

      const childPositions = childIds
        .map((id) => nodeMap[id])
        .filter((p) => p) as Array<{ x: number; y: number }>;

      if (childPositions.length === 0) return;

      const minChildX = Math.min(...childPositions.map((p) => p.x));
      const maxChildX = Math.max(...childPositions.map((p) => p.x));
      const childY = childPositions[0].y;

      const midY = (parentPos.y + childY) / 2;

      // Линия от родителя вниз
      links.push({
        x1: parentPos.x,
        y1: parentPos.y,
        x2: parentPos.x,
        y2: midY,
      });

      // Горизонтальная линия в центре (охватывает всех детей)
      links.push({
        x1: minChildX,
        y1: midY,
        x2: maxChildX,
        y2: midY,
      });

      // Вертикали от горизонтальной линии к каждому ребёнку
      childPositions.forEach((childPos) => {
        links.push({
          x1: childPos.x,
          y1: midY,
          x2: childPos.x,
          y2: childPos.y,
        });
      });
    } else if (parentIds.length === 2) {
      const parent1Pos = nodeMap[parentIds[0]];
      const parent2Pos = nodeMap[parentIds[1]];
      if (!parent1Pos || !parent2Pos) return;

      const childPositions = childIds
        .map((id) => nodeMap[id])
        .filter((p) => p) as Array<{ x: number; y: number }>;

      if (childPositions.length === 0) return;

      // Линия между родителями (горизонтальная)
      const minParentX = Math.min(parent1Pos.x, parent2Pos.x);
      const maxParentX = Math.max(parent1Pos.x, parent2Pos.x);
      const parentY = parent1Pos.y;

      links.push({
        x1: minParentX,
        y1: parentY,
        x2: maxParentX,
        y2: parentY,
      });

      // Вертикали от каждого родителя вниз
      links.push({
        x1: parent1Pos.x,
        y1: parentY,
        x2: parent1Pos.x,
        y2: (parentY + childPositions[0].y) / 2,
      });
      links.push({
        x1: parent2Pos.x,
        y1: parentY,
        x2: parent2Pos.x,
        y2: (parentY + childPositions[0].y) / 2,
      });

      // Горизонтальная линия между вертикалями родителей к детям
      const minChildX = Math.min(...childPositions.map((p) => p.x));
      const maxChildX = Math.max(...childPositions.map((p) => p.x));
      const midY = (parentY + childPositions[0].y) / 2;

      links.push({
        x1: minParentX,
        y1: midY,
        x2: maxParentX,
        y2: midY,
      });

      links.push({
        x1: minChildX,
        y1: midY,
        x2: maxChildX,
        y2: midY,
      });

      // Вертикали к каждому ребёнку
      childPositions.forEach((childPos) => {
        links.push({
          x1: childPos.x,
          y1: midY,
          x2: childPos.x,
          y2: childPos.y,
        });
      });
    }
  });

  return { nodes, links, maxX, maxY };
}
