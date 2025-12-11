import { z } from "zod";

export const patientSearchSchema = z.object({
  lastName: z.string().max(50).optional(),
  firstName: z.string().max(50).optional(),
  fatherName: z.string().max(50).optional(),
  birthDate: z
    .string()
    .regex(/^\d{4}$/, "Введите корректный год")
    .optional()
    .or(z.literal("")),
  gender: z.enum(["male", "female", ""]).optional(),
  country: z.string().optional(),
  region: z.string().optional(),
  city: z.string().optional(),
});

export type PatientSearchFormValues = z.infer<typeof patientSearchSchema>;
