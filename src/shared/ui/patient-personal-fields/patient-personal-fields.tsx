"use client";

import { FormTitle, Input, Label, personalFields } from "@/shared";
import { FormInput } from "../form-input";
import { PatientSearchSelect } from "../patient-search-select";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { User2 } from "lucide-react";
import { PatientAddFormValues } from "@/features/patient-add/model";

interface Props<TFormValues extends FieldValues> {
  register: UseFormRegister<TFormValues>;
  errors?: FieldErrors<TFormValues>;
  watchFields: TFormValues;
  setValue: UseFormSetValue<TFormValues>;
}

export function PatientPersonalFields({
  register,
  errors,
  watchFields,
  setValue,
}: Props<PatientAddFormValues>) {
  return (
    <div>
      <FormTitle Icon={User2} label="Персональные данные" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {personalFields.map((item, idx) => {
          if (item.name === "birthday") {
            return (
              <div key={idx} className="flex flex-col gap-2">
                <Label htmlFor={item.name}>Дата рождения</Label>
                <Input
                  id={item.name}
                  type="date"
                  {...register("birthday")}
                  aria-invalid={!!errors?.birthday}
                />
                {errors?.birthday && (
                  <p className="text-sm text-red-500">
                    {errors.birthday.message as string}
                  </p>
                )}
              </div>
            );
          }

          return (
            <FormInput<PatientAddFormValues>
              key={idx}
              label={item.label}
              name={item.name as keyof PatientAddFormValues}
              placeholder={item.placeholder}
              register={register}
              errors={errors}
            />
          );
        })}

        <PatientSearchSelect
          label="Пол"
          name="gender"
          value={watchFields.gender ?? ""}
          onChange={(val) =>
            setValue("gender", (val ?? "") as PatientAddFormValues["gender"])
          }
          errors={errors}
          options={[
            { value: "муж", label: "Мужской" },
            { value: "жен", label: "Женский" },
          ]}
        />
      </div>
    </div>
  );
}
