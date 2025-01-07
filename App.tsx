import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootStackNavigator from './Navigation/RootStackNavigation';
import { PremiseProvider } from './PremiseState/PremiseContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <PremiseProvider>
          <RootStackNavigator />
        </PremiseProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
