import React, { createContext, useReducer, ReactNode, useContext } from 'react';
import {
  filterReducer,
  initialState,
  FilterState,
  FilterAction,
} from './FilterReducer';

interface FilterProviderProps {
  children: ReactNode;
}

const FilterContext = createContext<{
  state: FilterState;
  dispatch: React.Dispatch<FilterAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);

export { FilterContext, FilterProvider };
