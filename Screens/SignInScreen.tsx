import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Image,
  KeyboardAvoidingView,
  Modal,
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
import AlertDialog from '../Components/AlertDialog';
import { usePremiseContext } from '../Context/PremiseContext';
import { RootStackParamList } from '../Navigation/RootStackNavigation';
import { SignIn } from '../Style/SignInStyle';

export default function SignInScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { dispatch } = usePremiseContext();
  const [form, setForm] = useState({ apikey: '' });
  const [loading, setLoading] = useState(false);
  const [showAlartDialog, setShowAlartDialog] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [title, setTitle] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [cancelText, setCancelText] = useState('');
  const [closeApp, setCloseApp] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    const checkApiKey = async () => {
      const storedApiKey = await StorageService.getApiKey();
      if (storedApiKey) {
        const products = await fetchProduct(storedApiKey);
        dispatch({ type: 'SET_PRODUCT', payload: products });
        const data = await fetchPremise(storedApiKey);
        dispatch({ type: 'SET_PREMISES', payload: data });
        navigation.push('PremisesScreen');
      }
    };

    checkApiKey();
  }, []);

  useEffect(() => {
    if (isFocused) {
      const onBackPress = () => {
        setCloseApp(true);
        setTitle('Varning');
        setInputMessage('Vill du stänga av appen?');
        setConfirmText('Ja');
        setCancelText('Nej');
        setIsVisible(true);
        setShowAlartDialog(true);
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => backHandler.remove();
    }
  }, [isFocused]);

  const errorMessages = (message: string) => {
    setTitle('Inloggning misslyckades');
    setInputMessage(message);
    setConfirmText('Uppfattat');
    setIsVisible(true);
    setShowAlartDialog(true);
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const data = await fetchPremise(form.apikey);
      if (Array.isArray(data)) {
        const products = await fetchProduct(form.apikey);
        dispatch({ type: 'SET_PRODUCT', payload: products });
        dispatch({ type: 'SET_PREMISES', payload: data });
        await StorageService.storeApiKey(form.apikey);
        navigation.navigate('PremisesScreen');
        return BackHandler.removeEventListener('hardwareBackPress', () => true);
      }
    } catch (error) {
      console.log('Error:', error);
      setLoading(false);
      setCloseApp(false);
      if (error instanceof Error) {
        if (error.message.includes('status: 406')) {
          errorMessages('Ogiltig API-nyckel. Försök igen.');
        } else if (
          error.message.includes('status: 500') ||
          error.message.includes('status: 504')
        ) {
          errorMessages('Serverfel. Försök igen.');
        } else if (error.message.includes('status: 422')) {
          errorMessages('Valideringsfel av indata. Försök igen.');
        }
      } else {
        errorMessages('Ett okänt fel inträffade. Försök igen.');
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
              <Text style={SignIn.title}>Ange API-nyckel:</Text>
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
                  <Text style={SignIn.buttonText}>Loggar in...</Text>
                  <ActivityIndicator
                    animating={true}
                    color={MD2Colors.white}
                    size="large"
                    style={{ paddingLeft: 19 }}
                  />
                </>
              ) : (
                <Text style={SignIn.buttonText}>Logga in</Text>
              )}
            </TouchableOpacity>
          </View>
          <Image
            source={NexerLogo}
            resizeMode="contain"
            style={SignIn.footerLogo}
          />
        </KeyboardAvoidingView>
      </ScrollView>
      <Modal
        statusBarTranslucent={true}
        animationType="fade"
        transparent={true}
        visible={showAlartDialog}
        onRequestClose={() => {
          setShowAlartDialog(!showAlartDialog);
        }}
      >
        {closeApp ? (
          <AlertDialog
            visible={isVisible}
            title={title}
            message={inputMessage}
            onConfirmText={cancelText}
            onConfirm={() => {
              setIsVisible(false);
              setShowAlartDialog(false);
            }}
            onCancelText={confirmText}
            onCancel={() => {
              setIsVisible(false);
              setShowAlartDialog(false);
              BackHandler.exitApp();
            }}
          ></AlertDialog>
        ) : (
          <AlertDialog
            visible={isVisible}
            title={title}
            message={inputMessage}
            onConfirmText={confirmText}
            onConfirm={() => {
              setIsVisible(false);
              setShowAlartDialog(false);
            }}
          ></AlertDialog>
        )}
      </Modal>
    </SafeAreaView>
  );
}
