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
import { PatientSearchFormValues } from "../../../features/patient-search/model";

interface Props {
  label: string;
  name: keyof PatientSearchFormValues;
  value?: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
  disabled?: boolean;
  isLoading?: boolean;
}

export const PatientSearchSelect: FC<Props> = ({
  label,
  value = "",
  onChange,
  options,
  disabled = false,
  isLoading = false,
}) => {
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
            <SelectTrigger className="w-full">
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
