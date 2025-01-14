import {
  CommonActions,
  NavigationProp,
  useIsFocused,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { useEffect } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { mockedPremise } from '../MockedData/MockedPremise';
import { RootStackParamList } from '../Navigation/RootStackNavigation';
import { usePremiseContext } from '../PremiseState/PremiseContext';
import { StartScreenStyle } from '../Style/StartScreenStyle';
import { Meter } from '../Types/Type';
import NexerLogo from '../assets/NexerLogo.png';

function resetNavigationStack(
  navigation: NavigationProp<RootStackParamList>,
  routeName: string,
  params?: object,
) {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: routeName, params }],
    }),
  );
}

type StartScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'StartScreen'
>;

type Props = {
  navigation: StartScreenNavigationProp;
};

export default function StartScreen({ navigation }: Props) {
  const { dispatch } = usePremiseContext();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const state = navigation.getState();
      const currentRoute = state.routes[state.index];
      if (currentRoute.name !== 'StartScreen') {
        resetNavigationStack(navigation, 'StartScreen');
      }
    }
  }, [isFocused, navigation]);

  const renderItem = (item: {
    Id: number;
    Designation: string | null | undefined;
    Name: string;
    Meters: Meter[];
  }) => (
    <TouchableOpacity
      key={item.Id}
      style={StartScreenStyle.listItems}
      onPress={() => {
        dispatch({ type: 'SET_PREMISE', payload: item });
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
      <Text style={StartScreenStyle.textItem}>{item.Name}</Text>
      <Icon
        name="play-arrow"
        size={30}
        color="black"
        style={StartScreenStyle.listItemPositionEnd}
      />
    </TouchableOpacity>
  );

  return (
    <View style={StartScreenStyle.container}>
      <View style={StartScreenStyle.headerBox}>
        <Text style={StartScreenStyle.textHeader}>Mina Fastigheter</Text>
      </View>
      <ScrollView style={StartScreenStyle.itemBox}>
        {mockedPremise.map((item) => renderItem(item))}
      </ScrollView>
      <Image
        source={NexerLogo}
        style={StartScreenStyle.footer}
      />
    </View>
  );
}
