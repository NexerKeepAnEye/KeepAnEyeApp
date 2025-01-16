import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import { usePremiseContext } from '../PremiseState/PremiseContext';
import { MeterDataGridStyle } from '../Style/MeterDataGridStyle';
import { MeterData } from '../Types/Type';
import { FetchMeterData } from './FetchMeterData';
import TestFilter from './TestFilter'; // Ensure this path is correct

type Props = {
  meterId: number;
};

export default function MeterDataGrid({ meterId }: Props) {
  const { state } = usePremiseContext();
  const [filteredData, setFilteredData] = useState<MeterData[]>([]);

  const handleFilter = (startDate: string | null, endDate: string | null) => {
    if (startDate === null && endDate === null) {
      const latestData = state.meterData
        .filter((data) => data.MeterId === meterId)
        .slice(-20);
      setFilteredData(latestData);
    } else {
      const start = new Date(startDate || '');
      const end = new Date(endDate || '');
      const data = state.meterData.filter(
        (data) =>
          data.MeterId === meterId &&
          new Date(data.DateTime) >= start &&
          new Date(data.DateTime) <= end,
      );
      setFilteredData(data);
    }
  };

  return (
    <View style={MeterDataGridStyle.container}>
      <TestFilter onFilter={handleFilter} />
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
          {filteredData.length > 0 ? (
            filteredData.map((data, index) => (
              <DataTable.Row
                key={index}
                style={MeterDataGridStyle.cell}
              >
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
