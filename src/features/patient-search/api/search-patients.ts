import { PatientSearchFormValues } from "../model";
import { PatientSearch } from "../types";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");
pb.autoCancellation(false);

await pb.admins.authWithPassword("admin@mail.com", "00000000");

export const searchApi = async (
  filters: PatientSearchFormValues
): Promise<PatientSearch[]> => {
  try {
    const filterParts = Object.entries(filters)
      .filter(([_, value]) => value !== "" && value !== undefined)
      .map(([key, value]) => {
        if (["lastName", "firstName", "fatherName"].includes(key)) {
          return `${key}~"${value}"`;
        }

        if (key === "birthday") {
          return `${key}="${value}"`;
        }

        if (["country", "region", "city"].includes(key)) {
          return `${key}=${value}`;
        }

        return `${key}="${value}"`;
      });

    const filterString = filterParts.join(" && ");

    const records = await pb.collection("patient").getFullList({
      filter: filterString || undefined,
    });
    const mapped: PatientSearch[] = await Promise.all(
      records.map(async (item) => {
        const cityRecord = item.city
          ? await pb
              .collection("cities")
              .getFirstListItem(`externalId=${item.city}`)
          : null;

        const regionRecord = item.region
          ? await pb
              .collection("regions")
              .getFirstListItem(`externalId=${item.region}`)
          : null;

        return {
          id: item.id,
          fullName: [item.firstName, item.fatherName, item.lastName]
            .filter(Boolean)
            .join(" "),
          gender: item.gender || "",
          birthYear: item.birthday || "",
          country: item.country || "",
          region: regionRecord ? regionRecord.name : "",
          city: cityRecord ? cityRecord.name : "",
        };
      })
    );

    return mapped;
  } catch (error) {
    console.error("Ошибка при поиске пациентов:", error);
    return [];
  }
};
