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
import { fetchAPI } from '../Api/fetchAPI';
import logoKAE from '../assets/logoKAE.png';
import NexerLogo from '../assets/NexerLogo.png';
import { RootStackParamList } from '../Navigation/RootStackNavigation';
import { usePremiseContext } from '../PremiseState/PremiseContext';
import { SignIn } from '../Style/SignInStyle';

export default function SignInScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { state } = usePremiseContext();
  const [form, setForm] = useState({ ApiKey: '' });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      const ok = await fetchAPI('abc');
      setLoading(true);
      if (ok === 200) {
        navigation.navigate('StartScreen');
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } else {
        Alert.alert('Fel', 'Felaktig API nyckel.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch customers');
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
                value={form.ApiKey}
                onChangeText={(e) => setForm({ ...form, ApiKey: e })}
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
