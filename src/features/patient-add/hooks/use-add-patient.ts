import { useState } from "react";
import { PatientAddFormValues } from "../model";
import { addPatientApi } from "../api";

export const useAddPatient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPatient = async (data: PatientAddFormValues) => {
    setLoading(true);
    setError(null);

    try {
      const record = await addPatientApi(data);
      setLoading(false);
      return record;
    } catch (err: unknown) {
      setLoading(false);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ошибка при добавлении пациента");
      }

      throw err;
    }
  };

  return { createPatient, loading, error };
};
