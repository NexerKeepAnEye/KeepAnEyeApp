import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../Navigation/RootStackNavigation';
import { usePremiseContext } from '../PremiseState/PremiseContext';
import { MeterComponentStyle } from '../Style/MeterComponentStyle';
import { meter, meterData } from '../Types/Types2';
// import MeterIcon from './MeterIcon';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MeterDataScreen'>;
};

export default function MeterComponent({ navigation }: Props) {
  const { state, dispatch } = usePremiseContext();

  const renderMeter = (item: meter) => (
    <TouchableOpacity
      style={MeterComponentStyle.listItem}
      key={item.id}
      onPress={() => {
        const meterData: meterData[] = state.meterData.filter(
          (data) => data.meterId === item.id,
        );
        console.log('Filtered meterData:', meterData); // Add this line to debug
        dispatch({
          type: 'SET_METER_DATA',
          payload: meterData,
        });
        navigation.navigate('MeterDataScreen', {
          meterId: item.id,
        });
      }}
    >
      {/* <View style={MeterComponentStyle.iconContainer}>
        <MeterIcon productCode={item.productId} />
      </View> */}
      <View style={MeterComponentStyle.textContainer}>
        <Text style={MeterComponentStyle.textStyleName}>{item.name}</Text>
        <Text style={MeterComponentStyle.textStyleProductCode}>{item.id}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={MeterComponentStyle.container}>
      {state.selectedPremise?.meters.map((item) => renderMeter(item))}
    </ScrollView>
  );
}
