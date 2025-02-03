import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { hide, preventAutoHideAsync, setOptions } from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { fetchPremise, fetchProduct } from '../Api/fetchAPI';
import UpscaleLogo from '../assets/UpscaleLogo.png';
import StorageService from '../AsyncStorage/AsyncStorage';
import { usePremiseContext } from '../Context/PremiseContext';
import { RootStackParamList } from '../Navigation/RootStackNavigation';
import { SplashScreenStyle } from '../Style/SplashScreenStyle';

// Keep the splash screen visible while we fetch resources
preventAutoHideAsync();

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

    setAppIsReady(true);
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      // Set the animation options. This is optional.
      setOptions({
        fade: true,
      });
      hide();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      style={SplashScreenStyle.container}
      onLayout={onLayoutRootView}
    >
      <Image
        source={UpscaleLogo}
        resizeMode="center"
      />
    </View>
  );
}
