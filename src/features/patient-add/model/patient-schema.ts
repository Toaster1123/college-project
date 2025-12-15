import { z } from "zod";

export const patientAddSchema = z.object({
  lastName: z.string().min(1, { message: "Фамилия обязательна" }).trim(),
  firstName: z.string().min(1, { message: "Имя обязательно" }).trim(),
  fatherName: z.string().min(1, { message: "Отчество обязательно" }).trim(),

  birthday: z.string().min(1, { message: "Дата рождения обязательна" }),
  gender: z.enum(["муж", "жен", ""]),

  country: z.string().optional(),
  region: z.string().optional(),
  city: z.string().min(1, { message: "Город обязателен" }),

  stage: z
    .string()
    .min(1, { message: "Клиническая стадия обязательна" })
    .trim(),
  bloodDate: z.string().min(1, { message: "Дата анализа крови обязательна" }),
  mutation: z
    .string()
    .min(1, { message: "Описание мутации обязательно" })
    .trim(),
  crio: z.string().min(1, { message: "Информация о крио обязательна" }).trim(),
  dateCrio: z.string().min(1, { message: "Дата крио обязательна" }),

  doctorConsultation: z
    .string()
    .min(1, { message: "Консультация врача обязательна" })
    .trim(),
  doctorConsultationDate: z
    .string()
    .min(1, { message: "Дата консультации врача обязательна" }),

  geneticistConsultation: z
    .string()
    .min(1, { message: "Консультация генетика обязательна" })
    .trim(),
  geneticistConsultationDate: z
    .string()
    .min(1, { message: "Дата консультации генетика обязательна" }),

  recommendations: z
    .string()
    .min(1, { message: "Рекомендации обязательны" })
    .trim(),
});

export type PatientAddFormValues = z.infer<typeof patientAddSchema>;
