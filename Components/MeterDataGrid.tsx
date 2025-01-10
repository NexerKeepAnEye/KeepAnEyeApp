import React from 'react';
import { Text, View } from 'react-native';
import { usePremiseContext } from '../PremiseState/PremiseContext';
import { FetchMeterData } from './FetchMeterData';

type Props = {
  meterId: number;
};

export default function MeterDataGrid({ meterId }: Props) {
  const { state } = usePremiseContext();

  const meter = state.premise?.Meters.find((m) => m.Id === meterId);

  const data = state.meterData.filter((data) => data.MeterId === meterId);

  return (
    <View>
      <FetchMeterData />
      <Text>Mätare: {meter?.Name}</Text>
      <Text>Id: {meter?.Id}</Text>
      {data.length > 0 ? (
        data.map((data, index) => (
          <View key={index}>
            <Text>{data.DateTime}</Text>
            <Text>Value: {data.Value}</Text>
            <Text>Cost: {data.Cost}</Text>
            <Text>Code: {data.Code}</Text>
          </View>
        ))
      ) : (
        <Text>No data available for this meter.</Text>
      )}
    </View>
  );
}
