import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import { customer, meterData, premise } from '../Types/Types2';

type State = {
  customer: customer | null;
  premises: premise[];
  meterData: meterData[];
  selectedPremise: premise | null;
};

type Action =
  | { type: 'SET_CUSTOMER'; payload: customer & { premises: premise[] } }
  | { type: 'RESET_CUSTOMER' }
  | { type: 'SET_PREMISES'; payload: premise[] }
  | { type: 'SET_PREMISE'; payload: premise }
  | { type: 'RESET_PREMISE' }
  | { type: 'SET_METER_DATA'; payload: meterData[] };

type ContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const PremiseContext = createContext<ContextType | undefined>(undefined);

const initialState: State = {
  customer: null,
  premises: [],
  meterData: [],
  selectedPremise: null,
};

const premiseReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_CUSTOMER':
      return {
        ...state,
        customer: action.payload,
        premises: action.payload.premises,
      };
    case 'RESET_CUSTOMER':
      return {
        ...state,
        customer: null,
        premises: [],
        selectedPremise: null,
        meterData: [],
      };
    case 'SET_PREMISES':
      return { ...state, premises: action.payload };
    case 'SET_PREMISE':
      return { ...state, selectedPremise: action.payload };
    case 'RESET_PREMISE':
      return { ...state, selectedPremise: null };
    case 'SET_METER_DATA':
      console.log('Setting meterData:', action.payload); // Add this line to debug
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
