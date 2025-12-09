import { Input, Label } from "@/shared";
import { FC } from "react";
import { PatientSearchFormValues } from "../model";
import { UseFormRegister } from "react-hook-form";

interface Props {
  label: string;
  name: keyof PatientSearchFormValues;
  register: UseFormRegister<PatientSearchFormValues>;
  placeholder?: string;
}

export const PatientSearchInput: FC<Props> = ({
  label,
  name,
  register,
  placeholder,
}) => {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} placeholder={placeholder} {...register(name)} />
    </div>
  );
};
