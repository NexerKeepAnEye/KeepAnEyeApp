import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import { Meter, MeterData } from '../Types/Type';
import Filter from './Filters/Filter';

interface ReportGridProps {
  selectedReport: string;
  searchResults: any[];
}

export const ReportGrid = ({ selectedReport }: ReportGridProps) => {
  const [meterData, setMeterData] = useState<MeterData[]>([]);
  const [filteredResults, setFilteredResults] = useState<MeterData[]>([]);
  const [meter, setMeter] = useState<Meter[]>([]);
  const [year, setYear] = useState<string | undefined>(undefined);
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);

  return (
    <View>
      <Filter
        filters={['year', 'meter']}
        setYear={setYear}
        setMeter={setMeter}
        setFromDate={setFromDate}
        setToDate={setToDate}
        year={year}
        meter={meter}
        fromDate={fromDate}
        toDate={toDate}
        meterData={meterData}
        setFilteredResults={setFilteredResults}
      />
      <View style={styles.container}>
        {selectedReport && (
          <>
            <Text style={styles.header}>{selectedReport}</Text>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Date</DataTable.Title>
                <DataTable.Title>Value</DataTable.Title>
                <DataTable.Title>Cost</DataTable.Title>
                <DataTable.Title>Code</DataTable.Title>
                <DataTable.Title>Meter ID</DataTable.Title>
              </DataTable.Header>
              {filteredResults.map((item, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{item.DateTime}</DataTable.Cell>
                  <DataTable.Cell>{item.Value}</DataTable.Cell>
                  <DataTable.Cell>{item.Cost}</DataTable.Cell>
                  <DataTable.Cell>{item.Code}</DataTable.Cell>
                  <DataTable.Cell>{item.MeterId}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ReportGrid;
