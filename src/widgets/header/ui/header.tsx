"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { headerLinks } from "../contants";
import { cn } from "@/shared";

export const Header: FC = () => {
  const pathname = usePathname();

  return (
    <header className="w-full bg-white shadow-2xl z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="shrink-0 font-bold text-xl text-gray-900 dark:text-white">
            Генекологическое дерево
          </div>

          <nav className="flex space-x-4">
            {headerLinks.map((item) => {
              const isActive = pathname === `/${item.linkUrl}`;

              return (
                <Link
                  href={item.linkUrl}
                  key={item.linkUrl}
                  className={cn(
                    "px-3 py-2 font-medium transition-colors text-gray-700 border-b-2 border-transparent",
                    isActive ? "border-b-blue-500" : "hover:border-b-blue-500"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
