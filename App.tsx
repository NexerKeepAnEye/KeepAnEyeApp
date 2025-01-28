import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FilterContext } from './Context/FilterContext';
import { initialState } from './Context/FilterReducer';
import { PremiseProvider } from './Context/PremiseContext';
import { SnackbarProvider } from './Context/SnackbarContext';
import RootStackNavigator from './Navigation/RootStackNavigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <SnackbarProvider>
          <PremiseProvider>
            <NavigationContainer>
              <FilterContext.Provider
                value={{ state: initialState, dispatch: () => null }}
              >
                <RootStackNavigator />
              </FilterContext.Provider>
            </NavigationContainer>
          </PremiseProvider>
        </SnackbarProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
