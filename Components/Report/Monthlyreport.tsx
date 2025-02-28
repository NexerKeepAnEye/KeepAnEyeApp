import React, { Reducer, useEffect, useReducer, useState } from 'react';
import { Text, View } from 'react-native';
import { DataTable, Divider } from 'react-native-paper';
import { useFilterContext } from '../../Context/FilterContext';
import {
  FilterAction,
  filterReducer,
  FilterState,
  initialState,
} from '../../Context/FilterReducer';
import { usePremiseContext } from '../../Context/PremiseContext';
import { ReportGridStyle } from '../../Style/ReportGridStyleStyle';
import ErrorBoundary from '../ErrorBoundary';
import Filter from '../Filters/Filter';
import MeterDataBarChart from '../MeterDataBarChart';

// interface MonthlyReportProps {
//   selectedReport: string;
// }

export const MonthlyReport = () => {
  const [state, dispatch] = useReducer<Reducer<FilterState, FilterAction>>(
    filterReducer,
    initialState,
  );

  const [searchClicked, setSearchClicked] = useState(false);
  const [minValue, setMinValue] = useState<number | null>(null);
  const [maxValue, setMaxValue] = useState<number | null>(null);
  const [averageValue, setAverageValue] = useState<number | null>(null);
  const [sumValue, setSumValue] = useState<number | null>(null);

  const { state: filterstate } = useFilterContext();
  const { state: premiseState } = usePremiseContext();
  const productCodes = filterstate.meter.map((m) => m.ProductCode).toString();
  const productName =
    premiseState.products.find((item) => item.Code === productCodes)?.Unit ||
    '';

  const filteredResults = state.filteredResults;

  const formatMonth = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'long' });
  };

  useEffect(() => {
    if (filteredResults.length > 0) {
      const values = filteredResults.map((item) => item.Value);
      const min = Math.min(...values);
      const max = Math.max(...values);
      const sum = values.reduce((acc, val) => acc + val, 0);
      const average = sum / values.length;

      setMinValue(min);
      setMaxValue(max);
      setAverageValue(average);
      setSumValue(sum);
    }
  }, [filteredResults]);

  const renderChart = () => {
    try {
      return (
        <MeterDataBarChart
          filteredResults={filteredResults}
          resolution="Monthly"
        />
      );
    } catch (error) {
      <View>
        <Text>error message: {error.message}</Text>
        <Text>error: {error}</Text>
      </View>;
    }
  };

  return (
    <ErrorBoundary>
      <Filter
        filters={['year', 'meter']}
        setYear={(year) => dispatch({ type: 'SET_YEAR', payload: year })}
        setMeter={(meter) => dispatch({ type: 'SET_METER', payload: meter })}
        year={state.year}
        meter={state.meter}
        meterData={state.meterData}
        setFilteredResults={(data) => {
          dispatch({ type: 'SET_FILTERED_RESULTS', payload: data });
          setSearchClicked(true);
        }}
        resolution="Monthly"
        buttonText="Skapa rapport"
      />
      {searchClicked ? (
        filteredResults.length > 0 ? (
          <>
            <View>
              {/* <MeterDataBarChart
              filteredResults={filteredResults}
              resolution="Monthly"
            /> */}
              {renderChart()}
            </View>
            <View style={ReportGridStyle.container}>
              {/* {selectedReport && ( */}
              <>
                <Divider style={ReportGridStyle.header} />
                <DataTable>
                  <DataTable.Header style={ReportGridStyle.header}>
                    <DataTable.Title>Månad</DataTable.Title>
                    <DataTable.Title>
                      Förbrukning ({productName})
                    </DataTable.Title>
                  </DataTable.Header>
                  {filteredResults.map((item, index) => (
                    <DataTable.Row key={index}>
                      <DataTable.Cell>
                        {formatMonth(item.DateTime.toDateString())}
                      </DataTable.Cell>
                      <DataTable.Cell>{Math.round(item.Value)}</DataTable.Cell>
                    </DataTable.Row>
                  ))}
                  <DataTable.Row>
                    <DataTable.Cell textStyle={ReportGridStyle.columntext}>
                      Min
                    </DataTable.Cell>
                    <DataTable.Cell>{Math.round(minValue!)}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell textStyle={ReportGridStyle.columntext}>
                      Max
                    </DataTable.Cell>
                    <DataTable.Cell>{Math.round(maxValue!)}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell textStyle={ReportGridStyle.columntext}>
                      Medel
                    </DataTable.Cell>
                    <DataTable.Cell>{Math.round(averageValue!)}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell textStyle={ReportGridStyle.columntext}>
                      Summa
                    </DataTable.Cell>
                    <DataTable.Cell>{sumValue}</DataTable.Cell>
                  </DataTable.Row>
                </DataTable>
              </>
              {/* )} */}
            </View>
          </>
        ) : (
          <View style={ReportGridStyle.container}>
            <Text style={ReportGridStyle.noDataText}>Data saknas</Text>
          </View>
        )
      ) : null}
    </ErrorBoundary>
  );
};
