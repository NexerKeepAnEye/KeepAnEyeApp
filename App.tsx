import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FilterContext } from './Context/FilterContext';
import { initialState } from './Context/FilterReducer';
import { PremiseProvider } from './Context/PremiseContext';
import RootStackNavigator from './Navigation/RootStackNavigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <PremiseProvider>
        <NavigationContainer>
          <FilterContext.Provider
            value={{ state: initialState, dispatch: () => null }}
          >
            <RootStackNavigator />
          </FilterContext.Provider>
        </NavigationContainer>
      </PremiseProvider>
    </SafeAreaProvider>
  );
}
