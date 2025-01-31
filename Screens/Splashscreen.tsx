import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { fetchPremise, fetchProduct } from '../Api/fetchAPI';
import UpscaleLogo from '../assets/UpscaleLogo.png';
import StorageService from '../AsyncStorage/AsyncStorage';
import { usePremiseContext } from '../Context/PremiseContext';
import { RootStackParamList } from '../Navigation/RootStackNavigation';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function Splash() {
  const [appIsReady, setAppIsReady] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { dispatch } = usePremiseContext();

  useEffect(() => {
    const checkApiKey = async () => {
      const storedApiKey = await StorageService.getApiKey();
      if (storedApiKey) {
        const products = await fetchProduct(storedApiKey);
        dispatch({ type: 'SET_PRODUCT', payload: products });
        const data = await fetchPremise(storedApiKey);
        dispatch({ type: 'SET_PREMISES', payload: data });
        navigation.navigate('StartScreen');
      } else {
        navigation.navigate('SignInScreen');
      }
    };

    checkApiKey();
  }, []);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      SplashScreen.hide();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      onLayout={onLayoutRootView}
    >
      <Image
        source={UpscaleLogo}
        resizeMode="center"
      />
    </View>
  );
}
