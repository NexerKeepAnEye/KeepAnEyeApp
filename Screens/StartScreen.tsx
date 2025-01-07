import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { mockedPremises } from '../MockedData/MockedPremises';
import { RootStackParamList } from '../Navigation/RootStackNavigation';
import { usePremiseContext } from '../PremiseState/PremiseContext';
import { StartScreenStyle } from '../Style/StartScreenStyle';

type StartScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'StartScreen'
>;

type Props = {
  navigation: StartScreenNavigationProp;
};

export default function StartScreen({ navigation }: Props) {
  const { dispatch } = usePremiseContext();

  const renderItem = ({
    item,
  }: {
    item: { premiseId: number; designation: string; name: string };
  }) => (
    <TouchableOpacity
      onPress={() => {
        dispatch({ type: 'SET_PREMISE', payload: item });
        navigation.navigate('tabs', {
          screen: 'ReportScreen',
          params: { premiseId: item.premiseId },
        });
        navigation.navigate('tabs', {
          screen: 'PremiseScreen',
          params: { premiseId: item.premiseId },
        });
      }}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );
  return (
    <>
      <View style={StartScreenStyle.container}>
        <Text style={StartScreenStyle.textHeader}>Mina Fastigheter</Text>
        <FlatList
          data={mockedPremises}
          keyExtractor={(item) => item.premiseId.toString()}
          renderItem={renderItem}
        />
      </View>
    </>
  );
}
