"use client";
import { FC } from "react";
import { useFamilyStore } from "../model";
import { FamilyTableHead } from "./family-table-head";
import { FamilyTableBodyItem } from "./family-table-body-item";

export const FamilyMembersTable: FC = () => {
  const { members, removeMember } = useFamilyStore();
  members.forEach((item) => console.log(item.relation, item.parents));
  console.log(members);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-md overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 dark:border-slate-700 bg-linear-to-r from-blue-50 to-cyan-50 dark:from-slate-700 dark:to-slate-800">
        <h3 className="flex items-center gap-3 text-lg font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          Члены семьи ({members.length})
        </h3>
      </div>

      {members.length === 0 ? (
        <div className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
          Добавьте первого члена семьи
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <FamilyTableHead />
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {members.map((member) => (
                <tr
                  key={member.id}
                  className="hover:bg-blue-50 dark:hover:bg-slate-700/40 transition-colors"
                >
                  <FamilyTableBodyItem
                    type="relation"
                    label={member.relation}
                    gender={member.gender}
                  />
                  <FamilyTableBodyItem type="disease" label={member.disease} />
                  <FamilyTableBodyItem
                    type="boolean"
                    label={member.isAlive ? "Да" : "Нет"}
                  />
                  <FamilyTableBodyItem
                    type="boolean"
                    label={member.isPregnant ? "Да" : "Нет"}
                  />
                  <FamilyTableBodyItem
                    type="boolean"
                    label={member.isConsanguineous ? "Да" : "Нет"}
                  />

                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => removeMember(member.id)}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                      title="Удалить"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
