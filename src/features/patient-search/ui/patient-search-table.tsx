"use client";

import { FC } from "react";
import { PatientSearch } from "../types";

interface Props {
  results: PatientSearch[];
  loading?: boolean;
}

export const PatientSearchTable: FC<Props> = ({ results, loading = false }) => {
  if (loading) {
    return (
      <section className="bg-white dark:bg-gray-900 shadow-lg rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Результаты поиска
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Загрузка...
          </p>
        </div>
        <div className="px-6 py-8 text-center text-gray-600 dark:text-gray-400">
          Загрузка результатов...
        </div>
      </section>
    );
  }

  if (results.length === 0) {
    return (
      <section className="bg-white dark:bg-gray-900 shadow-lg rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Результаты поиска
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Найдено: 0 пациентов
          </p>
        </div>
        <div className="px-6 py-8 text-center text-gray-600 dark:text-gray-400">
          Результаты не найдены
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white dark:bg-gray-900 shadow-lg rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Результаты поиска
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Найдено: {results.length} пациента
            {results.length % 10 === 1 && results.length % 100 !== 11
              ? ""
              : results.length % 10 >= 2 &&
                results.length % 10 <= 4 &&
                (results.length % 100 < 10 || results.length % 100 >= 20)
              ? "в"
              : "ов"}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                ФИО
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                Пол
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                Год рождения
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                Проживание
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {results.map((patient, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition cursor-pointer"
              >
                <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">
                  {patient.fullName}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                  {patient.gender}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                  {patient.birthYear
                    ? patient.birthYear.split("-").reverse().join(".")
                    : ""}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                  {patient.city}, {patient.region}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
