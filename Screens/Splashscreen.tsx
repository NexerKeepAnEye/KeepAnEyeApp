import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';
import { hide, preventAutoHideAsync, setOptions } from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import { fetchPremise, fetchProduct } from '../Api/fetchAPI';
import StorageService from '../AsyncStorage/AsyncStorage';
import { usePremiseContext } from '../Context/PremiseContext';
import useFonts from '../Hooks/UseFonts';
import { RootStackParamList } from '../Navigation/RootStackNavigation';

// Keep the splash screen visible while we fetch resources
preventAutoHideAsync();

export default function Splash() {
  const [appIsReady, setAppIsReady] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { dispatch } = usePremiseContext();
  setOptions({
    fade: true,
  });

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await LoadFonts();
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
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        hide();
      }
    };

    prepareApp();
  }, []);

  const LoadFonts = async () => {
    await useFonts();
  };

  if (!appIsReady) {
    return <AppLoading />;
  }

  return null;
}
