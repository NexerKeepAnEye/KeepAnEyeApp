import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import {
//   NavigationProp,
//   useNavigation,
//   useRoute,
// } from '@react-navigation/native';
import * as React from 'react';
import { Dimensions, Pressable, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LogoTitle } from '../Components/Header';
import ReportScreen from '../Screens/ReportScreen';
import { BottomTabStyle } from '../Style/BottomTabStyle';
import PremiseStackNavigator from './PremiseStackNavigator';

export type TabParamList = {
  PremiseStackNavigator: { premiseId: number };
  ReportScreen: { premiseId: number };
  MeterDataScreen: { meterId: number };
  PremiseScreen: { premiseId: number };
};

const { width } = Dimensions.get('window');
const paddingHorizontal = width * 0.025;
const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  // const { state } = usePremiseContext();
  // const navigation = useNavigation<NavigationProp<TabParamList>>();
  // const route = useRoute();
  // const id = state.premise?.Id ?? 0;
  // console.log(state);
  return (
    <Tab.Navigator
      // screenOptions={({ navigation }) => ({
      screenOptions={() => ({
        headerStyle: {
          height: 120,
          backgroundColor: '#f8f8f8',
        },
        headerRight: () => (
          <Pressable onPress={() => console.log('navigating')}>
            <MaterialIcons
              name="exit-to-app"
              size={30}
              color="#D32F2F"
              style={{ paddingRight: paddingHorizontal }}
            />
          </Pressable>
        ),
        // headerLeft: () => (
        //   <Pressable onPress={handleGoBack}>
        //     <MaterialIcons
        //       name="arrow-back"
        //       size={30}
        //       color="#000"
        //       style={{ paddingLeft: paddingHorizontal }}
        //     />
        //   </Pressable>
        // ),
        headerTitle: () => <LogoTitle />,
        headerTitleAlign: 'center',
        tabBarStyle: BottomTabStyle.tabBar,
        tabBarLabelStyle: BottomTabStyle.tabBarText,
        tabBarActiveTintColor: '#222',
        tabBarInactiveTintColor: '#d9d9d9',
      })}
    >
      <Tab.Screen
        name="PremiseStackNavigator"
        component={PremiseStackNavigator}
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
