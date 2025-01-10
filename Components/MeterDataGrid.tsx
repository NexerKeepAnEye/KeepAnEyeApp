import React from 'react';
import { ScrollView, View } from 'react-native';
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
    <View style={MeterDataGridStyle.container}>
      <ScrollView>
        <FetchMeterData />
        <DataTable style={MeterDataGridStyle.gridContainer}>
          <DataTable.Header style={MeterDataGridStyle.header}>
            <DataTable.Title textStyle={MeterDataGridStyle.title}>
              Datum
            </DataTable.Title>
            <DataTable.Title textStyle={MeterDataGridStyle.title}>
              Värde
            </DataTable.Title>
            <DataTable.Title textStyle={MeterDataGridStyle.title}>
              Kostnad
            </DataTable.Title>
            <DataTable.Title textStyle={MeterDataGridStyle.title}>
              Kod
            </DataTable.Title>
          </DataTable.Header>
          {data.length > 0 ? (
            data.map((data, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{data.DateTime.split('T')[0]}</DataTable.Cell>
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
      </ScrollView>
    </View>
  );
}
