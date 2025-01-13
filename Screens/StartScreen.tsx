import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
// import { mockedPremises } from '../MockedData/MockedPremises';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { mockedPremise } from '../MockedData/MockedPremise';
import { RootStackParamList } from '../Navigation/RootStackNavigation';
import { usePremiseContext } from '../PremiseState/PremiseContext';
import { StartScreenStyle } from '../Style/StartScreenStyle';
import { Meter } from '../Types/Interfaces/Type';
import NexerLogo from '../assets/NexerLogo.png';

type StartScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'StartScreen'
>;

type Props = {
  navigation: StartScreenNavigationProp;
};

export default function StartScreen({ navigation }: Props) {
  const { dispatch } = usePremiseContext();

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

      {/* nexer logo */}
    </View>
  );
}
