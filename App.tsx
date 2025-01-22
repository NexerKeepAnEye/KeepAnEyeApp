import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import SetMockedMeterData from './Components/FetchMeterData';
// import FetchMeterData from './Components/FetchMeterData';
import RootStackNavigator from './Navigation/RootStackNavigation';
import { PremiseProvider } from './PremiseState/PremiseContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <PremiseProvider>
        <NavigationContainer>
          <RootStackNavigator />
        </NavigationContainer>
      </PremiseProvider>
    </SafeAreaProvider>
  );
}
