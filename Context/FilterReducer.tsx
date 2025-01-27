import { Meter, MeterData } from '../Types/Type';

export interface FilterState {
  meterData: MeterData[];
  filteredResults: MeterData[];
  meter: Meter[];
  year?: string;
  yearTwo?: string;
  fromDate?: Date;
  toDate?: Date;
  resolution?: string;
}

export type FilterAction =
  | { type: 'SET_METER_DATA'; payload: MeterData[] }
  | { type: 'SET_RESOLUTION'; payload: string }
  | { type: 'SET_FILTERED_RESULTS'; payload: MeterData[] }
  | { type: 'SET_METER'; payload: Meter[] }
  | { type: 'SET_YEAR'; payload: string | undefined }
  | { type: 'SET_YEAR_TWO'; payload: string | undefined }
  | { type: 'SET_FROM_DATE'; payload: Date | undefined }
  | { type: 'SET_TO_DATE'; payload: Date | undefined };

export const initialState: FilterState = {
  meterData: [],
  filteredResults: [],
  meter: [],
  year: undefined,
  yearTwo: undefined,
  fromDate: undefined,
  toDate: undefined,
  resolution: undefined,
};

export const filterReducer = (
  state: FilterState,
  action: FilterAction,
): FilterState => {
  switch (action.type) {
    case 'SET_METER_DATA':
      return { ...state, meterData: action.payload };
    case 'SET_FILTERED_RESULTS':
      return { ...state, filteredResults: action.payload };
    case 'SET_METER':
      return { ...state, meter: action.payload };
    case 'SET_YEAR':
      return { ...state, year: action.payload };
    case 'SET_YEAR_TWO':
      return { ...state, yearTwo: action.payload };
    case 'SET_FROM_DATE':
      return { ...state, fromDate: action.payload };
    case 'SET_TO_DATE':
      return { ...state, toDate: action.payload };
    case 'SET_RESOLUTION':
      return { ...state, resolution: action.payload };
    default:
      return state;
  }
};
