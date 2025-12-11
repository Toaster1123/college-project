import PocketBase from "pocketbase";
import { City, Country, Region } from "../types";

const pb = new PocketBase("http://127.0.0.1:8090");
pb.autoCancellation(false);

export const getCountries = async (): Promise<Country[]> => {
  try {
    const data = await pb.collection("countries").getFullList<Country>();
    console.log("datadata", data);
    return data;
  } catch (err) {
    console.error("Ошибка при получении стран:", err);
    return [];
  }
};

export const getRegions = async (
  countryExternalId: string
): Promise<Region[]> => {
  if (!countryExternalId) return [];
  try {
    return await pb.collection("regions").getFullList<Region>({
      filter: `countryExternalId=${countryExternalId}`,
    });
  } catch (err) {
    console.error("Ошибка при получении регионов:", err);
    return [];
  }
};

export const getCities = async (regionExternalId: string): Promise<City[]> => {
  if (!regionExternalId) return [];
  try {
    return await pb
      .collection("cities")
      .getFullList<City>({ filter: `regionExternalId=${regionExternalId}` });
  } catch (err) {
    console.error("Ошибка при получении городов:", err);
    return [];
  }
};
