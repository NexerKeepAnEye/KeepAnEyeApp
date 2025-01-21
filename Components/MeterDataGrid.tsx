import React, { useEffect, useReducer, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import {
  FilterAction,
  filterReducer,
  FilterState,
  initialState,
} from '../Context/FilterReducer';
import { meterData } from '../MockedData/MockedMeterDataMonth';
import { MeterDataGridStyle } from '../Style/MeterDataGridStyle';
import { MeterData } from '../Types/Type';
import Filter from './Filters/Filter';

type Props = {
  meterId: number;
};

export default function MeterDataGrid({ meterId }: Props) {
  const [state, dispatch] = useReducer<
    React.Reducer<FilterState, FilterAction>
  >(filterReducer, initialState);

  const [filteredResults, setFilteredResults] = useState<MeterData[]>([]);

  const [filterApplied, setFilterApplied] = useState(false);

  useEffect(() => {
    // Använder mockad data
    dispatch({
      type: 'SET_METER_DATA',
      payload: meterData,
    });
  }, []);

  return (
    <View style={MeterDataGridStyle.root}>
      <Filter
        filters={['dateRange']}
        setFromDate={(date) =>
          dispatch({ type: 'SET_FROM_DATE', payload: date })
        }
        setToDate={(date) => dispatch({ type: 'SET_TO_DATE', payload: date })}
        fromDate={state.fromDate}
        toDate={state.toDate}
        meterData={state.meterData}
        meterId={meterId}
        setFilteredResults={(data) => {
          setFilteredResults(data);
          setFilterApplied(true);
        }}
        buttonText={'sök'}
      />
      <View style={MeterDataGridStyle.container}>
        {filterApplied ? (
          <ScrollView>
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
              {filteredResults.length > 0 ? (
                filteredResults.map((data, index) => (
                  <DataTable.Row
                    key={index}
                    style={MeterDataGridStyle.cell}
                  >
                    <DataTable.Cell>
                      {data.DateTime.split('T')[0]}
                    </DataTable.Cell>
                    <DataTable.Cell>{data.Value}</DataTable.Cell>
                    <DataTable.Cell>{data.Cost}</DataTable.Cell>
                    <DataTable.Cell>{data.Code}</DataTable.Cell>
                  </DataTable.Row>
                ))
              ) : (
                <Text style={MeterDataGridStyle.text}>Data saknas</Text>
              )}
            </DataTable>
          </ScrollView>
        ) : null}
      </View>
    </View>
  );
}
