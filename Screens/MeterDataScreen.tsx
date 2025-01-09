import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { Text, View } from 'react-native';
import MeterDataCard from '../Components/MeterDataCard';
import PremiseCard from '../Components/PremiseCard';
import { RootStackParamList } from '../Navigation/RootStackNavigation';
import { usePremiseContext } from '../PremiseState/PremiseContext';

type Props = NativeStackScreenProps<RootStackParamList, 'MeterDataScreen'>;

export default function MeterDataScreen({ route }: Props) {
  const { meterId } = route.params;
  const { state } = usePremiseContext();

  const meter = state.premise?.Meters.find((m) => m.Id === meterId);

  return (
    <View>
      <PremiseCard />
      {meter ? (
        <>
          <MeterDataCard meterId={meter.Id} />
          {/* <Text>Meter ID: {meter.Id}</Text>
          <Text>Meter Name: {meter.Name}</Text>
          <Text>Product Code: {meter.ProductCode}</Text> */}
        </>
      ) : (
        <Text>Meter not found</Text>
      )}
    </View>
  );
}
