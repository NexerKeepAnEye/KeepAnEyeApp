import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import SetMockedMeterData from './Components/FetchMeterData';
// import FetchMeterData from './Components/FetchMeterData';
import RootStackNavigator from './Navigation/RootStackNavigation';
import { FilterContext } from './PremiseState/FilterContext';
import { initialState } from './PremiseState/FilterReducer';
import { PremiseProvider } from './PremiseState/PremiseContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <PremiseProvider>
          <FilterContext.Provider
            value={{ state: initialState, dispatch: () => null }}
          >
            <RootStackNavigator />
          </FilterContext.Provider>
        </PremiseProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
