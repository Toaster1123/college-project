export interface Country {
  externalId: number;
  name: string;
}

export interface Region {
  externalId: number;
  name: string;
  externalCountryId: number;
}

export interface City {
  externalId: number;
  name: string;
  externalRegionId: number;
}
