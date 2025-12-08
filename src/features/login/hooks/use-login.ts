"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { pb } from "../lib/pocketbase-client";
import { LoginFormValues } from "../model/login-schema";
import { toast } from "sonner";
import { RecordModel } from "pocketbase";

export const useLogin = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<RecordModel | null>(null);

  const login = async (values: LoginFormValues) => {
    try {
      const users = await pb.collection("user").getFullList({
        filter: `name="${values.name.trim()}"`,
      });

      if (users.length === 0) {
        throw new Error("Пользователь не найден");
      }

      const user = users[0];

      if (user.password !== values.password.trim()) {
        throw new Error("Неверный пароль");
      }

      setCurrentUser(user);

      router.replace("/search-patient");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Ошибка входа — проверьте данные"
      );
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return { login, logout, currentUser };
};
