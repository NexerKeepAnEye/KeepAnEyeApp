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
import logoKAE from '../assets/logoKAE.png';
import NexerLogo from '../assets/NexerLogo.png';
import data from '../MockedData/testdb.json';
import { RootStackParamList } from '../Navigation/RootStackNavigation';
import { usePremiseContext } from '../PremiseState/PremiseContext';
import { SignIn } from '../Style/SignInStyle';
import { meter, meterData, premise } from '../Types/Types2';

export default function SignInScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { dispatch } = usePremiseContext();
  const [form, setForm] = useState({ ApiKey: '' });
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    const customer = data.Customer.find((c) => c.apikey === form.ApiKey);
    if (customer) {
      const customerPremises: premise[] = data.Premise.filter(
        (premise) => premise.customerId === customer.id,
      ).map((premise) => ({
        ...premise,
        meters: data.Meter.filter(
          (meter) => meter.premiseId === premise.id,
        ) as meter[],
      }));

      console.log(customerPremises);

      const customerMeterData: meterData[] = data.MeterData.filter(
        (meterData) =>
          customerPremises.some((premise) =>
            premise.meters.some((meter) => meter.id === meterData.meterId),
          ),
      );

      setLoading(true);
      dispatch({
        type: 'SET_CUSTOMER',
        payload: {
          ...customer,
          premises: customerPremises,
        },
      });
      dispatch({
        type: 'SET_METER_DATA',
        payload: customerMeterData,
      });
      navigation.navigate('StartScreen');
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      Alert.alert('Fel', 'Felaktig API nyckel.');
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
