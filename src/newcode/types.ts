export interface AddressDetails {
  streetName?: string;
  streetNumber?: string;
  neighborhood?: string;
  sublocality?: string;
  premise?: string;
  City?: string;
  County?: string;
  State?: string;
  Country?: string;
  Zip?: string;
  formatted_address?: string;
  latitude?: number;
  longitude?: number;
}

export interface OwnerDtoLocal {
  Name: string
  Email: string
  Phone: string
  Address: string
  City: number | string
  State: number
  Zip: string
  Country: string
  Note: string
}

export interface OwnerDto extends OwnerDtoLocal {
  Id: number
  Code: string
  Type: number
  Region: number
  Status: number
}

export interface states {
  StateId: number,
  CountryId: number,
  StateCode: string,
  StateName: string,
}

export interface country {
  CountryId: number,
  CountryCode: string,
  CountryName: string,
  RegionId: number,
  RegionCode: string,
  PhoneCode: number,
  CurrencyId: number,
  CurrencyCode: string,
  CurrencyName: string,
  States: states[]
}

export interface StateOption {
  value: number;
  label: string;
  code: string;
}