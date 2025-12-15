import { FormTitle, Input, Label, Textarea } from "@/shared";
import { PenLine } from "lucide-react";
import { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { PatientAddFormValues } from "../model";

interface Props {
  register: UseFormRegister<PatientAddFormValues>;
  errors: FieldErrors<PatientAddFormValues>;
}

export const PatientAddConsult: FC<Props> = ({ register, errors }) => {
  return (
    <section>
      <div>
        <FormTitle Icon={PenLine} label="Консультации врача" />
      </div>

      <div className="py-8 space-y-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="doctorConsultation">Консультация доктора</Label>
          <Textarea
            id="doctorConsultation"
            placeholder="Результаты консультации..."
            {...register("doctorConsultation")}
            aria-invalid={!!errors.doctorConsultation}
            rows={4}
          />
          {errors.doctorConsultation && (
            <p className="text-sm text-red-500">
              {errors.doctorConsultation.message as string}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="doctorConsultationDate">
            Дата консультации врача
          </Label>
          <Input
            id="doctorConsultationDate"
            type="date"
            {...register("doctorConsultationDate")}
            aria-invalid={!!errors.doctorConsultationDate}
          />
          {errors.doctorConsultationDate && (
            <p className="text-sm text-red-500">
              {errors.doctorConsultationDate.message as string}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="geneticistConsultation">Консультация генетика</Label>
          <Textarea
            id="geneticistConsultation"
            placeholder="Результаты консультации..."
            {...register("geneticistConsultation")}
            aria-invalid={!!errors.geneticistConsultation}
            rows={4}
          />
          {errors.geneticistConsultation && (
            <p className="text-sm text-red-500">
              {errors.geneticistConsultation.message as string}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="geneticistConsultationDate">
            Дата консультации генетика
          </Label>
          <Input
            id="geneticistConsultationDate"
            type="date"
            {...register("geneticistConsultationDate")}
            aria-invalid={!!errors.geneticistConsultationDate}
          />
          {errors.geneticistConsultationDate && (
            <p className="text-sm text-red-500">
              {errors.geneticistConsultationDate.message as string}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="recommendations">Рекомендации</Label>
          <Textarea
            id="recommendations"
            placeholder="Основные рекомендации..."
            {...register("recommendations")}
            aria-invalid={!!errors.recommendations}
            rows={4}
          />
          {errors.recommendations && (
            <p className="text-sm text-red-500">
              {errors.recommendations.message as string}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
