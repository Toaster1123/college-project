import { useState } from "react";
import { PatientSearchFormValues } from "../model/search-schema";
import { PatientSearch } from "../types";
import { searchApi } from "../api";

export const usePatientSearch = () => {
  const [results, setResults] = useState<PatientSearch[]>([]);
  const [loading, setLoading] = useState(false);

  const searchPatients = async (filters: PatientSearchFormValues) => {
    setLoading(true);
    try {
      const data = await searchApi(filters);
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
