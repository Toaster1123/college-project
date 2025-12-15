export const membersValues = [
  { id: "1", name: "Отец", gender: "муж" },
  { id: "2", name: "Мать", gender: "жен" },
  { id: "3", name: "Брат (по отцу)", gender: "муж" },
  { id: "4", name: "Сестра (по отцу)", gender: "жен" },
  { id: "5", name: "Брат (по матери)", gender: "муж" },
  { id: "6", name: "Сестра (по матери)", gender: "жен" },
  { id: "7", name: "Дедушка (по отцу)", gender: "муж" },
  { id: "8", name: "Бабушка (по отцу)", gender: "жен" },
  { id: "9", name: "Дедушка (по матери)", gender: "муж" },
  { id: "10", name: "Бабушка (по матери)", gender: "жен" },
  { id: "11", name: "Дядя (по отцу)", gender: "муж" },
  { id: "12", name: "Тётя (по отцу)", gender: "жен" },
  { id: "13", name: "Дядя (по матери)", gender: "муж" },
  { id: "14", name: "Тётя (по матери)", gender: "жен" },
  { id: "15", name: "Сын", gender: "муж" },
  { id: "16", name: "Дочь", gender: "жен" },
] as const;
export type RelationType = (typeof membersValues)[number]["name"];
