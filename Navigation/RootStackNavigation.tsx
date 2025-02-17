import { NavigatorScreenParams, useNavigation } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import * as React from 'react';
import { useCallback, useEffect } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import StorageService from '../AsyncStorage/AsyncStorage';
import { LogoTitle } from '../Components/Header';
import { usePremiseContext } from '../Context/PremiseContext';
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
  const { state } = usePremiseContext();
  const handleLogout = useCallback(async () => {
    Alert.alert(
      '',
      'Är du säker på att du vill logga ut?',
      [
        {
          text: 'Nej',
          onPress: () => {},
        },
        {
          text: 'Ja',
          onPress: async () => {
            await StorageService.clearApiKey();
            state.products = [];
            state.premises = [];
            state.meterData = [];
            navigation.navigate('SignInScreen');
          },
        },
      ],
      { cancelable: false },
    );
  }, [navigation, state]);

  useEffect(() => {
    const apiKey = StorageService.getApiKey();
    if (!apiKey) {
      navigation.navigate('SignInScreen');
    }
  }, [navigation]);

  return (
    <RootStack.Navigator
      initialRouteName="Splash"
      screenOptions={() => ({
        headerRight: () => (
          <TouchableOpacity onPressOut={handleLogout}>
            <View>
              <MaterialIcons
                name="exit-to-app"
                size={30}
                color="#D32F2F"
              />
            </View>
          </TouchableOpacity>
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
