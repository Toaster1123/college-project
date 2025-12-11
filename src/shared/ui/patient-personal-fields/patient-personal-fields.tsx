"use client";

import { FormTitle, personalFields } from "@/shared";
import { FormInput } from "../form-input";
import { PatientSearchSelect } from "../patient-search-select";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { PatientSearchFormValues } from "../../../features/patient-search/model";
import { User2 } from "lucide-react";

interface Props {
  register: UseFormRegister<PatientSearchFormValues>;
  errors?: FieldErrors<PatientSearchFormValues>;
  watchFields: PatientSearchFormValues;
  setValue: UseFormSetValue<PatientSearchFormValues>;
}

export function PatientPersonalFields({
  register,
  errors,
  watchFields,
  setValue,
}: Props) {
  return (
    <div>
      <FormTitle Icon={User2} label="Персональные данные" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {personalFields.map((item, idx) => (
          <FormInput<PatientSearchFormValues>
            key={idx}
            label={item.label}
            name={item.name as keyof PatientSearchFormValues}
            placeholder={item.placeholder}
            register={register}
            errors={errors}
          />
        ))}

        <PatientSearchSelect
          label="Пол"
          name="gender"
          value={watchFields.gender ?? ""}
          onChange={(val) =>
            setValue("gender", val as PatientSearchFormValues["gender"])
          }
          options={[
            { value: "male", label: "Мужской" },
            { value: "female", label: "Женский" },
          ]}
        />
      </div>
    </div>
  );
}
