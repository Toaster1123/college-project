import * as z from "zod";

export const loginSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Имя пользователя должно быть не меньше 4 символов" })
    .max(20, { message: "Имя пользователя должно быть не больше 20 символов" })
    .trim(),
  password: z
    .string()
    .trim()
    .min(6, { message: "Пароль должен быть минимум 6 символов" })
    .max(50, { message: "Пароль слишком длинный" }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
