import { MaterialIcons } from '@expo/vector-icons';
import { NavigatorScreenParams, useNavigation } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import * as React from 'react';
import { Pressable } from 'react-native';
import StorageService from '../AsyncStorage/AsyncStorage';
import { LogoTitle } from '../Components/Header';
import PremiseScreen from '../Screens/PremiseScreen';
import ReportScreen from '../Screens/ReportScreen';
import SignInScreen from '../Screens/SignInScreen';
import Splash from '../Screens/Splashscreen';
import StartScreen from '../Screens/StartScreen';
import TabNavigator, { TabParamList } from './TabNavigator';

export type RootStackParamList = {
  SignInScreen: undefined;
  StartScreen: undefined;
  Splash: undefined;
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
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogout = async () => {
    await StorageService.clearApiKey();
    navigation.navigate('SignInScreen');
  };

  return (
    <RootStack.Navigator
      initialRouteName="Splash"
      screenOptions={() => ({
        headerRight: () => (
          <Pressable onPress={handleLogout}>
            <MaterialIcons
              name="exit-to-app"
              size={30}
              color="#D32F2F"
            />
          </Pressable>
        ),
        headerTitle: () => <LogoTitle />,
        headerTitleAlign: 'center',
      })}
    >
      <RootStack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShadowVisible: false, headerShown: false }}
      />
      <RootStack.Screen
        name="StartScreen"
        component={StartScreen}
        options={{ headerLeft: () => null, headerBackVisible: false }}
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
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="ReportScreen"
        component={ReportScreen}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
}
