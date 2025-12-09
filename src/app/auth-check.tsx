"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { pb } from "@/features";

export default function AuthRedirectClient() {
  const router = useRouter();

  // useEffect(() => {
  //   if (!pb.authStore.isValid) {
  //     router.replace("/login");
  //   }
  // }, [router]);

  return null;
}
