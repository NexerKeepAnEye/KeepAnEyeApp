import * as React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon set
import { usePremiseContext } from '../PremiseState/PremiseContext';
import { PremiseScreenStyle } from '../Style/PremiseScreenStyle';

export default function PremiseScreen() {
  const { state } = usePremiseContext();
  // const { premiseId } = state;

  return (
    <View style={PremiseScreenStyle.container}>
      <View style={PremiseScreenStyle.premiseCard}>
        <View style={PremiseScreenStyle.flexRow}>
          <Icon
            name="place"
            size={40}
            color="#EA5C0D"
          />
          <Text style={PremiseScreenStyle.cardHeader}>
            {state.premise?.Name}
          </Text>
        </View>
        <Text style={PremiseScreenStyle.secondHeaders}>
          Fastighetsbeteckning:
        </Text>
        <Text style={PremiseScreenStyle.premiseInformation}>
          {state.premise?.Designation}
        </Text>
        <Text style={PremiseScreenStyle.secondHeaders}>Id:</Text>
        <Text style={PremiseScreenStyle.premiseInformation}>
          {state.premise?.Id}
        </Text>
      </View>
      {/* 
      <Text>Meters</Text>
      <Text>meter name : {state.premise?.Meters[1]?.Name}</Text>
      <Text>meter code : {state.premise?.Meters[1]?.ProductCode}</Text>
      <Text>meter Id: {state.premise?.Meters[1]?.ProductId}</Text> */}
    </View>
  );
}
