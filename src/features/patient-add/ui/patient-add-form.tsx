// features/patient/ui/patient-form.tsx
"use client";

import { Button, FormTitle, PatientPersonalFields } from "@/shared";
import { User2 } from "lucide-react";
import { PatientSearchLocation } from "@/features";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PatientAddFormValues, patientAddSchema } from "../model";
import { defaultValues } from "../constants";
import { useAddPatient } from "../hooks";
import { PatientAddBlood } from "./patient-add-blood";
import { PatientAddConsult } from "./patient-add-consult";

export const PatientAddForm = () => {
  const { createPatient, loading, error } = useAddPatient();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<PatientAddFormValues>({
    resolver: zodResolver(patientAddSchema),
    defaultValues,
    mode: "onBlur",
  });

  const watchFields = watch();

  const onSubmit = async (data: PatientAddFormValues) => {
    console.log("object");
    const record = await createPatient(data);
    if (!record) return;
    reset();
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 space-y-8">
      {error && (
        <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3 text-sm text-red-800 dark:text-red-100">
          {error}
        </div>
      )}

      <section className="bg-white dark:bg-gray-900 shadow-lg rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
          <FormTitle Icon={User2} label="Новый пациент" />
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
              disabled={loading || !isDirty}
            >
              Сбросить
            </Button>

            <Button
              type="submit"
              className="bg-blue-500"
              onSubmit={handleSubmit(onSubmit)}
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
