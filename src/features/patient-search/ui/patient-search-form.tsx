"use client";

import { Button, PatientPersonalFields } from "@/shared";
import { PatientSearchFormValues, patientSearchSchema } from "../model";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PatientSearchTable } from "./patient-search-table";
import { PatientSearchLocation } from "@/features";
import { usePatientSearch } from "../hooks";

export const PatientSearchForm = () => {
  const { loading, results, searchPatients } = usePatientSearch();
  const { register, handleSubmit, reset, watch, setValue } =
    useForm<PatientSearchFormValues>({
      resolver: zodResolver(patientSearchSchema),
      defaultValues: {
        lastName: "",
        firstName: "",
        fatherName: "",
        birthday: "",
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

  return (
    <div className="max-w-7xl mx-auto my-8 space-y-8">
      <section className="bg-white dark:bg-gray-900 shadow-lg rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Поиск пациента
          </h1>
        </div>

        <div className="px-6 py-8 space-y-8">
          <PatientPersonalFields
            register={register}
            watchFields={watchFields}
            setValue={setValue}
          />

          <PatientSearchLocation
            watchFields={{
              country: watchFields.country,
              region: watchFields.region,
              city: watchFields.city,
            }}
            updateForm={(name, value) => setValue(name, value)}
          />

          <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
            <Button variant="outline" onClick={() => reset()}>
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
