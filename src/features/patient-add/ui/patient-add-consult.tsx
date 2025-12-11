// features/patient/ui/patient-add-consult.tsx
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
    <section className="bg-white dark:bg-gray-900 shadow-lg rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
        <FormTitle Icon={PenLine} label="Консультации врача" />
      </div>

      <div className="px-6 py-8 space-y-6">
        <div>
          <Label htmlFor="doctorConsultation">Консультация доктора</Label>
          <Textarea
            id="doctorConsultation"
            placeholder="Результаты консультации..."
            {...register("doctorConsultation")}
            aria-invalid={!!errors.doctorConsultation}
            rows={4}
          />
          {errors.doctorConsultation && (
            <p className="mt-1 text-sm text-red-500">
              {errors.doctorConsultation.message as string}
            </p>
          )}
        </div>

        <div>
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
            <p className="mt-1 text-sm text-red-500">
              {errors.doctorConsultationDate.message as string}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="geneticistConsultation">Консультация генетика</Label>
          <Textarea
            id="geneticistConsultation"
            placeholder="Результаты консультации..."
            {...register("geneticistConsultation")}
            aria-invalid={!!errors.geneticistConsultation}
            rows={4}
          />
          {errors.geneticistConsultation && (
            <p className="mt-1 text-sm text-red-500">
              {errors.geneticistConsultation.message as string}
            </p>
          )}
        </div>

        <div>
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
            <p className="mt-1 text-sm text-red-500">
              {errors.geneticistConsultationDate.message as string}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="recommendations">Рекомендации</Label>
          <Textarea
            id="recommendations"
            placeholder="Основные рекомендации..."
            {...register("recommendations")}
            aria-invalid={!!errors.recommendations}
            rows={4}
          />
          {errors.recommendations && (
            <p className="mt-1 text-sm text-red-500">
              {errors.recommendations.message as string}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
