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
    <section>
      <div className="">
        <FormTitle Icon={Clipboard} label="Клинические обследования" />
      </div>

      <div className="pb-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="stage">Клиническая стадия</Label>
            <Input
              id="stage"
              placeholder="Например: Stage I"
              {...register("stage")}
              aria-invalid={!!errors.stage}
            />
            {errors.stage && (
              <p className="text-sm text-red-500">
                {errors.stage.message as string}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="bloodDate">Дата анализа крови</Label>
            <Input
              id="bloodDate"
              type="date"
              {...register("bloodDate")}
              aria-invalid={!!errors.bloodDate}
            />
            {errors.bloodDate && (
              <p className="text-sm text-red-500">
                {errors.bloodDate.message as string}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="mutation">Мутация</Label>
            <Textarea
              id="mutation"
              placeholder="Описание мутации..."
              {...register("mutation")}
              aria-invalid={!!errors.mutation}
              rows={4}
            />
            {errors.mutation && (
              <p className="text-sm text-red-500">
                {errors.mutation.message as string}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="crio">Криосохранение</Label>
            <Textarea
              id="crio"
              placeholder="Информация о крио..."
              {...register("crio")}
              aria-invalid={!!errors.crio}
              rows={4}
            />
            {errors.crio && (
              <p className="text-sm text-red-500">
                {errors.crio.message as string}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="dateCrio">Дата криосохранения</Label>
          <Input
            id="dateCrio"
            type="date"
            {...register("dateCrio")}
            aria-invalid={!!errors.dateCrio}
          />
          {errors.dateCrio && (
            <p className="text-sm text-red-500">
              {errors.dateCrio.message as string}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
