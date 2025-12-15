import { useState } from "react";
import { PatientAddFormValues } from "../model";
import { addPatientApi } from "../api";
import { toast } from "sonner";

export const useAddPatient = () => {
  const [loading, setLoading] = useState(false);

  const createPatient = async (data: PatientAddFormValues) => {
    setLoading(true);

    try {
      const record = await addPatientApi(data);

      setLoading(false);
      return record;
    } catch (err: unknown) {
      setLoading(false);
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Ошибка при добавлении пациента");
      }

      throw err;
    }
  };

  return { createPatient, loading };
};
