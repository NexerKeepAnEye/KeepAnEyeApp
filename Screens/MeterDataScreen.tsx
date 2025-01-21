import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { Text, View } from 'react-native';
import MeterDataCard from '../Components/MeterDataCard';
import MeterDataGrid from '../Components/MeterDataGrid';
import PremiseCard from '../Components/PremiseCard';
import { usePremiseContext } from '../Context/PremiseContext';
import { RootStackParamList } from '../Navigation/RootStackNavigation';
import { MeterDataScreenStyle } from '../Style/MeterDataScreenStyle';

type Props = NativeStackScreenProps<RootStackParamList, 'MeterDataScreen'>;

export default function MeterDataScreen({ route, navigation }: Props) {
  const { meterId } = route.params;
  const { state } = usePremiseContext();
  const meter = state.premise?.Meters.find((m) => m.Id === meterId);

  return (
    <View style={MeterDataScreenStyle.container}>
      <PremiseCard navigation={navigation} />
      {meter ? (
        <View style={MeterDataScreenStyle.container2}>
          <MeterDataCard
            meterId={meter.Id}
            navigation={navigation}
          />
          <MeterDataGrid meterId={meter.Id} />
        </View>
      ) : (
        <Text>Meter not found</Text>
      )}
    </View>
  );
}
