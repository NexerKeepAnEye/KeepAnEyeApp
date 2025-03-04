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
import { MeterDataGridStyle } from '../../Style/MeterDataGridStyle';
import { ReportGridStyle } from '../../Style/ReportGridStyleStyle';
import Filter from '../Filters/Filter';
import MeterDataLineChart from '../MeterDataLineChart';

export default function Analysisreport() {
  const [state, dispatch] = useReducer<Reducer<FilterState, FilterAction>>(
    filterReducer,
    initialState,
  );
  const [productName, setProductName] = useState<string | null>(null);
  const [searchClicked, setSearchClicked] = useState(false);
  const [minValue, setMinValue] = useState<number | null>(null);
  const [maxValue, setMaxValue] = useState<number | null>(null);
  const [minDate, setMinDate] = useState<Date | null>(null);
  const [maxDate, setMaxDate] = useState<Date | null>(null);
  const [averageValue, setAverageValue] = useState<number | null>(null);

  const { state: filterstate } = useFilterContext();
  const { state: premiseState } = usePremiseContext();

  const filteredResults = state.filteredResults;

  const resolution = state.resolution;

  const meter = filterstate.meter;

  const productCode = meter && meter.length > 0 ? meter[0].ProductCode : null;

  useEffect(() => {
    const fetchProductName = async () => {
      if (!productCode) return;
      try {
        const products = premiseState.products;
        const product =
          products.find((item) => item.Code === productCode)?.Unit || null;
        setProductName(product);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProductName();
  }, [productCode]);

  useEffect(() => {
    if (filteredResults.length > 0) {
      const { min, max } = filteredResults.reduce(
        (acc, item) => {
          if (item.Value < acc.min.Value) {
            acc.min = item;
          }
          if (item.Value > acc.max.Value) {
            acc.max = item;
          }
          return acc;
        },
        {
          min: filteredResults[0],
          max: filteredResults[0],
        },
      );
      if (filteredResults.length > 0) {
        const values = filteredResults.map((item) => item.Value);
        const min = parseFloat(Math.min(...values).toFixed(2));
        const max = parseFloat(Math.max(...values).toFixed(2));
        const sum = values.reduce((acc, val) => acc + val, 0);
        const average = parseFloat((sum / values.length).toFixed(2));

        setMinValue(min);
        setMaxValue(max);
        setAverageValue(average);
      }

      setMinValue(parseFloat(min.Value.toFixed(2)));
      setMaxValue(parseFloat(max.Value.toFixed(2)));
      setMinDate(min.DateTime);
      setMaxDate(max.DateTime);
    }
  }, [filteredResults]);

  const renderChart = () => {
    try {
      return (
        <MeterDataLineChart
          filteredResults={filteredResults}
          resolution={resolution}
          productName={productName}
          maxValue={maxValue}
        />
      );
    } catch (error) {
      return (
        <View>
          <Text>error message: {error.message}</Text>
          <Text>error: {error}</Text>
        </View>
      );
    }
  };

  return (
    <View>
      <View>
        <Filter
          filters={['dateRange', 'meter', 'resolution']}
          setFromDate={(fromDate) =>
            dispatch({ type: 'SET_FROM_DATE', payload: fromDate })
          }
          setToDate={(toDate) =>
            dispatch({ type: 'SET_TO_DATE', payload: toDate })
          }
          setMeter={(meter) => dispatch({ type: 'SET_METER', payload: meter })}
          setResolution={(resolution) =>
            dispatch({ type: 'SET_RESOLUTION', payload: resolution })
          }
          fromDate={state.fromDate}
          toDate={state.toDate}
          meter={state.meter}
          meterData={state.meterData}
          resolution={state.resolution}
          setFilteredResults={(data) => {
            dispatch({ type: 'SET_FILTERED_RESULTS', payload: data });
            setSearchClicked(true);
          }}
          buttonText="Skapa rapport"
        />
      </View>
      {searchClicked ? (
        filteredResults.length > 0 ? (
          <>
            {renderChart()}
            <View style={ReportGridStyle.container}>
              <Divider style={ReportGridStyle.header} />
              <DataTable style={MeterDataGridStyle.gridContainer}>
                <DataTable.Header style={ReportGridStyle.header}>
                  <DataTable.Title style={{ flex: 1.5 }}>
                    {filterstate.meter[0].Name}
                  </DataTable.Title>
                  <DataTable.Title
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    Värde ({productName})
                  </DataTable.Title>
                  <DataTable.Title
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    Datum
                  </DataTable.Title>
                </DataTable.Header>
                <DataTable.Row>
                  <DataTable.Cell
                    textStyle={[ReportGridStyle.columntext]}
                    style={{ flex: 1.5 }}
                  >
                    Min
                  </DataTable.Cell>
                  <DataTable.Cell style={{ flex: 1, justifyContent: 'center' }}>
                    {minValue!}
                  </DataTable.Cell>
                  <DataTable.Cell style={{ flex: 1, justifyContent: 'center' }}>
                    {minDate ? new Date(minDate).toLocaleDateString() : ''}
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell
                    textStyle={ReportGridStyle.columntext}
                    style={{ flex: 1.5 }}
                  >
                    Max
                  </DataTable.Cell>
                  <DataTable.Cell style={{ flex: 1, justifyContent: 'center' }}>
                    {maxValue!}
                  </DataTable.Cell>
                  <DataTable.Cell style={{ flex: 1, justifyContent: 'center' }}>
                    {maxDate ? new Date(maxDate).toLocaleDateString() : ''}
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell
                    textStyle={ReportGridStyle.columntext}
                    style={{ flex: 1.5 }}
                  >
                    Medel
                  </DataTable.Cell>
                  <DataTable.Cell style={{ flex: 1, justifyContent: 'center' }}>
                    {averageValue!}
                  </DataTable.Cell>
                  <DataTable.Cell style={{ flex: 1, justifyContent: 'center' }}>
                    {' '}
                  </DataTable.Cell>
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
}
