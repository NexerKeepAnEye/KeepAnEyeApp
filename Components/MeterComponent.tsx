import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { usePremiseContext } from '../Context/PremiseContext';
import { RootStackParamList } from '../Navigation/RootStackNavigation';
import { MeterComponentStyle } from '../Style/MeterComponentStyle';
import { Meter, MeterData } from '../Types/Type';
import MeterIcon from './MeterIcon';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MeterDataScreen'>;
};

export default function MeterComponent({ navigation }: Props) {
  const { state, dispatch } = usePremiseContext();

  const renderMeter = (item: Meter) => (
    <TouchableOpacity
      style={MeterComponentStyle.listItem}
      key={item.Id}
      onPress={() => {
        const meterData: MeterData[] = state.meterData.filter(
          (data) => data.MeterId === item.Id,
        );
        dispatch({
          type: 'SET_METER_DATA',
          payload: meterData,
        });
        navigation.navigate('MeterDataScreen', {
          meterId: item.Id,
        });
      }}
    >
      <View style={MeterComponentStyle.iconContainer}>
        <MeterIcon productId={item.ProductId} />
      </View>
      <View style={MeterComponentStyle.textContainer}>
        <Text style={MeterComponentStyle.textStyleName}>{item?.Name}</Text>
        <Text style={MeterComponentStyle.textStyleProductCode}>{item?.Id}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={MeterComponentStyle.container}>
      {state.selectedPremise?.Meters.map((item) => renderMeter(item))}
    </ScrollView>
  );
}
