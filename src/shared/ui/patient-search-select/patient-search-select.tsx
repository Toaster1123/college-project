"use client";

import { FC } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Label,
  Spinner,
  cn,
} from "@/shared";
import { FieldErrors, get, Path } from "react-hook-form";

interface Props<T extends object> {
  label: string;
  name: Path<T>;
  value?: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
  disabled?: boolean;
  isLoading?: boolean;
  errors?: FieldErrors<T>;
}

export const PatientSearchSelect = <T extends object>({
  label,
  value = "",
  onChange,
  options,
  disabled = false,
  isLoading = false,
  name,
  errors,
}: Props<T>) => {
  const fieldError = get(errors, name)?.message;
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>

      <div className="relative h-12">
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-300",
            isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
        >
          <Select disabled={disabled} value={value} onValueChange={onChange}>
            <SelectTrigger
              className={cn(
                "w-full",
                fieldError ? "border-red-500 ring-red-500" : ""
              )}
            >
              <SelectValue placeholder={"Не выбрано"} />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldError && (
            <p className="mt-1 text-sm text-red-500">{fieldError}</p>
          )}
        </div>

        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
            isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <Spinner />
        </div>
      </div>
    </div>
  );
};
