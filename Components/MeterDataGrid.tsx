import React from 'react';
import { View } from 'react-native';
import { DataTable } from 'react-native-paper';
import { usePremiseContext } from '../PremiseState/PremiseContext';
import { MeterDataGridStyle } from '../Style/MeterDataGridStyle';
import { FetchMeterData } from './FetchMeterData';

type Props = {
  meterId: number;
};

export default function MeterDataGrid({ meterId }: Props) {
  const { state } = usePremiseContext();

  // const meter = state.premise?.Meters.find((m) => m.Id === meterId);

  const data = state.meterData.filter((data) => data.MeterId === meterId);

  return (
    <View>
      <FetchMeterData />
      <DataTable>
        <DataTable.Header style={MeterDataGridStyle.header}>
          <DataTable.Title>DateTime</DataTable.Title>
          <DataTable.Title>Value</DataTable.Title>
          <DataTable.Title>Cost</DataTable.Title>
          <DataTable.Title>Code</DataTable.Title>
        </DataTable.Header>
        {data.length > 0 ? (
          data.map((data, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>{data.DateTime}</DataTable.Cell>
              <DataTable.Cell>{data.Value}</DataTable.Cell>
              <DataTable.Cell>{data.Cost}</DataTable.Cell>
              <DataTable.Cell>{data.Code}</DataTable.Cell>
            </DataTable.Row>
          ))
        ) : (
          <DataTable.Row>
            <DataTable.Cell>No data available</DataTable.Cell>
          </DataTable.Row>
        )}
      </DataTable>
    </View>
  );
}
