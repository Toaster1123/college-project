import { FC } from "react";
import { useFamilyStore } from "../model";

export const FamilyTreeTableBody: FC = () => {
  const { members } = useFamilyStore();

  return (
    <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
      {members.map((member) => (
        <tr
          key={member.id}
          className="hover:bg-blue-50 dark:hover:bg-slate-700/40 transition-colors"
        ></tr>
      ))}
    </tbody>
  );
};
