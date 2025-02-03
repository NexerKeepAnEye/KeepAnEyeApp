import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { MD2Colors, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchPremise, fetchProduct } from '../Api/fetchAPI';
import NexerLogo from '../assets/NexerLogo.png';
import logoKAE from '../assets/UpscaleLogo.png';
import StorageService from '../AsyncStorage/AsyncStorage';
import { usePremiseContext } from '../Context/PremiseContext';
import { RootStackParamList } from '../Navigation/RootStackNavigation';
import { SignIn } from '../Style/SignInStyle';

export default function SignInScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { dispatch } = usePremiseContext();
  const [form, setForm] = useState({ apikey: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkApiKey = async () => {
      const storedApiKey = await StorageService.getApiKey();
      if (storedApiKey) {
        const products = await fetchProduct(storedApiKey);
        dispatch({ type: 'SET_PRODUCT', payload: products });
        const data = await fetchPremise(storedApiKey);
        dispatch({ type: 'SET_PREMISES', payload: data });
        navigation.navigate('StartScreen');
      }
    };

    checkApiKey();
  }, []);

  useEffect(() => {
    const onBackPress = () => {
      Alert.alert(
        '',
        'Vill du stänga av appen?',
        [
          {
            text: 'Nej',
            onPress: () => {},
            // style: 'cancel',
          },
          { text: 'Ja', onPress: () => BackHandler.exitApp() },
        ],
        { cancelable: false },
      );

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );

    return () => backHandler.remove();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const data = await fetchPremise(form.apikey);
      if (Array.isArray(data)) {
        const products = await fetchProduct(form.apikey);
        dispatch({ type: 'SET_PRODUCT', payload: products });
        dispatch({ type: 'SET_PREMISES', payload: data });
        await StorageService.storeApiKey(form.apikey);
        navigation.navigate('StartScreen');
      }
    } catch (error) {
      console.log('Error:', error);
      setLoading(false);
      if (error instanceof Error) {
        if (error.message.includes('status: 406')) {
          Alert.alert('Fel', 'Felaktig API nyckel.');
        } else if (
          error.message.includes('status: 500') ||
          error.message.includes('status: 504')
        ) {
          Alert.alert('Fel', 'Oväntat fel inträffade.');
        } else {
          Alert.alert('Fel', 'Ett fel inträffade.');
        }
      } else {
        Alert.alert('Fel', 'Ett okänt fel inträffade.');
      }
    }
  };

  return (
    <SafeAreaView style={SignIn.SafeAreaContainer}>
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={SignIn.root}>
            <Image
              source={logoKAE}
              resizeMode="contain"
              style={SignIn.logo}
            />
            <View style={SignIn.container}>
              <Text style={SignIn.title}>Ange Api-Nyckel:</Text>
              <TextInput
                style={SignIn.input}
                mode="outlined"
                label="API-nyckel"
                value={form.apikey}
                onChangeText={(e) => setForm({ ...form, apikey: e })}
              />
            </View>
            <TouchableOpacity
              style={loading ? SignIn.buttonDisabled : SignIn.button}
              // mode="contained"
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Text style={SignIn.buttonText}>Loggar In...</Text>
                  <ActivityIndicator
                    animating={true}
                    color={MD2Colors.white}
                    size="large"
                    style={{ paddingLeft: 19 }}
                  />
                </>
              ) : (
                <Text style={SignIn.buttonText}>Logga In</Text>
              )}{' '}
            </TouchableOpacity>
          </View>
          <Image
            source={NexerLogo}
            resizeMode="contain"
            style={SignIn.footerLogo}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}
