import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import PremiseScreen from '../Screens/PremiseScreen';
import ReportScreen from '../Screens/ReportScreen';
import { BottomTabStyle } from '../Style/BottomTabStyling';
import { Pressable, View } from 'react-native';
import { LogoTitle } from '../Components/Header';
import { Icon } from 'react-native-paper';

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
