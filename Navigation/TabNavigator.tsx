import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { useEffect } from 'react';
import {
  Alert,
  Dimensions,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Portal, Snackbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StorageService from '../AsyncStorage/AsyncStorage';
import { LogoTitle } from '../Components/Header';
import { usePremiseContext } from '../Context/PremiseContext';
import { useSnackbar } from '../Context/SnackbarContext';
import ReportScreen from '../Screens/ReportScreen';
import { BottomTabStyle } from '../Style/BottomTabStyle';
import { filterStyle } from '../Style/FilterStyle';
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
  const { visible, message, hideSnackbar } = useSnackbar();
  const { state } = usePremiseContext();

  useEffect(() => {
    const apiKey = StorageService.getApiKey();
    if (!apiKey) {
      navigation.navigate('SignInScreen');
    }
  }, [navigation]);

  const handleLogout = async () => {
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
  };

  return (
    <>
      <Portal>
        <Snackbar
          style={filterStyle.snackbar}
          visible={visible}
          onDismiss={hideSnackbar}
          duration={Snackbar.DURATION_SHORT}
          action={{
            label: 'Uppfattat',
            onPress: hideSnackbar,
            textColor: 'white',
          }}
          elevation={0}
        >
          <Text style={filterStyle.snackBarText}>{message}</Text>
        </Snackbar>
      </Portal>

      <Tab.Navigator
        id={undefined}
        screenOptions={() => ({
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
          tabBarInactiveTintColor: 'grey',
          tabBarPressColor: 'transparent',
          tabBarPressOpacity: 1,
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
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                activeOpacity={1}
                delayLongPress={undefined}
              />
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
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                activeOpacity={1}
                delayLongPress={undefined}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
