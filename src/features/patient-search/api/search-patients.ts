import { PatientSearchFormValues } from "../model";
import { PatientSearch } from "../types";

export const searchApi = async (
  filters: PatientSearchFormValues
): Promise<PatientSearch[]> => {
  const queryParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) queryParams.append(key, value.toString());
  });

  const res = await fetch(`/api/patients?${queryParams.toString()}`);
  if (!res.ok) throw new Error("Ошибка при поиске пациентов");

  return res.json() as Promise<PatientSearch[]>;
};
