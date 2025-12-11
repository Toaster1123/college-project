"use client";
import { FormTitle, PatientSearchSelect } from "@/shared";
import { FC } from "react";
import { useLocationData } from "../hooks";
import { Map } from "lucide-react";

interface Props {
  watchFields: {
    country: string | undefined;
    region: string | undefined;
    city: string | undefined;
  };
  updateForm: (name: "country" | "region" | "city", value: string) => void;
}

export const PatientSearchLocation: FC<Props> = ({
  watchFields,
  updateForm,
}) => {
  const { countries, regions, cities, loading } = useLocationData(
    watchFields.country,
    watchFields.region
  );

  return (
    <div className="">
      <FormTitle Icon={Map} label="Проживание" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PatientSearchSelect
          label="Страна"
          name="country"
          value={watchFields.country}
          onChange={(val) => updateForm("country", val)}
          options={countries.map((r) => ({
            value: String(r.externalId),
            label: r.name,
          }))}
          isLoading={loading === "country"}
        />
        <PatientSearchSelect
          label="Регион/обл"
          name="region"
          value={watchFields.region}
          onChange={(val) => updateForm("region", val)}
          options={regions.map((r) => ({
            value: String(r.externalId),
            label: r.name,
          }))}
          isLoading={loading === "region"}
          disabled={regions.length === 0}
        />
        <PatientSearchSelect
          label="Город"
          name="city"
          value={watchFields.city}
          onChange={(val) => updateForm("city", val)}
          options={cities.map((r) => ({
            value: String(r.externalId),
            label: r.name,
          }))}
          isLoading={loading === "city"}
          disabled={cities.length === 0}
        />
      </div>
    </div>
  );
};
