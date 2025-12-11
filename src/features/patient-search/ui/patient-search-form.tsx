"use client";

import { Button } from "@/shared";
import {
  PatientSearchFormValues,
  patientSearchSchema,
  usePatientSearch,
} from "../model";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalFields } from "../constants";
import { PatientSearchInput } from "./patient-search-input";
import { PatientSearchSelect } from "./patient-search-selector";
import { PatientSearchLocation } from "./patient-search-location";
import { PatientSearchTable } from "./patient-search-table";
import { Map, User2 } from "lucide-react";

export const PatientSearchForm = () => {
  const { loading, results, searchPatients } = usePatientSearch();
  const { register, handleSubmit, reset, watch, setValue } =
    useForm<PatientSearchFormValues>({
      resolver: zodResolver(patientSearchSchema),
      defaultValues: {
        lastName: "",
        firstName: "",
        fatherName: "",
        birthYear: "",
        gender: "",
        country: "",
        region: "",
        city: "",
      },
    });
  const watchFields = watch();

  const onSubmit = async (data: PatientSearchFormValues) => {
    await searchPatients(data);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <section className="bg-white dark:bg-gray-900 shadow-lg rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Поиск пациента
          </h1>
        </div>

        <div className="px-6 py-8 space-y-8">
          <div>
            <h2 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-5 flex items-center gap-2">
              <User2 size={20} />
              <span>Персональные данные</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {personalFields.map((item, id) => (
                <PatientSearchInput
                  label={item.label}
                  name={item.name as keyof PatientSearchFormValues}
                  register={register}
                  key={id}
                />
              ))}
              <PatientSearchSelect
                label="Пол"
                name="gender"
                value={watchFields.gender}
                onChange={(val) =>
                  setValue("gender", val as "" | "male" | "female")
                }
                options={[
                  { value: "male", label: "Мужской" },
                  { value: "female", label: "Женский" },
                ]}
              />
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-5 flex items-center gap-2">
              <Map />
              Проживание
            </h2>
            <PatientSearchLocation
              watchFields={{
                country: watchFields.country,
                region: watchFields.region,
                city: watchFields.city,
              }}
              updateForm={(name, value) => setValue(name, value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
            <Button variant="outline" onClick={handleReset}>
              Сбросить
            </Button>
            <Button
              className="bg-blue-500"
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
            >
              {loading ? "Поиск..." : "Искать"}
            </Button>
          </div>
        </div>
      </section>

      <PatientSearchTable results={results} loading={loading} />
    </div>
  );
};
