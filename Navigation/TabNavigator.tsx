import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import PremiseScreen from '../Screens/PremiseScreen';
import ReportScreen from '../Screens/ReportScreen';

export type TabParamList = {
  PremiseScreen: { premiseId: number };
  Rapporter: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="PremiseScreen"
        component={PremiseScreen}
      />
      <Tab.Screen
        name="Rapporter"
        component={ReportScreen}
      />
    </Tab.Navigator>
  );
}
