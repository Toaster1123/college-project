"use client";

import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Button,
} from "@/shared";
import { useLogin } from "../hooks";
import { LoginFormValues, loginSchema } from "../model";
import { zodResolver } from "@hookform/resolvers/zod";

export const LoginForm = () => {
  const { login } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 via-white to-blue-50 p-4">
      <Card className="w-full max-w-md shadow-xl rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Вход в систему
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(login)} className="space-y-6">
            <div>
              <Label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
                Имя пользователя
              </Label>
              <Input
                {...register("name")}
                aria-invalid={!!errors.name}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-400"
              />
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
                Пароль
              </Label>
              <Input
                type="password"
                {...register("password")}
                aria-invalid={!!errors.password}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-400"
              />
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="pt-2">
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition-colors focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Вхожу..." : "Войти"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
