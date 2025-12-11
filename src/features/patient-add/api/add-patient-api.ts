// features/patient/api/addPatient.ts
import PocketBase from "pocketbase";
import { PatientAddFormValues } from "../model";

const pb = new PocketBase("http://127.0.0.1:8090");
pb.autoCancellation(false);

export const addPatientApi = async (data: PatientAddFormValues) => {
  try {
    const record = await pb.collection("patient").create({
      firstName: data.firstName,
      lastName: data.lastName,
      fatherName: data.fatherName,
      birthday: data.birthDate,
      sex: data.gender,
      city: data.city,
      country: data.country,
      region: data.region,
      seek: data.seek,
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
};
