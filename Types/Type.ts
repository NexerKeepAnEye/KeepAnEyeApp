export type Tooltip = {
  originalValue: number;
  visible: boolean;
  value: number;
  x: number;
  y: number;
};

export type MeterData = {
  DateTime: Date;
  Value: number;
  Cost: number;
  Code: string;
  PremiseId: number;
  Designation: string | null | undefined;
  MeterId: number;
};

export type Product = {
  Id: number;
  Code: string;
  Unit: string;
};

export type Premise = {
  Id: number;
  Designation: string | null | undefined;
  Name: string;
  Meters: Meter[];
};
export type Meter = {
  Id: number;
  Name: string;
  ProductId: number;
  ProductCode: string;
};

export type PostMeterData = {
  productId: number; //Required
  resolution: string; //Required
  from: Date; //Required
  to: Date; //Required
  correctedValues: boolean; //Optional
  premiseIds: number[]; //Optional
  designations: string[]; //Optional
  meterIds: number[]; //Optional
};
