import * as React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { usePremiseContext } from '../PremiseState/PremiseContext';

export default function PremiseScreen() {
  const { state } = usePremiseContext();
  const { premiseId } = state;

  return (
    <View>
      <Text>PREMISE SCREEN</Text>
      <Text>Fastighet Id: {premiseId}</Text>
    </View>
  );
}
