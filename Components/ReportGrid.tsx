import React from 'react';
import { Text, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import { AccordionStyle, DataTableStyle } from '../Style/AccordionStyle';
import FromToDate from './FromToDate';
import { MeterSearch } from './MeterSearch';

interface ReportGridProps {
  selectedReport: string;
  searchResults: any[];
}

export const ReportGrid = ({
  selectedReport,
  searchResults,
}: ReportGridProps) => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'wrap',
          width: '100%',
          gap: 10,
        }}
      >
        {/* <YearSearch /> */}
        <FromToDate />
        <MeterSearch />
      </View>
      <View style={DataTableStyle.container}>
        {selectedReport && (
          <>
            <Text style={AccordionStyle.headerChanged}>
              {selectedReport} !!!!OBS FELAKTIG DATA!!!
              {/* need to create calculations insted of fetching from mocked reports */}
            </Text>
            <DataTable>
              <DataTable.Header style={DataTableStyle.header}>
                <DataTable.Title>ID</DataTable.Title>
                <DataTable.Title>Year</DataTable.Title>
                <DataTable.Title>Meter ID</DataTable.Title>
                <DataTable.Title>Product ID</DataTable.Title>
              </DataTable.Header>
              {searchResults.map((item) => (
                <DataTable.Row key={item.id}>
                  <DataTable.Cell>{item.id}</DataTable.Cell>
                  <DataTable.Cell>{item.DateTime}</DataTable.Cell>
                  <DataTable.Cell>{item.MeterId}</DataTable.Cell>
                  <DataTable.Cell>{item.Code}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </>
        )}
      </View>
    </>
  );
};
