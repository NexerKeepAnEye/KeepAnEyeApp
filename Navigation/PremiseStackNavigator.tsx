import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import MeterDataScreen from '../Screens/MeterDataScreen';
import PremiseScreen from '../Screens/MeterScreen';

export type PremiseStackParamList = {
  PremiseScreen: { premiseId: number };
  MeterDataScreen: { meterId: number };
};

const PremiseStack = createStackNavigator<PremiseStackParamList>();

export default function PremiseStackNavigator() {
  return (
    <PremiseStack.Navigator id={undefined}>
      <PremiseStack.Screen
        name="PremiseScreen"
        component={PremiseScreen}
        options={{ headerShown: false }}
      />
      <PremiseStack.Screen
        name="MeterDataScreen"
        component={MeterDataScreen}
        options={{ headerShown: false }}
      />
    </PremiseStack.Navigator>
  );
}
