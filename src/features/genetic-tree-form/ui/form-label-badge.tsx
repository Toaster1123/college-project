import { cn } from "@/shared";
import { FC } from "react";

interface Props {
  label?: string;
  condition?: boolean;
  colorSchema: "gender" | "exist";
}

export const FormLabelBadge: FC<Props> = ({
  label,
  colorSchema,
  condition,
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-semibold",
        colorSchema === "gender"
          ? condition
            ? "bg-blue-100 text-blue-700"
            : " bg-pink-100 text-pink-500"
          : condition
          ? "bg-emerald-100 text-emerald-700"
          : "bg-neutral-100 text-neutral-700"
      )}
    >
      <span
        className={cn(
          "w-2 h-2 rounded-full",
          colorSchema === "gender"
            ? condition
              ? "bg-blue-500"
              : "bg-pink-500"
            : condition
            ? "bg-emerald-500"
            : " bg-neutral-400"
        )}
      />
      {label}
    </span>
  );
};
