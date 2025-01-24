import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { useState } from 'react';
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
import { fetchPremise } from '../Api/fetchAPI';
import logoKAE from '../assets/logoKAE.png';
import NexerLogo from '../assets/NexerLogo.png';
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

  const handleLogin = async () => {
    const data = await fetchPremise(form.apikey);
    setLoading(true);
    if (typeof data === 'number') {
      if (data === 406) {
        console.log('Errorcode:', data);
        setLoading(false);
        Alert.alert('Fel', 'Felaktig API nyckel.');
        return;
      }
      if (data === 500 || data === 504) {
        console.log('Errorcode:', data);
        setLoading(false);
        Alert.alert('Fel', 'Oväntat fel inträffade.');
        return;
      }
    } else if (Array.isArray(data)) {
      console.log(data);
      dispatch({ type: 'SET_PREMISES', payload: data });
      await StorageService.storeApiKey(form.apikey);
      console.log(form.apikey);
      setLoading(false);
      navigation.navigate('StartScreen');
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
