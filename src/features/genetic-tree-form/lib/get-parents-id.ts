import { TableFormValues, TableTypes } from "../types";

const parentMap: Record<string, string[]> = {
  Сын: ["Отец", "Мать"],
  Дочь: ["Отец", "Мать"],

  Отец: ["Дедушка (по отцу)", "Бабушка (по отцу)"],
  Мать: ["Дедушка (по матери)", "Бабушка (по матери)"],

  "Брат (по отцу)": ["Дедушка (по отцу)", "Бабушка (по отцу)"],
  "Сестра (по отцу)": ["Дедушка (по отцу)", "Бабушка (по отцу)"],

  "Брат (по матери)": ["Дедушка (по матери)", "Бабушка (по матери)"],
  "Сестра (по матери)": ["Дедушка (по матери)", "Бабушка (по матери)"],
};

export const getParentIds = (
  member: TableFormValues,
  members: TableTypes[]
): string[] => {
  const expectedParents = parentMap[member.relation] || [];

  return expectedParents
    .map((relationName) => members.find((m) => m.relation === relationName)?.id)
    .filter(Boolean) as string[];
};
