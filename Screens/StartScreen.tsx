import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NexerLogo from '../assets/NexerLogo.png';
import { usePremiseContext } from '../Context/PremiseContext';
import { RootStackParamList } from '../Navigation/RootStackNavigation';
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
  const { state, dispatch } = usePremiseContext();
  const premises: Premise[] = state.premises;

  console.log('startscreen Premises:', JSON.stringify(premises));

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
        {Array.isArray(premises) && premises.map((item) => renderItem(item))}
      </ScrollView>
      <Image
        source={NexerLogo}
        style={StartScreenStyle.footer}
      />
    </View>
  );
}
