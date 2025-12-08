import type { Metadata } from "next";
import "../globals.css";
import { Toaster } from "@/shared";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Медеко - генелогическое древо мудрости",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Toaster richColors position="top-center" />
      {children}
    </>
  );
}
