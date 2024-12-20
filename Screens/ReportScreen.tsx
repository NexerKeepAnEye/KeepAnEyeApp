import * as React from 'react';
import { Text, View } from 'react-native';
import { usePremiseContext } from '../PremiseState/PremiseContext';

export default function ReportScreen() {
  const { state } = usePremiseContext();
  const { premiseId } = state;
  return (
    <View>
      <Text>REPORT SCREEN</Text>
      {premiseId ? (
        <Text>Premise Id: {premiseId}</Text>
      ) : (
        <Text>No premise id provided</Text>
      )}
    </View>
  );
}
