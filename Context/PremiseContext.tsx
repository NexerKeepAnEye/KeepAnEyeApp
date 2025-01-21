import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import { MeterData, Premise } from '../Types/Type';

type State = {
  premise: Premise | null;
  meterData: MeterData[];
};

type Action =
  | { type: 'SET_PREMISE'; payload: Premise }
  | { type: 'CHANGE_PREMISE'; payload: Premise }
  | { type: 'SET_METER_DATA'; payload: MeterData[] };

type ContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const PremiseContext = createContext<ContextType | undefined>(undefined);

const initialState: State = { premise: null, meterData: [] };

const premiseReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PREMISE':
    case 'CHANGE_PREMISE':
      return { premise: action.payload, meterData: state.meterData };
    case 'SET_METER_DATA':
      return { ...state, meterData: action.payload };
    default:
      return state;
  }
};

export const PremiseProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(premiseReducer, initialState);

  return (
    <PremiseContext.Provider value={{ state, dispatch }}>
      {children}
    </PremiseContext.Provider>
  );
};

export const usePremiseContext = (): ContextType => {
  const context = useContext(PremiseContext);
  if (context === undefined) {
    throw new Error('usePremiseContext must be used within a PremiseProvider');
  }
  return context;
};
