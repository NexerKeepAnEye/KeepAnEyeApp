import { MaterialIcons } from '@expo/vector-icons';
import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Pressable } from 'react-native';
import { LogoTitle } from '../Components/Header';
// import MeterDataScreen from '../Screens/MeterDataScreen';
import PremiseScreen from '../Screens/PremiseScreen';
import ReportScreen from '../Screens/ReportScreen';
import SignInScreen from '../Screens/SignInScreen';
import StartScreen from '../Screens/StartScreen';
import TabNavigator, { TabParamList } from './TabNavigator';

export type RootStackParamList = {
  SignInScreen: undefined;
  StartScreen: undefined;
  SplashScreen: undefined;
  PremiseScreen: {
    navigation: NavigatorScreenParams<TabParamList>;
    premiseId: number;
  };
  ReportScreen: { premiseId: number };
  MeterDataScreen: { meterId: number };
  tabs: NavigatorScreenParams<TabParamList>;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <RootStack.Navigator
      initialRouteName="StartScreen"
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <Pressable onPress={() => console.log('navigating')}>
            <MaterialIcons
              name="exit-to-app"
              size={30}
              color="#D32F2F"
            />
          </Pressable>
        ),
        headerLeft: () => (
          <Pressable onPress={() => navigation.goBack()}>
            <MaterialIcons
              name="arrow-back"
              size={30}
              color="#000"
            />
          </Pressable>
        ),
        headerTitle: () => <LogoTitle />,
        headerTitleAlign: 'center',
      })}
    >
      <RootStack.Screen
        name="StartScreen"
        component={StartScreen}
        options={{ headerShown: true }}
      />
      <RootStack.Screen
        name="SignInScreen"
        component={SignInScreen}
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
        options={{ headerShown: true }}
      />
      <RootStack.Screen
        name="ReportScreen"
        component={ReportScreen}
        options={{ headerShown: true }}
      />
      {/* <RootStack.Screen
        name="MeterDataScreen"
        component={MeterDataScreen}
        options={{ headerShown: true }}
      /> */}
    </RootStack.Navigator>
  );
}
