import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import 'react-native-gesture-handler';
// import { useReducer } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FilterProvider } from './Context/FilterContext';
// import { filterReducer, initialState } from './Context/FilterReducer';
import { PremiseProvider } from './Context/PremiseContext';
import { SnackbarProvider } from './Context/SnackbarContext';
import RootStackNavigator from './Navigation/RootStackNavigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <SnackbarProvider>
          <PremiseProvider>
            <FilterProvider>
              <NavigationContainer>
                <RootStackNavigator />
              </NavigationContainer>
            </FilterProvider>
          </PremiseProvider>
        </SnackbarProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
