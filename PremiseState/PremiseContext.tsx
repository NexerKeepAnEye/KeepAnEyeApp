import React, { createContext, ReactNode, useContext, useReducer } from 'react';

type Premise = {
  premiseId: number;
  designation: string;
  name: string;
};

type State = {
  premise: Premise | null;
};

type Action = {
  type: 'SET_PREMISE' | 'CHANGE_PREMISE';
  payload: Premise;
};

type ContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const PremiseContext = createContext<ContextType | undefined>(undefined);

const initialState: State = { premise: null };

const premiseReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PREMISE':
    case 'CHANGE_PREMISE':
      return { premise: action.payload };
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
