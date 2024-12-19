import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Text } from 'react-native-paper';
import ReportScreen from '../Screens/ReportScreen';
import StartScreen from '../Screens/StartScreen';

export type TabParamList = {
  Fastighet: undefined;
  Rapporter: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <Text
            style={{ marginRight: 16 }}
            onPress={() => navigation.navigate('Fastighet')}
          >
            Navigate
          </Text>
        ),
      })}
    >
      <Tab.Screen
        name="Fastighet"
        component={StartScreen}
      />
      <Tab.Screen
        name="Rapporter"
        component={ReportScreen}
      />
    </Tab.Navigator>
  );
}
