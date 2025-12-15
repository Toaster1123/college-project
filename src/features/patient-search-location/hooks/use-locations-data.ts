"use client";
import { City, Country, Region } from "../types";
import { getCities, getCountries, getRegions } from "../api";
import { useEffect, useState } from "react";

export const useLocationData = (
  countryId: string | undefined,
  regionId: string | undefined
) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState<null | string>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading("country");
      setRegions([]);
      setCities([]);
      await getCountries().then((data: Country[]) => setCountries(data));
      setLoading(null);
    };

    fetch();
  }, []);

  useEffect(() => {
    if (!countryId) return;
    const fetch = async () => {
      setLoading("region");
      await getRegions(countryId).then((data: Region[]) => {
        setRegions(data);
        setCities([]);
      });
      setLoading(null);
    };
    fetch();
  }, [countryId]);

  useEffect(() => {
    if (!regionId) return;
    const fetch = async () => {
      setLoading("city");
      await getCities(regionId).then((data: City[]) => setCities(data));
      setLoading(null);
    };
    fetch();
  }, [regionId]);

  return {
    countries,
    regions,
    cities,
    loading,
  };
};
