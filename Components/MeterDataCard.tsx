import React from 'react';
import { Text, View } from 'react-native';
import { usePremiseContext } from '../PremiseState/PremiseContext';

type Props = {
  meterId: number;
};

export default function MeterDataCard({ meterId }: Props) {
  const { state } = usePremiseContext();

  const meter = state.premise?.Meters.find((m) => m.Id === meterId);

  return (
    <View>
      {/* <Text>{state.premise?.Meters[meterId]}</Text> */}
      <Text>{meter?.Id}</Text>
      <Text>{meter?.Name}</Text>
      <Text>{meter?.ProductCode}</Text>
    </View>
  );
}
