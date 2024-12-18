export interface Tooltip {
  visible: boolean;
  value: number;
  x: number;
  y: number;
}

export interface MeterData {
  datetime: Date;
  value: number;
  cost: number;
  oode: string;
  premiseId: number;
  designation: string;
  meterId: number;
}
