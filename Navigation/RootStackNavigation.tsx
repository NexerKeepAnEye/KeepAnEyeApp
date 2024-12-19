import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import TabNavigator, { TabParamList } from './TabNavigator';

export type RootStackParamList = {
  GameScreen: { nrOfPlayers: number } & NavigatorScreenParams<TabParamList>;
  StartScreen: undefined;
  SplashScreen: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <RootStack.Navigator initialRouteName="SplashScreen">
      <RootStack.Screen
        name="StartScreen"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
}
