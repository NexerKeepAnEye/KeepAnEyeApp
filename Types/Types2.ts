export type customer = {
  id: number;
  apikey: string;
};

export type meter = {
  id: number;
  premiseId: number;
  productId: number;
  name: string;
};

export type product = {
  id: number;
  code: string;
};

export type premise = {
  id: number;
  customerId: number;
  name: string;
  designation: string;
  meters: meter[];
};

export type meterData = {
  dateTime: string;
  value: number;
  cost: number;
  premiseId: number;
  designation: string;
  meterId: number;
  productId: number;
  resolution: string;
};
