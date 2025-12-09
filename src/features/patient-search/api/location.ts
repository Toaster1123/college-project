import PocketBase from "pocketbase";
import { City, Country, Region } from "../types";

const pb = new PocketBase("http://127.0.0.1:8090");

export const getCountries = async (): Promise<Country[]> => {
  try {
    return await pb.collection("countries").getFullList<Country>();
  } catch (err) {
    console.error("Ошибка при получении стран:", err);
    return [];
  }
};

export const getRegions = async (
  countryExternalId: number
): Promise<Region[]> => {
  if (!countryExternalId) return [];
  try {
    return await pb
      .collection("regions")
      .getFullList<Region>({
        filter: `externalCountryId=${countryExternalId}`,
      });
  } catch (err) {
    console.error("Ошибка при получении регионов:", err);
    return [];
  }
};

export const getCities = async (regionExternalId: number): Promise<City[]> => {
  if (!regionExternalId) return [];
  try {
    return await pb
      .collection("cities")
      .getFullList<City>({ filter: `externalRegionId=${regionExternalId}` });
  } catch (err) {
    console.error("Ошибка при получении городов:", err);
    return [];
  }
};
