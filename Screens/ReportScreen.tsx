import * as React from 'react';
import { Text, View } from 'react-native';
import Accordion from '../Components/Accordion';
import { usePremiseContext } from '../PremiseState/PremiseContext';

export default function ReportScreen() {
  const { state } = usePremiseContext();
  // const { premise } = state;

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 25,
        }}
      >
        REPORT SCREEN
      </Text>
      {state.premise?.name ? (
        <View>
          <Text
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 15,
            }}
          >
            Premise Id: {state.premise.premiseId}
          </Text>
          <Text
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 15,
            }}
          >
            Designation: {state.premise.designation}
          </Text>
          <Text
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 15,
            }}
          >
            Name: {state.premise.name}
          </Text>
          <Accordion />
        </View>
      ) : (
        <Text>No premise provided</Text>
      )}
    </View>
  );
}
