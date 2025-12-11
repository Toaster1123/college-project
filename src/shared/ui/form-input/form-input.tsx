import { Input, Label } from "@/shared";
import { FieldErrors, get, Path, UseFormRegister } from "react-hook-form";

interface Props<T extends object> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  placeholder?: string;
}

export const FormInput = <T extends object>({
  label,
  name,
  register,
  errors,
  placeholder,
}: Props<T>) => {
  const fieldError = get(errors, name)?.message;

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name}>{label}</Label>

      <Input
        id={name}
        placeholder={placeholder}
        {...register(name)}
        className={fieldError ? "border-red-500" : ""}
      />

      <div className="min-h-[18px]">
        {fieldError && <p className="text-sm text-red-500">{fieldError}</p>}
      </div>
    </div>
  );
};
