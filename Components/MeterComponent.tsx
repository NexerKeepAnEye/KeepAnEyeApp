import * as React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { usePremiseContext } from '../PremiseState/PremiseContext';
import { MeterComponentStyle } from '../Style/MeterComponentStyle';
import MeterIcon from './MeterIcon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation/RootStackNavigation';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MeterDataScreen'>;
  navigation1: NativeStackNavigationProp<RootStackParamList, 'PremiseScreen'>;
};

export default function MeterComponent({ navigation }: Props) {
  const { state } = usePremiseContext();

  const renderMeter = (item: {
    Id: number;
    Name: string;
    ProductCode: string;
    ProductId: number;
  }) => (
    <TouchableOpacity
      style={MeterComponentStyle.listItem}
      key={item.Id}
      onPress={() =>
        navigation.navigate('MeterDataScreen', {
          meterId: item.Id,
        })
      }
    >
      <View style={MeterComponentStyle.iconContainer}>
        <MeterIcon productCode={item.ProductCode} />
      </View>
      <View style={MeterComponentStyle.textContainer}>
        <Text style={MeterComponentStyle.textStyleName}>{item.Name}</Text>
        <Text style={MeterComponentStyle.textStyleProductCode}>
          {item.ProductCode}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={MeterComponentStyle.container}>
      {state.premise?.Meters.map((item) => renderMeter(item))}
    </ScrollView>
  );
}
