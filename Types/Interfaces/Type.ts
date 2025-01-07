export type Tooltip = {
  originalValue: number;
  visible: boolean;
  value: number;
  x: number;
  y: number;
};

export type MeterData = {
  DateTime: string;
  Value: number;
  Cost: number;
  Code: string;
  PremiseId: number;
  Designation?: string | null;
  MeterId: number;
};

export type Product = {
  id: number;
  code: string;
  unit: string;
};

export type Premise = {
  id: number;
  designation: string;
  name: string;
  meter: Meter[];
};
export type Meter = {
  id: number;
  name: number;
  productId: number;
  productCode: number;
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
