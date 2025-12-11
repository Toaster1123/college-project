import { LucideProps } from "lucide-react";
import { FC } from "react";

interface Props {
  Icon: FC<LucideProps>;
  label: string;
}

export const FormTitle: FC<Props> = ({ Icon, label }) => {
  return (
    <h2 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-5 flex items-center gap-2">
      <Icon size={20} />
      <span>{label}</span>
    </h2>
  );
};
