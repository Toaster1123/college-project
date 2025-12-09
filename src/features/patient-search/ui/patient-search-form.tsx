"use client";

import { Button, Input, Select } from "@/shared";
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

export const PatientSearchForm = () => {
  const { loading, resetResults, results, searchPatients } = usePatientSearch();
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
    resetResults();
  };
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-5 flex items-center gap-2">
          Персональные данные
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
              { value: "Не выбрано", label: "Не указан" },
              { value: "male", label: "Мужской" },
              { value: "female", label: "Женский" },
            ]}
          />
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-5 flex items-center gap-2">
          Проживание
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <PatientSearchLocation
            watchFields={{
              country: watchFields.country ? Number(watchFields.country) : 0,
              region: watchFields.region ? Number(watchFields.region) : 0,
              city: watchFields.city ? Number(watchFields.city) : 0,
            }}
            updateForm={(name, value) => setValue(name, value)}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
        <Button variant="outline" onClick={handleReset}>
          Сбросить
        </Button>
        <Button onClick={handleSubmit(onSubmit)}>Искать</Button>
      </div>
    </div>
  );
};
