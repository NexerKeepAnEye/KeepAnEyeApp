import { NavigatorScreenParams, useNavigation } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import StorageService from '../AsyncStorage/AsyncStorage';
import AlertDialog from '../Components/AlertDialog';
import { LogoTitle } from '../Components/Header';
import { setInitialFilterState } from '../Context/FilterReducer';
import { usePremiseContext } from '../Context/PremiseContext';
import PremisesScreen from '../Screens/PremisesScreen';
import SignInScreen from '../Screens/SignInScreen';
import Splash from '../Screens/Splashscreen';
import TabNavigator, { TabParamList } from './TabNavigator';

export type RootStackParamList = {
  SignInScreen: undefined;
  PremisesScreen: {
    navigation: NativeStackNavigationProp<TabParamList>;
  };
  Splash: undefined;
  tabs: NavigatorScreenParams<TabParamList>;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  const [showAlartDialog, setShowAlartDialog] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  // const [inputMessage, setInputMessage] = useState('');
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { state } = usePremiseContext();
  const handleLogout = () => {
    setIsVisible(true);
    setShowAlartDialog(true);
  };

  useEffect(() => {
    const apiKey = StorageService.getApiKey();
    if (!apiKey) {
      navigation.navigate('SignInScreen');
    }
  }, [navigation]);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('state', () => {
  //     const currentRoute = navigation.getCurrentRoute();
  //     console.log('Current screen:', currentRoute?.name);
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  return (
    <>
      <RootStack.Navigator
        id={undefined}
        // screenListeners={() => ({
        //   beforeRemove: (e) => {
        //     e.preventDefault();
        //   },
        // })}
        initialRouteName="Splash"
        screenOptions={() => ({
          popGesture: false,
          hardwareBackButton: {
            dismissModalOnPress: false,
            popStackOnPress: false,
          },
          headerRight: () => (
            <TouchableOpacity onPressOut={handleLogout}>
              <View>
                <MaterialIcons
                  name="exit-to-app"
                  size={30}
                  color="#D32F2F"
                />
              </View>
            </TouchableOpacity>
          ),
          headerTitle: () => <LogoTitle />,
          headerTitleAlign: 'center',
          gesturesEnabled: false,
        })}
      >
        <RootStack.Screen
          name="Splash"
          component={Splash}
          options={{
            headerShadowVisible: false,
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <RootStack.Screen
          name="PremisesScreen"
          component={PremisesScreen}
          options={{
            headerLeft: () => null,
            headerBackVisible: false,
            gestureEnabled: false,
          }}
        />
        <RootStack.Screen
          name="SignInScreen"
          component={SignInScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <RootStack.Screen
          name="tabs"
          component={TabNavigator}
          options={{ headerShown: false, gestureEnabled: false }}
        />
      </RootStack.Navigator>
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
          >
            {/* <Text>Extra innehåll här</Text> */}
          </AlertDialog>
        </Modal>
      </View>
    </>
  );
}
