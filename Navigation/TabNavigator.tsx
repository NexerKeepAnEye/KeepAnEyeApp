import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Text } from 'react-native-paper';
import PremiseScreen from '../Screens/PremiseScreen';
import ReportScreen from '../Screens/ReportScreen';

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
            onPress={() => navigation.navigate('Fastighet')} //temporary
          >
            LOGGA UT temp redirect fastighet
          </Text>
        ),
      })}
    >
      <Tab.Screen
        name="Fastighet"
        component={PremiseScreen}
      />
      <Tab.Screen
        name="Rapporter"
        component={ReportScreen}
      />
    </Tab.Navigator>
  );
}
