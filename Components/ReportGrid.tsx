import React from 'react';
import { Text, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import { AccordionStyle, DataTableStyle } from '../Style/AccordionStyle';
import YearSearch from './YearSearch';

interface ReportGridProps {
  selectedReport: string;
  searchResults: any[];
}

const ReportGrid: React.FC<ReportGridProps> = ({
  selectedReport,
  searchResults,
}) => {
  return (
    <>
      <View>
        <YearSearch />
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

export default ReportGrid;
