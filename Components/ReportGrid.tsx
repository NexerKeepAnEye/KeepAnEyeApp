import React, { Reducer, useEffect, useReducer, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { DataTable, Divider } from 'react-native-paper';
import {
  FilterAction,
  filterReducer,
  FilterState,
  initialState,
} from '../Context/FilterReducer';
import { meterData } from '../MockedData/MockedMeterDataMonth';
import { mockedData } from '../MockedData/MockedProduct';
import { ReportGridStyle } from '../Style/ReportGridStyleStyle';
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

  const meter = state.meter;

  const productCode = meter && meter.length > 0 ? meter[0].ProductCode : null;

  const productName = productCode
    ? mockedData.find((item) => item.Code === productCode)?.Unit
    : null;

  return (
    <ScrollView style={ReportGridStyle.root}>
      {selectedReport === 'Månadsrapport' && (
        <>
          <Filter
            filters={['year', 'meter']}
            setYear={(year) => dispatch({ type: 'SET_YEAR', payload: year })}
            setMeter={(meter) =>
              dispatch({ type: 'SET_METER', payload: meter })
            }
            year={state.year}
            meter={state.meter}
            meterData={state.meterData}
            setFilteredResults={(data) => {
              dispatch({ type: 'SET_FILTERED_RESULTS', payload: data });
              setSearchClicked(true);
            }}
            buttonText="Skapa rapport"
          />
          {searchClicked ? (
            filteredResults.length > 0 ? (
              <>
                <View>
                  <MeterDataBarChart filteredResults={filteredResults} />
                </View>
                <View style={ReportGridStyle.container}>
                  {selectedReport && (
                    <>
                      <Divider style={ReportGridStyle.header} />
                      <DataTable>
                        <DataTable.Header>
                          <DataTable.Title>Månad</DataTable.Title>
                          <DataTable.Title>
                            Förbrukning {productName?.toString() ?? ''}
                          </DataTable.Title>
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
              <View style={ReportGridStyle.container}>
                <Text style={ReportGridStyle.noDataText}>Data saknas</Text>
              </View>
            )
          ) : null}
        </>
      )}
    </ScrollView>
  );
};
