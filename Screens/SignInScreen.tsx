import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
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
              <Text style={SignIn.title}>Skiv in din Api-Nyckel:</Text>
              <TextInput
                style={SignIn.input}
                mode="outlined"
                label="API-Key"
                value={form.apikey}
                onChangeText={(e) => setForm({ ...form, apikey: e })}
              />
            </View>
            <Button
              style={loading ? SignIn.buttonDisabled : SignIn.button}
              icon="login"
              mode="contained"
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? 'Loggar in...' : 'Logga in'}
            </Button>
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
