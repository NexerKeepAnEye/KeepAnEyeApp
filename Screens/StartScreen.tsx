import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NexerLogo from '../assets/NexerLogo.png';
import data from '../MockedData/testdb.json';
import { premise } from '../Types/Types2';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Navigation/RootStackNavigation';
import { StartScreenStyle } from '../Style/StartScreenStyle';
import { usePremiseContext } from '../PremiseState/PremiseContext';

type StartScreenNavigationProp = StackNavigationProp<
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

  const renderItem = (item: premise) => (
    <TouchableOpacity
      key={item.id}
      style={StartScreenStyle.listItems}
      onPress={() => {
        const premise = item;
        if (premise) {
          dispatch({ type: 'SET_PREMISE', payload: premise });
        }
        navigation.navigate('tabs', {
          screen: 'ReportScreen',
          params: { premiseId: item.id },
        });
        navigation.navigate('tabs', {
          screen: 'PremiseStackNavigator',
          params: { premiseId: item.id },
        });
      }}
    >
      <Icon
        name="home"
        size={30}
        color="#949494"
        style={StartScreenStyle.listItemPositionStart}
      />
      <Text style={StartScreenStyle.textItem}>{item.name}</Text>
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
        {data.Premise.map((item) => renderItem(item))}
      </ScrollView>
      <Image
        source={NexerLogo}
        style={StartScreenStyle.footer}
      />
    </View>
  );
}
function resetNavigationStack(
  navigation: StartScreenNavigationProp,
  arg1: string,
) {
  throw new Error('Function not implemented.');
}
