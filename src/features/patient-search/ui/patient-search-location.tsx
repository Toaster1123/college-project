import { FC } from "react";
import { PatientSearchSelect } from "./patient-search-selector";
import { useLocationData } from "../hooks";

interface Props {
  watchFields: {
    country: string | "";
    region: string | "";
    city: string | "";
  };
  updateForm: (name: "country" | "region" | "city", value: string) => void;
}

export const PatientSearchLocation: FC<Props> = ({
  watchFields,
  updateForm,
}) => {
  const { countries, regions, cities } = useLocationData(
    watchFields.country,
    watchFields.region
  );

  const isCountriesLoading = countries.length === 0;

  const isRegionsLoading = !!watchFields.country && regions.length === 0;

  const isCitiesLoading = !!watchFields.region && cities.length === 0;

  return (
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
        isLoading={isCountriesLoading}
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
        isLoading={isRegionsLoading}
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
        isLoading={isCitiesLoading}
      />
    </div>
  );
};
