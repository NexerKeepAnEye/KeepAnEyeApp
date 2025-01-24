import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import { MeterData, Premise } from '../Types/Type';

type State = {
  premises: Premise[];
  meterData: MeterData[];
  selectedPremise: Premise | null;
};

type Action =
  | { type: 'SET_PREMISES'; payload: Premise[] }
  | { type: 'SET_PREMISE'; payload: Premise }
  | { type: 'RESET_PREMISE' }
  | { type: 'SET_METER_DATA'; payload: MeterData[] };

type ContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const PremiseContext = createContext<ContextType | undefined>(undefined);

const initialState: State = {
  premises: [],
  meterData: [],
  selectedPremise: null,
};

const premiseReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PREMISES':
      console.log('reducer premises', action.payload);
      return { ...state, premises: action.payload };
    case 'SET_PREMISE':
      return { ...state, selectedPremise: action.payload };
    case 'RESET_PREMISE':
      return { ...state, selectedPremise: null };
    case 'SET_METER_DATA':
      console.log('Setting meterData:', action.payload);
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
