import React, { Reducer, useEffect, useReducer } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import { meterData } from '../MockedData/MockedMeterDataMonth';
import {
  FilterAction,
  filterReducer,
  FilterState,
  initialState,
} from '../PremiseState/FilterReducer';
import { DataTableStyle } from '../Style/DataTableStyle';
import Filter from './Filters/Filter';
import MeterDataBarChart from './MeterDataBarChart';

interface ReportGridProps {
  selectedReport: string;
  searchResults: string[];
}

export const ReportGrid = ({ selectedReport }: ReportGridProps) => {
  //example how to use the component Filter
  const [state, dispatch] = useReducer<Reducer<FilterState, FilterAction>>(
    filterReducer,
    initialState,
  );

  useEffect(() => {
    // Använd mockad data
    dispatch({
      type: 'SET_METER_DATA',
      payload: meterData,
    });
  }, []);

  const filteredResults = state.filteredResults;
  
  return (
    <ScrollView style={DataTableStyle.container}>
      {/* example how to use the component Filter*/}
      {selectedReport === 'Månadsrapport' && (
        <>
          <Filter
            filters={['year', 'meter']}
            setYear={(year) => dispatch({ type: 'SET_YEAR', payload: year })}
            setMeter={(meter) =>
              dispatch({ type: 'SET_METER', payload: meter })
            }
            setFromDate={(date) =>
              dispatch({ type: 'SET_FROM_DATE', payload: date })
            }
            setToDate={(date) =>
              dispatch({ type: 'SET_TO_DATE', payload: date })
            }
            year={state.year}
            meter={state.meter}
            fromDate={state.fromDate}
            toDate={state.toDate}
            meterData={state.meterData}
            setFilteredResults={(data) =>
              dispatch({ type: 'SET_FILTERED_RESULTS', payload: data })
            }
          />
          {selectedReport === 'Månadsrapport' && (
            <ScrollView horizontal={true}>
              <MeterDataBarChart filteredResults={filteredResults} />
            </ScrollView>
          )}
        </>
      )}
      <View style={DataTableStyle.container}>
        {selectedReport && (
          <>
            <Text style={DataTableStyle.header}>{selectedReport}</Text>
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
    </ScrollView>
  );
};
