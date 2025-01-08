import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PremiseScreen from '../Screens/PremiseScreen';
import ReportScreen from '../Screens/ReportScreen';
import { BottomTabStyle } from '../Style/BottomTabStyling';

export type TabParamList = {
  PremiseScreen: { premiseId: number };
  ReportScreen: { premiseId: number };
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: BottomTabStyle.tabBar,
        tabBarLabelStyle: BottomTabStyle.tabBarText,
        tabBarActiveTintColor: '#222',
        tabBarInactiveTintColor: '#d9d9d9',
      }}
    >
      <Tab.Screen
        name="PremiseScreen"
        component={PremiseScreen}
        options={{
          tabBarLabel: 'Fastighet',
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                BottomTabStyle.iconContainer,
                focused && BottomTabStyle.selectedTab,
              ]}
            >
              <Icon
                name="home"
                color={color}
                size={30}
                style={BottomTabStyle.tabBarIcon}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ReportScreen"
        component={ReportScreen}
        options={{
          tabBarLabel: 'Rapporter',
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                BottomTabStyle.iconContainer,
                focused && BottomTabStyle.selectedTab,
              ]}
            >
              <Icon
                name="assessment"
                color={color}
                size={30}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
