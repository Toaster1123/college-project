"use client";

import { Button, PatientPersonalFields } from "@/shared";
import { PatientSearchLocation } from "@/features";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PatientAddFormValues, patientAddSchema } from "../model";
import { defaultValues } from "../constants";
import { useAddPatient } from "../hooks";
import { PatientAddBlood } from "./patient-add-blood";
import { PatientAddConsult } from "./patient-add-consult";
import { toast } from "sonner";

export const PatientAddForm = () => {
  const { createPatient, loading } = useAddPatient();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PatientAddFormValues>({
    resolver: zodResolver(patientAddSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const watchFields = watch();

  const onSubmit = async (data: PatientAddFormValues) => {
    await createPatient(data);
    toast.success("Пациент успешно добавлен");

    reset();
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 space-y-8">
      <section className="bg-white dark:bg-gray-900 shadow-lg rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Новый пациент
          </h1>
        </div>

        <form className="px-6 py-8 space-y-8">
          <PatientPersonalFields
            register={register}
            watchFields={watchFields}
            setValue={setValue}
            errors={errors}
          />

          <PatientSearchLocation
            watchFields={{
              country: watchFields.country,
              region: watchFields.region,
              city: watchFields.city,
            }}
            updateForm={(name, value) => setValue(name as any, value)}
            errors={errors}
          />

          <PatientAddBlood register={register} errors={errors} />

          <PatientAddConsult register={register} errors={errors} />

          <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
            <Button
              type="button"
              variant="outline"
              onClick={() => reset()}
              disabled={loading}
            >
              Сбросить
            </Button>

            <Button
              onClick={handleSubmit(onSubmit)}
              className="bg-blue-500 hover:bg-blue-400"
              disabled={loading}
            >
              {loading ? "Сохранение..." : "Сохранить пациента"}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
};
