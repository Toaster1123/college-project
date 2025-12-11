// features/patient/model/schema.ts
import { z } from "zod";

export const patientAddSchema = z.object({
  lastName: z.string().min(1, { message: "Фамилия обязательна" }).trim(),
  firstName: z.string().min(1, { message: "Имя обязательно" }).trim(),
  fatherName: z.string().min(1, { message: "Отчество обязательно" }).trim(),
  birthDate: z
    .string()
    .min(1, { message: "Дата рождения обязательна" })
    .refine((s) => !Number.isNaN(Date.parse(s)), {
      message: "Неверный формат даты",
    }),
  gender: z.enum(["male", "female", ""]),

  country: z.string().optional(),
  region: z.string().optional(),
  city: z.string().min(1, { message: "Город обязателен" }),

  seek: z.string().min(1, { message: "Название болезни обязательно" }).trim(),
  stage: z
    .string()
    .min(1, { message: "Клиническая стадия обязательна" })
    .trim(),

  mutation: z
    .string()
    .min(1, { message: "Описание мутации обязательно" })
    .trim(),
  bloodDate: z
    .string()
    .min(1, { message: "Дата анализа крови обязательна" })
    .refine((s) => !Number.isNaN(Date.parse(s)), {
      message: "Неверный формат даты",
    }),

  crio: z.string().min(1, { message: "Информация о крио обязательна" }).trim(),
  dateCrio: z
    .string()
    .min(1, { message: "Дата крио обязательна" })
    .refine((s) => !Number.isNaN(Date.parse(s)), {
      message: "Неверный формат даты",
    }),

  doctorConsultation: z
    .string()
    .min(1, { message: "Консультация врача обязательна" })
    .trim(),
  doctorConsultationDate: z
    .string()
    .min(1, { message: "Дата консультации врача обязательна" })
    .refine((s) => !Number.isNaN(Date.parse(s)), {
      message: "Неверный формат даты",
    }),

  geneticistConsultation: z
    .string()
    .min(1, { message: "Консультация генетика обязательна" })
    .trim(),
  geneticistConsultationDate: z
    .string()
    .min(1, { message: "Дата консультации генетика обязательна" })
    .refine((s) => !Number.isNaN(Date.parse(s)), {
      message: "Неверный формат даты",
    }),

  recommendations: z
    .string()
    .min(1, { message: "Рекомендации обязательны" })
    .trim(),
});

export type PatientAddFormValues = z.infer<typeof patientAddSchema>;
