import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
// import { mockedPremises } from '../MockedData/MockedPremises';
import { mockedPremise } from '../MockedData/MockedPremise';
import { RootStackParamList } from '../Navigation/RootStackNavigation';
import { usePremiseContext } from '../PremiseState/PremiseContext';
import { StartScreenStyle } from '../Style/StartScreenStyle';
import { Meter } from '../Types/Interfaces/Type';

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
    item: {
      Id: number;
      Designation: string | null | undefined;
      Name: string;
      Meters: Meter[];
    };
  }) => (
    <TouchableOpacity
      onPress={() => {
        dispatch({ type: 'SET_PREMISE', payload: item });
        navigation.navigate('tabs', {
          screen: 'ReportScreen',
          params: { premiseId: item.Id },
        });
        navigation.navigate('tabs', {
          screen: 'PremiseScreen',
          params: { premiseId: item.Id },
        });
      }}
    >
      <Text>{item.Name}</Text>
    </TouchableOpacity>
  );
  return (
    <>
      <View style={StartScreenStyle.container}>
        <Text style={StartScreenStyle.textHeader}>Mina Fastigheter</Text>
        <FlatList
          data={mockedPremise}
          keyExtractor={(item) => item.Id.toString()}
          renderItem={renderItem}
        />
      </View>
    </>
  );
}
