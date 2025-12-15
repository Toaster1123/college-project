export interface Country {
  externalId: number;
  name: string;
}

export interface Region {
  externalId: number;
  name: string;
  countryExternalId: number;
}

export interface City {
  externalId: number;
  name: string;
  regionExternalId: number;
}
