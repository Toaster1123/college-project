import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared";
import { FC } from "react";
import { membersValues } from "../constants";

interface Props {
  value: string;
  onChange: (value: string, gender: "муж" | "жен") => void;
  errorText?: string;
}

export const FamilyTreeAddSelector: FC<Props> = ({
  onChange,
  value,
  errorText,
}) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-1">
        <span>Родственник</span>
        <span className="text-red-500">*</span>
      </Label>

      <Select
        value={value ?? undefined}
        onValueChange={(val) => {
          const selected = membersValues.find((m) => m.name === val);
          if (selected) onChange(selected.name, selected.gender);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Выберите родственника" />
        </SelectTrigger>
        <SelectContent>
          {membersValues.map((rel) => (
            <SelectItem key={rel.name} value={rel.name}>
              {rel.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {errorText && <p className="text-xs text-red-500 mt-1">{errorText}</p>}
    </div>
  );
};
