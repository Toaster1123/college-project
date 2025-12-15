// export const defaultValues = {
//   birthday: "1990-01-01", // валидная дата
//   bloodDate: "2025-12-13", // дата анализа крови
//   city: "",
//   country: "",
//   crio: "Информация о крио",
//   dateCrio: "2025-12-14", // дата крио
//   doctorConsultation: "Доктор Петров",
//   doctorConsultationDate: "2025-12-15",
//   fatherName: "Иванович",
//   firstName: "Иван",
//   gender: "муж", // строго "муж" или "жен"
//   geneticistConsultation: "Генетик Сидоров",
//   geneticistConsultationDate: "2025-12-16",
//   lastName: "Иванов",
//   mutation: "Пример мутации",
//   recommendations: "Следовать рекомендациям врача",
//   region: "",
//   stage: "Начальная стадия",
// } as const;

export const defaultValues = {
  firstName: "",
  lastName: "",
  fatherName: "",

  birthday: "",
  gender: "",

  country: "",
  region: "",
  city: "",

  stage: "",
  bloodDate: "",
  mutation: "",
  crio: "",
  dateCrio: "",

  doctorConsultation: "",
  doctorConsultationDate: "",

  geneticistConsultation: "",
  geneticistConsultationDate: "",

  recommendations: "",
} as const;
