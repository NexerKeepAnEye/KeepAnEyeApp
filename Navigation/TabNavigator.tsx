import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { Dimensions, Pressable, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StorageService from '../AsyncStorage/AsyncStorage';
import { LogoTitle } from '../Components/Header';
import ReportScreen from '../Screens/ReportScreen';
import { BottomTabStyle } from '../Style/BottomTabStyle';
import PremiseStackNavigator from './PremiseStackNavigator';
import { RootStackParamList } from './RootStackNavigation';

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
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogout = async () => {
    await StorageService.clearApiKey();
    navigation.navigate('SignInScreen');
  };

  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerStyle: {
          height: 120,
          backgroundColor: '#f8f8f8',
        },
        headerRight: () => (
          <Pressable onPress={handleLogout}>
            <MaterialIcons
              name="exit-to-app"
              size={30}
              color="#D32F2F"
              style={{ paddingRight: paddingHorizontal }}
            />
          </Pressable>
        ),
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
