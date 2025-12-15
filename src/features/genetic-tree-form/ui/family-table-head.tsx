import { FC } from "react";
import { tableHeadValues } from "../constants";

export const FamilyTableHead: FC = () => {
  return (
    <thead>
      <tr className="bg-gray-50 dark:bg-slate-700/60 border-b border-gray-200 dark:border-slate-700">
        {tableHeadValues.map((item, id) => (
          <th
            key={id}
            className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
          >
            {item}
          </th>
        ))}
        <th className="px-4 py-3" />
      </tr>
    </thead>
  );
};
