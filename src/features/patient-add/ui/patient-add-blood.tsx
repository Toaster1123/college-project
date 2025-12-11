import { FormTitle, Input, Label, Textarea } from "@/shared";
import { Clipboard } from "lucide-react";
import { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { PatientAddFormValues } from "../model";

interface Props {
  register: UseFormRegister<PatientAddFormValues>;
  errors: FieldErrors<PatientAddFormValues>;
}

export const PatientAddBlood: FC<Props> = ({ register, errors }) => {
  return (
    <section className="bg-white dark:bg-gray-900 shadow-lg rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
        <FormTitle Icon={Clipboard} label="Клинические обследования" />
      </div>

      <div className="px-6 pb-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="stage">Клиническая стадия</Label>
            <Input
              id="stage"
              placeholder="Например: Stage I"
              {...register("stage")}
              aria-invalid={!!errors.stage}
            />
            {errors.stage && (
              <p className="mt-1 text-sm text-red-500">
                {errors.stage.message as string}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="bloodDate">Дата анализа крови</Label>
            <Input
              id="bloodDate"
              type="date"
              {...register("bloodDate")}
              aria-invalid={!!errors.bloodDate}
            />
            {errors.bloodDate && (
              <p className="mt-1 text-sm text-red-500">
                {errors.bloodDate.message as string}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="mutation">Мутация</Label>
            <Textarea
              id="mutation"
              placeholder="Описание мутации..."
              {...register("mutation")}
              aria-invalid={!!errors.mutation}
              rows={4}
            />
            {errors.mutation && (
              <p className="mt-1 text-sm text-red-500">
                {errors.mutation.message as string}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="crio">Криосохранение</Label>
            <Textarea
              id="crio"
              placeholder="Информация о крио..."
              {...register("crio")}
              aria-invalid={!!errors.crio}
              rows={4}
            />
            {errors.crio && (
              <p className="mt-1 text-sm text-red-500">
                {errors.crio.message as string}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="dateCrio">Дата криосохранения</Label>
          <Input
            id="dateCrio"
            type="date"
            {...register("dateCrio")}
            aria-invalid={!!errors.dateCrio}
          />
          {errors.dateCrio && (
            <p className="mt-1 text-sm text-red-500">
              {errors.dateCrio.message as string}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
