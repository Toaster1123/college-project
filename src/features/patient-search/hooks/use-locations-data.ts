import { useEffect, useState } from "react";
import { City, Country, Region } from "../types";
import { getCities, getCountries, getRegions } from "../api";

export const useLocationData = (countryId: number, regionId: number) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    console.log("countrye");
    getCountries().then((data: Country[]) => setCountries(data));
  }, []);

  useEffect(() => {
    console.log("region without id");

    if (!countryId) return;
    console.log("region", countryId);

    getRegions(countryId).then((data: Region[]) => {
      setRegions(data);
      setCities([]);
    });
  }, [countryId]);

  useEffect(() => {
    console.log("city without id");

    if (!regionId) return;
    console.log("city");

    getCities(regionId).then((data: City[]) => setCities(data));
  }, [regionId]);

  const effectiveRegions = countryId ? regions : [];
  const effectiveCities = regionId ? cities : [];

  return {
    countries,
    regions: effectiveRegions,
    cities: effectiveCities,
  };
};
