import { Input, Label } from "@/shared";
import { FC } from "react";

interface Props {
  label: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
}

export const FamilyAddCheckbox: FC<Props> = ({ label, inputProps }) => {
  return (
    <Label className="flex items-center cursor-pointer group">
      <Input
        type="checkbox"
        {...inputProps}
        className="w-5 h-5 rounded accent-blue-600"
      />
      <span className="ml-3 text-sm text-gray-700 dark:text-gray-200 group-hover:text-blue-600 transition">
        {label}
      </span>
    </Label>
  );
};
