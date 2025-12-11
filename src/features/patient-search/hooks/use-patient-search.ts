import { useState } from "react";
import { PatientSearch } from "../types";
import { searchApi } from "../api";
import { PatientSearchFormValues } from "../model";

export const usePatientSearch = () => {
  const [results, setResults] = useState<PatientSearch[]>([]);
  const [loading, setLoading] = useState(false);

  const searchPatients = async (params: PatientSearchFormValues) => {
    setLoading(true);
    try {
      const data = await searchApi(params);
      setResults(data);
    } catch (e) {
      console.error(e);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return { results, searchPatients, loading };
};
