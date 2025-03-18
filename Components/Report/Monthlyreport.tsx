import React, { Reducer, useEffect, useReducer, useState } from 'react';
import { Text, View } from 'react-native';
import { DataTable, Divider, List } from 'react-native-paper';
import { useFilterContext } from '../../Context/FilterContext';
import {
  FilterAction,
  filterReducer,
  FilterState,
  initialState,
} from '../../Context/FilterReducer';
import { usePremiseContext } from '../../Context/PremiseContext';
import { filterStyle } from '../../Style/FilterStyle';
import { ReportGridStyle } from '../../Style/ReportGridStyleStyle';
import { formatValue } from '../../Utils/FormatValue';
import Filter from '../Filters/Filter';
import MeterDataBarChart from '../MeterDataBarChart';

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
      const min = parseFloat(Math.min(...values).toFixed(2));
      const max = parseFloat(Math.max(...values).toFixed(2));
      const sum = values.reduce((acc, val) => acc + val, 0);
      const average = parseFloat((sum / values.length).toFixed(2));

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

  const [expanded, setExpanded] = useState(false);

  const handlePress = () => setExpanded(!expanded);

  return (
    <View>
      <View style={filterStyle.accordionView}>
        <List.Accordion
          title="Filter"
          expanded={expanded}
          onPress={handlePress}
          style={filterStyle.accordion}
          titleStyle={filterStyle.accordionText}
        >
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
            resolution="Monthly"
            buttonText="Skapa rapport"
          />
        </List.Accordion>
      </View>
      {searchClicked ? (
        filteredResults.length > 0 ? (
          <>
            <View>{renderChart()}</View>
            <View style={ReportGridStyle.container}>
              <Divider style={ReportGridStyle.header} />
              <DataTable>
                <DataTable.Header style={ReportGridStyle.header}>
                  <DataTable.Title>Månad</DataTable.Title>
                  <DataTable.Title>Förbrukning ({productName})</DataTable.Title>
                </DataTable.Header>
                {filteredResults.map((item, index) => (
                  <DataTable.Row key={index}>
                    <DataTable.Cell>
                      {formatMonth(item.DateTime.toDateString())}
                    </DataTable.Cell>
                    <DataTable.Cell>{formatValue(item.Value!)}</DataTable.Cell>
                  </DataTable.Row>
                ))}
                <DataTable.Row>
                  <DataTable.Cell textStyle={ReportGridStyle.columntext}>
                    Min
                  </DataTable.Cell>
                  <DataTable.Cell>{formatValue(minValue!)}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell textStyle={ReportGridStyle.columntext}>
                    Max
                  </DataTable.Cell>
                  <DataTable.Cell>{formatValue(maxValue!)}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell textStyle={ReportGridStyle.columntext}>
                    Medel
                  </DataTable.Cell>
                  <DataTable.Cell>{formatValue(averageValue!)}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell textStyle={ReportGridStyle.columntext}>
                    Summa
                  </DataTable.Cell>
                  <DataTable.Cell>{formatValue(sumValue!)}</DataTable.Cell>
                </DataTable.Row>
              </DataTable>
            </View>
          </>
        ) : (
          <View style={ReportGridStyle.container}>
            <Text style={ReportGridStyle.noDataText}>Data saknas</Text>
          </View>
        )
      ) : null}
    </View>
  );
};
