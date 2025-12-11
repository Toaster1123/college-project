import { Input, Label } from "@/shared";
import { FC } from "react";
import { PatientAddFormValues } from "../model";
import { UseFormRegister } from "react-hook-form";

interface Props {
  label: string;
  name: keyof PatientAddFormValues;
  register: UseFormRegister<PatientAddFormValues>;
  placeholder?: string;
}

export const PatientAddInput: FC<Props> = ({
  label,
  name,
  register,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} placeholder={placeholder} {...register(name)} />
    </div>
  );
};
