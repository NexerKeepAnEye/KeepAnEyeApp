import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import PremiseScreen from '../Screens/PremiseScreen'; // Import PremiseScreen
import StartScreen from '../Screens/StartScreen';
import TabNavigator, { TabParamList } from './TabNavigator';

export type RootStackParamList = {
  GameScreen: { nrOfPlayers: number } & NavigatorScreenParams<TabParamList>;
  StartScreen: undefined;
  SplashScreen: undefined;
  PremiseScreen: { premiseId: number };
  Fastighet: undefined;
  tabs: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <RootStack.Navigator initialRouteName="StartScreen">
      <RootStack.Screen
        name="StartScreen"
        component={StartScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="PremiseScreen"
        component={PremiseScreen}
      />
    </RootStack.Navigator>
  );
}
