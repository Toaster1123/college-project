import { faker } from "@faker-js/faker";
import PocketBase from "pocketbase";

import {
  maleFirstNames,
  maleLastNames,
  maleFatherNames,
  femaleFirstNames,
  femaleLastNames,
  femaleFatherNames,
  russianSentences,
} from "./name-contant.js";

function randomDate(startYear, endYear) {
  const start = new Date(startYear, 0, 1).getTime();
  const end = new Date(endYear, 11, 31).getTime();
  const date = new Date(start + Math.random() * (end - start));
  return date.toISOString().split("T")[0];
}

const pb = new PocketBase("http://127.0.0.1:8090");
pb.autoCancellation(false);
const stageOptions = ["I", "II", "III", "IV"];
const mutationOptions = ["Мутация А", "Мутация B", "Мутация C"];
async function addPatientApi(data) {
  try {
    const record = await pb.collection("patient").create({
      firstName: data.firstName,
      lastName: data.lastName,
      fatherName: data.fatherName,

      birthday: data.birthday,
      gender: data.gender,

      city: data.city,
      country: data.country,
      region: data.region,

      stage: data.stage,
      mutation: data.mutation,
      dateBlood: data.bloodDate,
      crio: data.crio,
      dateCrio: data.dateCrio,

      doctorConsultation: data.doctorConsultation,
      doctorConsultationDate: data.doctorConsultationDate,
      geneticistConsultation: data.geneticistConsultation,
      geneticistConsultationDate: data.geneticistConsultationDate,
      recommendations: data.recommendations,
    });
    return record;
  } catch (err) {
    console.error("Ошибка при добавлении пациента:", err);
    throw new Error("Не удалось добавить пациента");
  }
}

async function generateRandomCity() {
  const cities = await pb.collection("cities").getFullList({ sort: "name" });

  if (!cities.length) {
    throw new Error("Нет городов в БД");
  }

  const city = cities[Math.floor(Math.random() * cities.length)];

  const region = await pb
    .collection("regions")
    .getFirstListItem(`externalId=${city.regionExternalId}`);

  const country = await pb
    .collection("countries")
    .getFirstListItem(`externalId=${region.countryExternalId}`);

  return {
    city: city.externalId,
    region: region.externalId,
    country: country.externalId,

    cityName: city.name,
    regionName: region.name,
    countryName: country.name,
  };
}

async function generateMockPatient() {
  const location = await generateRandomCity();

  console.log(
    location.city,
    location.region,
    location.country,
    location.cityName,
    location.regionName,
    location.countryName
  );
  const gender = faker.helpers.arrayElement(["муж", "жен"]);
  return {
    firstName:
      gender === "муж"
        ? faker.helpers.arrayElement(maleFirstNames)
        : faker.helpers.arrayElement(femaleFirstNames),
    lastName:
      gender === "муж"
        ? faker.helpers.arrayElement(maleLastNames)
        : faker.helpers.arrayElement(femaleLastNames),
    fatherName:
      gender === "муж"
        ? faker.helpers.arrayElement(maleFatherNames)
        : faker.helpers.arrayElement(femaleFatherNames),

    birthday: randomDate(2010, 2025),
    gender,

    city: location.city,

    region: location.region,

    country: location.country,

    stage: faker.helpers.arrayElement(stageOptions),
    mutation: faker.helpers.arrayElement(mutationOptions),
    bloodDate: randomDate(2010, 2025),
    crio: `CRIO-${faker.number.int({ min: 100, max: 999 })}`,
    dateCrio: randomDate(2010, 2025),

    doctorConsultation: faker.helpers.arrayElement(russianSentences),
    doctorConsultationDate: randomDate(2020, 2025),

    geneticistConsultationDate: randomDate(2020, 2025),
    geneticistConsultation: faker.helpers.arrayElement(russianSentences),

    recommendations: faker.helpers.arrayElement(russianSentences),
  };
}

async function main() {
  await pb.admins.authWithPassword("admin@mail.com", "00000000");

  const numberOfPatients = 120;
  const addedPatients = [];

  for (let i = 0; i < numberOfPatients; i++) {
    const patient = await generateMockPatient();
    await addPatientApi(patient);
    addedPatients.push(patient);
    console.log(
      `Пациент № ${i + 1} добавлен: ${patient.firstName} ${patient.lastName}`
    );
  }

  console.log(`Всего добавлено ${addedPatients.length} пациентов!`);
}

main().catch(console.error);
