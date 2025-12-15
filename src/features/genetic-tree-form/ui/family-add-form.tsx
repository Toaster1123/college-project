"use client";
import { FC } from "react";

import { Controller, useForm } from "react-hook-form";
import { familyCheckboxValue, RelationType } from "../constants";
import { FamilyTreeAddSelector } from "./family-tree-add-selector";
import { FamilyAddCheckbox } from "./family-add-checkbox";
import { MembersSchema, MembersSchemaValues, useFamilyStore } from "../model";
import { zodResolver } from "@hookform/resolvers/zod";

export const FamilyTreeForm: FC = () => {
  const { addMember } = useFamilyStore();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<MembersSchemaValues>({
    resolver: zodResolver(MembersSchema),
    defaultValues: {
      relation: "" as RelationType,
      disease: undefined,
      isAlive: true,
      isPregnant: false,
      isConsanguineous: false,
      gender: "муж",
      parents: [],
    },
  });
  const onSubmit = (data: MembersSchemaValues) => {
    addMember({
      ...data,
      relation: data.relation as RelationType,
      parents: data.parents || [],
    });
    reset();
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-md overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 dark:border-slate-700 bg-linear-to-r from-blue-50 to-teal-50 dark:from-slate-700 dark:to-slate-800">
        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-3">
          Добавить члена семьи
        </h3>
      </div>

      <div className="px-6 py-8 space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              control={control}
              name="relation"
              render={({ field }) => (
                <FamilyTreeAddSelector
                  value={field.value ?? ""}
                  onChange={(name, gender) => {
                    field.onChange(name);
                    setValue("gender", gender);
                  }}
                  errorText={errors.relation?.message}
                />
              )}
            />

            <div>
              <label className="text-sm font-semibold mb-2 flex gap-1">
                Заболевание <span className="text-red-500">*</span>
              </label>

              <input
                {...register("disease")}
                placeholder="Рак, диабет и т.д."
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
              />

              {errors.disease && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.disease.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
              Состояние здоровья
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-blue-50 rounded-lg p-4">
              {familyCheckboxValue.map(({ name, label }) => (
                <FamilyAddCheckbox
                  key={name}
                  label={label}
                  inputProps={register(name)}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 bg-linear-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold rounded-lg transition shadow-md hover:shadow-lg active:scale-95"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
              Добавить в дерево
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};
