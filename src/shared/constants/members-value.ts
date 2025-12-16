export const membersValues = [
  { id: "1", name: "Отец", gender: "муж", level: 2 },
  { id: "2", name: "Мать", gender: "жен", level: 2 },
  { id: "3", name: "Брат отца", gender: "муж", level: 2 },
  { id: "4", name: "Сестра отца", gender: "жен", level: 2 },
  { id: "5", name: "Брат матери", gender: "муж", level: 2 },
  { id: "6", name: "Сестра матери", gender: "жен", level: 2 },
  { id: "7", name: "Дедушка (по отцу)", gender: "муж", level: 3 },
  { id: "8", name: "Бабушка (по отцу)", gender: "жен", level: 3 },
  { id: "9", name: "Дедушка (по матери)", gender: "муж", level: 3 },
  { id: "10", name: "Бабушка (по матери)", gender: "жен", level: 3 },
  { id: "11", name: "Сын", gender: "муж", level: 1 },
  { id: "12", name: "Дочь", gender: "жен", level: 1 },
] as const;
export type RelationType = (typeof membersValues)[number]["name"];
