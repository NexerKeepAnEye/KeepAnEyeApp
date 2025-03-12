import React, { Reducer, useEffect, useReducer, useState } from 'react';
import { Text, View } from 'react-native';
import { DataTable, Divider } from 'react-native-paper';
import {
  FilterAction,
  filterReducer,
  FilterState,
  initialState,
} from '../../Context/FilterReducer';
import { usePremiseContext } from '../../Context/PremiseContext';
import { ReportGridStyle } from '../../Style/ReportGridStyleStyle';
import { MeterData } from '../../Types/Type';
import { formatValue } from '../../Utils/FormatValue';
import Filter from '../Filters/Filter';
import MeterDataComparisonChart from '../MeterDataComparisonChart';

export const YearComparison = () => {
  const [state, dispatch] = useReducer<Reducer<FilterState, FilterAction>>(
    filterReducer,
    initialState,
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [productName, setProductName] = useState<string | null>(null);
  const [searchClicked, setSearchClicked] = useState(false);
  const filteredResults = state.filteredResults;
  const { state: premiseState } = usePremiseContext();

  const meter = state.meter;
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

  const dataForYear = filteredResults.filter(
    (item) =>
      state.year &&
      new Date(item.DateTime).getFullYear() === parseInt(state.year),
  );

  const dataForYearTwo = filteredResults.filter(
    (item) =>
      state.yearTwo &&
      new Date(item.DateTime).getFullYear() === parseInt(state.yearTwo),
  );

  const getMonthName = (monthIndex: number) => {
    const date = new Date(2000, monthIndex, 1);
    date.setMonth(monthIndex);
    return date.toLocaleString('default', { month: 'long' });
  };

  const months = Array.from({ length: 12 }, (_, index) => getMonthName(index));

  const calculatePercentageChange = (value1: number, value2: number) => {
    if (value1 === 0) return value2 === 0 ? 0 : 100;
    return ((value2 - value1) / value1) * 100;
  };

  const aggregateDataByMonth = (data: MeterData[]) => {
    const aggregatedData = Array(12).fill(0);
    data.forEach((item) => {
      const date = new Date(item.DateTime);
      const month = date.getMonth();
      aggregatedData[month] += item.Value;
    });
    return aggregatedData;
  };

  const aggregatedDataForYear = aggregateDataByMonth(dataForYear);
  const aggregatedDataForYearTwo = aggregateDataByMonth(dataForYearTwo);

  const renderPoints = () => {
    const points = [
      { label: state.year, color: '#ea5b0c' },
      { label: state.yearTwo, color: '#AF220A' },
    ];

    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 20,
        }}
      >
        {points.map((point, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                height: 15,
                width: 15,
                borderRadius: 10,
                backgroundColor: point.color,
                marginRight: 8,
              }}
            />
            <Text
              style={{
                height: 20,
                color: '#ababab',
              }}
            >
              {point.label}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const renderChart = () => {
    try {
      return (
        <MeterDataComparisonChart
          filteredResults={filteredResults}
          year={state.year}
          yearTwo={state.yearTwo}
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
    <>
      <Filter
        filters={['compareYears', 'meter']}
        setYear={(year) => dispatch({ type: 'SET_YEAR', payload: year })}
        setYearTwo={(year) => dispatch({ type: 'SET_YEAR_TWO', payload: year })}
        setMeter={(meter) => dispatch({ type: 'SET_METER', payload: meter })}
        year={state.year}
        yearTwo={state.yearTwo}
        meter={state.meter}
        meterData={state.meterData}
        resolution="Månad"
        setFilteredResults={(data) => {
          dispatch({ type: 'SET_FILTERED_RESULTS', payload: data });
          setSearchClicked(true);
        }}
        buttonText="Skapa rapport"
      />
      {searchClicked ? (
        filteredResults.length > 0 ? (
          <>
            {renderPoints()}
            {renderChart()}
            <View style={ReportGridStyle.container}>
              <Divider style={ReportGridStyle.header} />
              <DataTable>
                <DataTable.Header style={ReportGridStyle.header}>
                  <DataTable.Title>Månad</DataTable.Title>
                  <DataTable.Title>{state.year}</DataTable.Title>
                  <DataTable.Title>{state.yearTwo}</DataTable.Title>
                  <DataTable.Title>Föränding %</DataTable.Title>
                </DataTable.Header>
                {months.map((month, index) => {
                  const valueYear = aggregatedDataForYear[index];
                  const valueYearTwo = aggregatedDataForYearTwo[index];
                  const percentageChange = calculatePercentageChange(
                    valueYear,
                    valueYearTwo,
                  );
                  return (
                    <DataTable.Row key={index}>
                      <DataTable.Cell>{month}</DataTable.Cell>
                      <DataTable.Cell>{formatValue(valueYear)}</DataTable.Cell>
                      <DataTable.Cell>
                        {formatValue(valueYearTwo)}
                      </DataTable.Cell>
                      <DataTable.Cell>
                        {percentageChange.toFixed(2)}%
                      </DataTable.Cell>
                    </DataTable.Row>
                  );
                })}
              </DataTable>
            </View>
          </>
        ) : (
          <View style={ReportGridStyle.container}>
            <Text style={ReportGridStyle.noDataText}>Data saknas</Text>
          </View>
        )
      ) : null}
    </>
  );
};
