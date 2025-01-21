import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NexerLogo from '../assets/NexerLogo.png';
import { RootStackParamList } from '../Navigation/RootStackNavigation';
import { usePremiseContext } from '../PremiseState/PremiseContext';
import { StartScreenStyle } from '../Style/StartScreenStyle';
import { premise } from '../Types/Types2';

type StartScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'StartScreen'
>;

type Props = {
  navigation: StartScreenNavigationProp;
};

export default function StartScreen({ navigation }: Props) {
  const { state, dispatch } = usePremiseContext();
  // const isFocused = useIsFocused();

  // useEffect(() => {
  //   if (isFocused) {
  //     const state = navigation.getState();
  //     const currentRoute = state.routes[state.index];
  //     if (currentRoute.name !== 'StartScreen') {
  //       // resetNavigationStack(navigation, 'StartScreen');
  //     }
  //   }
  // }, [isFocused, navigation]);

  const renderItem = (item: premise) => (
    <TouchableOpacity
      key={item.id}
      style={StartScreenStyle.listItems}
      onPress={() => {
        dispatch({
          type: 'SET_PREMISE',
          payload: item,
        });
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
        {state.premises.map((item) => renderItem(item))}
      </ScrollView>
      <Image
        source={NexerLogo}
        style={StartScreenStyle.footer}
      />
    </View>
  );
}
