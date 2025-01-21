import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { DataTable, Text } from 'react-native-paper';
import { usePremiseContext } from '../PremiseState/PremiseContext';
import { MeterDataGridStyle } from '../Style/MeterDataGridStyle';
import { meterData } from '../Types/Types2';
// import { FetchMeterData } from './FetchMeterData';
import TestFilter from './TestFilter'; // Ensure this path is correct

type Props = {
  meterId: number;
  meterData: meterData[];
};

export default function MeterDataGrid({ meterId, meterData }: Props) {
  const { state } = usePremiseContext();
  const [filteredData, setFilteredData] = useState<meterData[]>([]);
  const [filterApplied, setFilterApplied] = useState(false);

  useEffect(() => {
    console.log('MeterDataGrid meterData:', meterData);
    setFilteredData(meterData);
  }, [meterData]);

  const handleFilter = (startDate: string | null, endDate: string | null) => {
    setFilterApplied(true);
    if (startDate === null && endDate === null) {
      const latestData = state.meterData
        .filter((data) => data.meterId === meterId)
        .slice(-20);
      setFilteredData(latestData);
    } else {
      const start = new Date(startDate || '');
      const end = new Date(endDate || '');
      const data = state.meterData.filter(
        (data) =>
          data.meterId === meterId &&
          new Date(data.dateTime) >= start &&
          new Date(data.dateTime) <= end,
      );
      setFilteredData(data);
    }
  };

  return (
    <View style={MeterDataGridStyle.container}>
      <TestFilter onFilter={handleFilter} />
      {filterApplied ? (
        filteredData.length > 0 ? (
          <ScrollView>
            {/* <FetchMeterData /> */}
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
              {filteredData.map((data, index) => (
                <DataTable.Row
                  key={index}
                  style={MeterDataGridStyle.cell}
                >
                  <DataTable.Cell>{data.dateTime.split('T')[0]}</DataTable.Cell>
                  <DataTable.Cell>{data.value}</DataTable.Cell>
                  <DataTable.Cell>{data.cost}</DataTable.Cell>
                  <DataTable.Cell>{data.productId}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </ScrollView>
        ) : (
          <Text style={MeterDataGridStyle.text}>Data saknas</Text>
        )
      ) : null}
    </View>
  );
}
