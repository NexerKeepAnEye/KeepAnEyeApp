import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Pressable } from 'react-native';
import { LogoTitle } from '../Components/Header';
import PremiseScreen from '../Screens/PremiseScreen';
import ReportScreen from '../Screens/ReportScreen';

export type TabParamList = {
  PremiseScreen: { premiseId: number };
  ReportScreen: { premiseId: number };
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
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
      <Tab.Screen
        name="PremiseScreen"
        component={PremiseScreen}
      />
      <Tab.Screen
        name="ReportScreen"
        component={ReportScreen}
      />
    </Tab.Navigator>
  );
}
