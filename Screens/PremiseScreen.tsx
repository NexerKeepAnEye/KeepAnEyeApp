import * as React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { usePremiseContext } from '../PremiseState/PremiseContext';

export default function PremiseScreen() {
  const { state } = usePremiseContext();
  // const { premiseId } = state;

  return (
    <View>
      <Text>PREMISE SCREEN</Text>
      <Text>Fastighet Id: {state.premise?.Id}</Text>
      <Text>Fastighet name: {state.premise?.Name}</Text>
      <Text>Fastighet beskrivning: {state.premise?.Designation}</Text>
      <View style={{ width: '100%', height: 1, backgroundColor: 'red' }}></View>
      <Text>Meters</Text>
      <Text>meter name : {state.premise?.Meters[1]?.Name}</Text>
      <Text>meter code : {state.premise?.Meters[1]?.ProductCode}</Text>
      <Text>meter Id: {state.premise?.Meters[1]?.ProductId}</Text>
    </View>
  );
}
