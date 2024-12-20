import React, { createContext, ReactNode, useContext, useReducer } from 'react';

type State = {
  premiseId: number;
};

type Action = {
  type: 'SET_PREMISE_ID' | 'CHANGE_PREMISE_ID';
  payload: number;
};

type ContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const PremiseContext = createContext<ContextType | undefined>(undefined);

const initialState: State = { premiseId: 0 };

const premiseReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PREMISE_ID':
    case 'CHANGE_PREMISE_ID':
      return { premiseId: action.payload };
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
