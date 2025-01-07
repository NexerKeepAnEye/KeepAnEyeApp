import * as React from 'react';
import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import logoKAE from '../assets/logoKAE.png';
import NexerLogo from '../assets/NexerLogo.png';
export default function SignInScreen() {
  const [form, setForm] = useState({ ApiKey: '' });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView keyboardShouldPersistTaps={'handled'}>
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
              style={SignIn.button}
              icon="login"
              mode="contained"
              // onPress={handleLogin}
              // disabled={loading}
            >
              Logga In
              {/* {loading ? 'Logging in...' : 'Log In'} */}
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Image
        source={NexerLogo}
        resizeMode="contain"
        style={SignIn.footerLogo}
      />
    </SafeAreaView>
  );
}

export const SignIn = StyleSheet.create({
  logo: {
    marginBottom: 30,
    width: 200,
    height: 320,
  },
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f5f7',
  },
  container: {
    width: '80%',
  },
  title: {
    fontSize: 15,
    marginBottom: 10,
  },
  input: {
    borderRadius: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#ff7043',
    width: '70%',
    alignItems: 'center',
  },
  footerLogo: {
    marginTop: 250,
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
});
