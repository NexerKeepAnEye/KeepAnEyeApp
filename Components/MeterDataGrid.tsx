import React, { useReducer, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import {
  FilterAction,
  filterReducer,
  FilterState,
  initialState,
} from '../Context/FilterReducer';
import { MeterDataGridStyle } from '../Style/MeterDataGridStyle';
import { ReportGridStyle } from '../Style/ReportGridStyleStyle';
import { MeterData } from '../Types/Type';
import Filter from './Filters/Filter';

type Props = {
  meterId: number;
  meterData: MeterData[];
};

export default function MeterDataGrid({ meterId }: Props) {
  const [state, dispatch] = useReducer<
    React.Reducer<FilterState, FilterAction>
  >(filterReducer, initialState);

  const [filteredResults, setFilteredResults] = useState<MeterData[]>([]);

  const [filterApplied, setFilterApplied] = useState(false);

  return (
    <ScrollView>
      <Filter
        filters={['dateRange', 'resolution']}
        setFromDate={(date) => {
          if (date !== null) {
            dispatch({ type: 'SET_FROM_DATE', payload: date });
          }
        }}
        setToDate={(date) => {
          if (date !== null) {
            dispatch({ type: 'SET_TO_DATE', payload: date });
          }
        }}
        setResolution={(resolution) =>
          dispatch({ type: 'SET_RESOLUTION', payload: resolution })
        }
        fromDate={state.fromDate}
        toDate={state.toDate}
        meterData={state.meterData}
        resolution={state.resolution}
        meterId={meterId}
        setFilteredResults={(data) => {
          setFilteredResults(data);
          setFilterApplied(true);
        }}
        buttonText={'Sök'}
        // productId={0}
      />
      <>
        {filterApplied ? (
          <View>
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
                      {data.DateTime.toISOString().split('T')[0]}
                    </DataTable.Cell>
                    <DataTable.Cell>{Math.round(data.Value)}</DataTable.Cell>
                    <DataTable.Cell>{Math.round(data.Cost)}</DataTable.Cell>
                    <DataTable.Cell>{data.Code}</DataTable.Cell>
                  </DataTable.Row>
                ))
              ) : (
                <Text style={ReportGridStyle.noDataText}>Data saknas</Text>
              )}
            </DataTable>
          </View>
        ) : null}
      </>
    </ScrollView>
  );
}
