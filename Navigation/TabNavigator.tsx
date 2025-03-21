import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { Portal, Snackbar } from 'react-native-paper';
import StorageService from '../AsyncStorage/AsyncStorage';
import AlertDialog from '../Components/AlertDialog';
import { LogoTitle } from '../Components/Header';
import { useFilterContext } from '../Context/FilterContext';
import { setInitialFilterState } from '../Context/FilterReducer';
import { usePremiseContext } from '../Context/PremiseContext';
import { useSnackbar } from '../Context/SnackbarContext';
import MeterDataScreen from '../Screens/MeterDataScreen';
import MeterScreen from '../Screens/MeterScreen';
import ReportScreen from '../Screens/ReportScreen';
import { BottomTabStyle } from '../Style/BottomTabStyle';
import { deviceHeight, deviceWidth } from '../Style/Dimensions';
import { filterStyle } from '../Style/FilterStyle';
import { RootStackParamList } from './RootStackNavigation';

export type TabParamList = {
  MeterScreen: {
    premiseId: number;
  };
  ReportScreen: { premiseId: number };
  MeterDataScreen: { meterId: number };
};

const paddingHorizontal = deviceWidth * 0.025;
const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [showAlartDialog, setShowAlartDialog] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { visible, message, hideSnackbar } = useSnackbar();
  const { state } = usePremiseContext();

  const { state: filterState } = useFilterContext();

  useEffect(() => {
    const apiKey = StorageService.getApiKey();
    if (!apiKey) {
      navigation.navigate('SignInScreen');
    }
  }, [navigation]);

  const handleLogout = () => {
    setIsVisible(true);
    setShowAlartDialog(true);
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
        detachInactiveScreens={true}
        screenOptions={() => ({
          popGesture: false,
          hardwareBackButton: {
            dismissModalOnPress: false,
            popStackOnPress: false,
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
          tabBarActiveTintColor: '#ff7f57',
          tabBarInactiveTintColor: 'grey',
          tabBarPressColor: 'transparent',
          tabBarPressOpacity: 1,
          tabBarVisible: true,
          swipeEnabled: false,
          // gestureEnabled: false,
          // headerBackButtonMenuEnabled: false,
        })}
      >
        {filterState.meter.length > 0 ? (
          <Tab.Screen
            name="MeterDataScreen"
            component={MeterDataScreen}
            options={{
              tabBarLabel: 'Mätardata',
              tabBarIcon: ({ color, focused }) => (
                <View style={[BottomTabStyle.iconContainer]}>
                  {focused ? (
                    <MaterialIcons
                      name="data-usage"
                      size={deviceHeight < 800 ? 30 : 33}
                      color={color}
                    />
                  ) : (
                    <MaterialIcons
                      name="data-usage"
                      size={deviceHeight < 800 ? 25 : 28}
                      color={color}
                    />
                  )}
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
        ) : (
          <Tab.Screen
            name="MeterScreen"
            component={MeterScreen}
            options={{
              tabBarLabel: 'Mätare',
              tabBarIcon: ({ color, focused }) => (
                <View style={BottomTabStyle.iconContainer}>
                  {focused ? (
                    <Entypo
                      name="gauge"
                      size={deviceHeight < 800 ? 30 : 30}
                      color={color}
                    />
                  ) : (
                    <Entypo
                      name="gauge"
                      size={deviceHeight < 800 ? 25 : 28}
                      color={color}
                    />
                  )}
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
        )}
        <Tab.Screen
          name="ReportScreen"
          component={ReportScreen}
          options={{
            tabBarLabel: 'Rapporter',
            tabBarIcon: ({ color, focused }) => (
              <View style={[BottomTabStyle.iconContainer]}>
                {focused ? (
                  <MaterialIcons
                    name="insert-chart"
                    size={deviceHeight < 800 ? 30 : 33}
                    color={color}
                  />
                ) : (
                  <MaterialIcons
                    name="insert-chart-outlined"
                    size={deviceHeight < 800 ? 25 : 28}
                    color={color}
                  />
                )}
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
      <View>
        <Modal
          statusBarTranslucent={true}
          animationType="fade"
          transparent={true}
          visible={showAlartDialog}
          onRequestClose={() => {
            setShowAlartDialog(!showAlartDialog);
          }}
        >
          <AlertDialog
            visible={isVisible}
            title="Logga ut"
            message="Är du säker på att du vill logga ut?"
            onConfirmText="Avbryt"
            onConfirm={async () => {
              setIsVisible(false);
              setShowAlartDialog(false);
            }}
            onCancelText="Logga ut"
            onCancel={async () => {
              await StorageService.clearApiKey();
              state.products = [];
              state.premises = [];
              state.meterData = [];
              setInitialFilterState();
              navigation.navigate('SignInScreen');
              setIsVisible(false);
              setShowAlartDialog(false);
            }}
          ></AlertDialog>
        </Modal>
      </View>
    </>
  );
}
