import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { fetchPremise, fetchProduct } from '../Api/fetchAPI';
import StorageService from '../AsyncStorage/AsyncStorage';
import { usePremiseContext } from '../Context/PremiseContext';
import useFonts from '../Hooks/UseFonts';
import { RootStackParamList } from '../Navigation/RootStackNavigation';

export default function Splash() {
  const [appIsReady, setAppIsReady] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { dispatch } = usePremiseContext();

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
      }
    };

    prepareApp();
  }, []);

  const LoadFonts = async () => {
    await useFonts();
  };

  if (!appIsReady) {
    return null;
  }

  return null;
}
