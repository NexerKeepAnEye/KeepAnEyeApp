export type Tooltip = {
  visible: boolean;
  value: number;
  x: number;
  y: number;
};

export type MeterData = {
  datetime: Date;
  value: Number;
  cost: Number;
  oode: String;
  premiseId: Number;
  designation: String;
  meterId: Number;
};

export type Product = {
  id: Number;
  code: String;
  unit: String;
};

export type Premise = {
  id: Number;
  designation: String;
  name: String;
  meter: Meter[];
};
export type Meter = {
  id: Number;
  name: Number;
  productId: Number;
  productCode: Number;
};

export type PostMeterData = {
  productId: Number; //Required
  resolution: String; //Required
  from: Date; //Required
  to: Date; //Required
  correctedValues: Boolean; //Optional
  premiseIds: Number[]; //Optional
  designations: String[]; //Optional
  meterIds: Number[]; //Optional
};
