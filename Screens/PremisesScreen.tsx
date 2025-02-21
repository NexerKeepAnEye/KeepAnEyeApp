import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useRef, useState } from 'react';
import {
  BackHandler,
  Image,
  Linking,
  Modal,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  default as Icon,
  default as MaterialIcons,
} from 'react-native-vector-icons/MaterialIcons';
import NexerLogo from '../assets/NexerLogo.png';
import AlertDialog from '../Components/AlertDialog';
import { usePremiseContext } from '../Context/PremiseContext';
import { RootStackParamList } from '../Navigation/RootStackNavigation';
import { deviceHeight } from '../Style/Dimensions';
import { PremiseScreenStyle } from '../Style/PremiseScreenStyle';
import { StartScreenStyle } from '../Style/StartScreenStyle';
import { Premise } from '../Types/Type';

type StartScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'StartScreen'
>;

type Props = {
  navigation: StartScreenNavigationProp;
};

export default function StartScreen({ navigation }: Props) {
  const [showAlartDialog, setShowAlartDialog] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [title, setTitle] = useState('');
  const { state, dispatch } = usePremiseContext();
  const premises: Premise[] = state.premises;
  const isFocused = useIsFocused();
  const [showButton, setShowButton] = useState(false);

  const errorMessage = () => {
    setTitle('Varning');
    setInputMessage('Vill du stänga av appen?');
    setIsVisible(true);
    setShowAlartDialog(true);
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = (): boolean => {
        console.log(isFocused);
        if (isFocused) {
          errorMessage();
          return true;
        }
        return false;
      };

      if (Platform.OS === 'android') {
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
      } else {
        const backHandler = () => {
          if (isFocused) {
            errorMessage();
            return true;
          }
          return false;
        };

        navigation.addListener('beforeRemove', backHandler);

        return () => {
          navigation.removeListener('beforeRemove', backHandler);
        };
      }

      return () => {
        if (Platform.OS === 'android') {
          BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }
      };
    }, [isFocused, navigation]),
  );

  const handleConfirm = () => {
    setIsVisible(false);
    setShowAlartDialog(false);
  };

  const handleCancel = () => {
    setIsVisible(false);
    setShowAlartDialog(false);
    if (Platform.OS === 'android') {
      BackHandler.exitApp();
    } else {
      Linking.openURL('app-settings');
    }
  };

  const scrollViewRef = useRef<ScrollView>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    if (scrollPosition > deviceHeight) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const renderItem = (item: Premise) => (
    <TouchableOpacity
      key={item.Id}
      style={StartScreenStyle.listItems}
      onPress={() => {
        dispatch({
          type: 'SET_PREMISE',
          payload: item,
        });
        navigation.navigate('tabs', {
          screen: 'ReportScreen',
          params: { premiseId: item.Id },
        });
        navigation.navigate('tabs', {
          screen: 'PremiseStackNavigator',
          params: { premiseId: item.Id },
        });
      }}
    >
      <Icon
        name="home"
        size={30}
        color="#949494"
        style={StartScreenStyle.listItemPositionStart}
      />
      <Text style={StartScreenStyle.textItem}>{item.Name.trimEnd()}</Text>
      <Icon
        name="keyboard-arrow-right"
        size={35}
        color="black"
        style={StartScreenStyle.listItemPositionEnd}
      />
    </TouchableOpacity>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={StartScreenStyle.container}>
        <View style={StartScreenStyle.headerBox}>
          <Text style={StartScreenStyle.textHeader}>MINA FASTIGHETER</Text>
        </View>
        <ScrollView
          style={StartScreenStyle.itemBox}
          ref={scrollViewRef}
          onScroll={handleScroll}
          scrollEventThrottle={4}
        >
          {Array.isArray(premises) && premises.map((item) => renderItem(item))}
        </ScrollView>
        {showButton && (
          <View style={PremiseScreenStyle.goToTop}>
            <TouchableOpacity
              onPress={() => {
                scrollViewRef.current?.scrollTo({ y: 0, animated: true });
              }}
            >
              <MaterialIcons
                name="arrow-upward"
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </View>
        )}
        <Image
          source={NexerLogo}
          style={StartScreenStyle.footer}
        />
      </View>
      <Modal
        statusBarTranslucent={true}
        animationType="fade"
        transparent={true}
        visible={showAlartDialog}
        onRequestClose={() => {
          setShowAlartDialog(!showAlartDialog);
        }}
      >
        <AlertDialog
          visible={isVisible}
          title={title}
          message={inputMessage}
          onConfirmText="Avbryt"
          onConfirm={handleConfirm}
          onCancelText="Ja"
          onCancel={handleCancel}
        />
      </Modal>
    </GestureHandlerRootView>
  );
}
