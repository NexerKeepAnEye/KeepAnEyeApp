import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { hide, preventAutoHideAsync, setOptions } from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { fetchPremise, fetchProduct } from '../Api/fetchAPI';
import StorageService from '../AsyncStorage/AsyncStorage';
import { usePremiseContext } from '../Context/PremiseContext';
import { RootStackParamList } from '../Navigation/RootStackNavigation';

// Keep the splash screen visible while we fetch resources
preventAutoHideAsync();

export default function Splash() {
  const [, setAppIsReady] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { dispatch } = usePremiseContext();
  setOptions({
    fade: true,
  });

  useEffect(() => {
    const checkApiKey = async () => {
      const storedApiKey = await StorageService.getApiKey();
      if (storedApiKey) {
        const products = await fetchProduct(storedApiKey);
        dispatch({ type: 'SET_PRODUCT', payload: products });
        const data = await fetchPremise(storedApiKey);
        dispatch({ type: 'SET_PREMISES', payload: data });
        navigation.navigate('StartScreen');
        hide();
      } else {
        navigation.navigate('SignInScreen');
        hide();
      }
    };

    checkApiKey();

    setAppIsReady(true);
  }, []);

  // const onLayoutRootView = useCallback(() => {
  //   if (appIsReady) {
  //     // This tells the splash screen to hide immediately! If we call this after
  //     // `setAppIsReady`, then we may see a blank screen while the app is
  //     // loading its initial state and rendering its first pixels. So instead,
  //     // we hide the splash screen once we know the root view has already
  //     // performed layout.
  //     // Set the animation options. This is optional.
  //     // hide();
  //   }
  // }, [appIsReady]);

  // if (!appIsReady) {
  //   return null;
  // }

  return null;
  //   <View
  //     style={SplashScreenStyle.container}
  //     onLayout={onLayoutRootView}
  //   >
  //     <Image
  //       source={UpscaleLogo}
  //       resizeMode="center"
  //       style={{ width: 200, height: 200 }}
  //     />
  //   </View>
}
