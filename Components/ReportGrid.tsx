import React, { Reducer, useEffect, useReducer, useState } from 'react';
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
  const [state, dispatch] = useReducer<Reducer<FilterState, FilterAction>>(
    filterReducer,
    initialState,
  );

  const [searchClicked, setSearchClicked] = useState(false);

  useEffect(() => {
    // Använd mockad data
    dispatch({
      type: 'SET_METER_DATA',
      payload: meterData,
    });
  }, []);

  const filteredResults = state.filteredResults;

  const formatMonth = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'long' });
  };

  return (
    <ScrollView style={DataTableStyle.container}>
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
            setFilteredResults={(data) => {
              dispatch({ type: 'SET_FILTERED_RESULTS', payload: data });
              setSearchClicked(true);
            }}
            buttonText="Sök"
          />
          {searchClicked ? (
            filteredResults.length > 0 ? (
              <>
                <View>
                  <MeterDataBarChart filteredResults={filteredResults} />
                </View>
                <View style={DataTableStyle.container}>
                  {selectedReport && (
                    <>
                      <Text style={DataTableStyle.header}>Data</Text>
                      <DataTable>
                        <DataTable.Header>
                          <DataTable.Title>Månad</DataTable.Title>
                          <DataTable.Title>Value</DataTable.Title>
                        </DataTable.Header>
                        {filteredResults.map((item, index) => (
                          <DataTable.Row key={index}>
                            <DataTable.Cell>
                              {formatMonth(item.DateTime)}
                            </DataTable.Cell>
                            <DataTable.Cell>{item.Value}</DataTable.Cell>
                          </DataTable.Row>
                        ))}
                      </DataTable>
                    </>
                  )}
                </View>
              </>
            ) : (
              <View style={DataTableStyle.container}>
                <Text style={DataTableStyle.noDataText}>Finns ingen data</Text>
              </View>
            )
          ) : null}
        </>
      )}
    </ScrollView>
  );
};
