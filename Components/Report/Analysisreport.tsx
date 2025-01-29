import React, { Reducer, useEffect, useReducer, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { DataTable, Divider } from 'react-native-paper';
import {
  FilterAction,
  filterReducer,
  FilterState,
  initialState,
} from '../../Context/FilterReducer';
import { usePremiseContext } from '../../Context/PremiseContext';
import { ReportGridStyle } from '../../Style/ReportGridStyleStyle';
import Filter from '../Filters/Filter';

export default function Analysisreport() {
  const [state, dispatch] = useReducer<Reducer<FilterState, FilterAction>>(
    filterReducer,
    initialState,
  );
  const [searchClicked, setSearchClicked] = useState(false);
  const [minValue, setMinValue] = useState<number | null>(null);
  const [max, setMaxValue] = useState<number | null>(null);
  const [minDate, setMinDate] = useState<Date | null>(null);
  const [maxDate, setMaxDate] = useState<Date | null>(null);
  const filteredResults = state.filteredResults;
  const resolution = state.resolution;
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    switch (resolution) {
      case 'Dag':
        return `${date.getDate()}/${date.getMonth() + 1}`; // Dag och månad

      case 'Timma':
        return `${date.getDate()}/${date.getMonth() + 1}`; // Dag och månad
      case 'Månad':
        return `${date.getMonth() + 1}/${date.getFullYear()}`; // Dag och månad
      case 'År':
        return `${date.getFullYear()}`; // Endast år
      default:
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().split('20')[1]}`; // Dag och månad
    }
  };

  const formattedData = filteredResults.map((item) => ({
    value: item.Value || 0,
    label: formatDate(item.DateTime),
    customDataPoint: () => (
      <View style={{ alignItems: 'center' }}>
        <View
          style={{
            height: 6,
            width: 6,
            borderRadius: 5,
            backgroundColor: '#ea5b0c',
          }}
        />
      </View>
    ),
  }));

  const maxValue =
    Math.round(Math.max(...filteredResults.map((item) => item.Value)) / 10) *
    12;
  const roundMaxValue = Math.round(maxValue / 1000) * 1000;
  // const step = maxValue / 4;
  const meter = state.meter;
  const [productName, setProductName] = useState<string | null>(null);
  const { state: premiseState } = usePremiseContext();
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

      setMinValue(min.Value);
      setMaxValue(max.Value);
      setMinDate(min.DateTime);
      setMaxDate(max.DateTime);
    }
  }, [filteredResults]);

  return (
    <View style={{ marginBottom: 100 }}>
      <View>
        <Filter
          filters={['dateRange', 'meter', 'resolution']}
          setMeter={(meter) => dispatch({ type: 'SET_METER', payload: meter })}
          setFromDate={(fromDate) =>
            dispatch({ type: 'SET_FROM_DATE', payload: fromDate })
          }
          setToDate={(toDate) =>
            dispatch({ type: 'SET_TO_DATE', payload: toDate })
          }
          setResolution={(resolution) =>
            dispatch({ type: 'SET_RESOLUTION', payload: resolution })
          }
          meter={state.meter}
          meterData={state.meterData}
          fromDate={state.fromDate}
          toDate={state.toDate}
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
            <ScrollView horizontal>
              <LineChart
                areaChart
                hideDataPoints1
                data={formattedData}
                startFillColor="#ea5b0c"
                startOpacity={0.3}
                height={250}
                noOfSections={4}
                maxValue={roundMaxValue}
                focusEnabled
                adjustToWidth={true}
                showDataPointLabelOnFocus
                xAxisType="dashed"
                yAxisLabelWidth={45}
                rotateLabel
                labelsExtraHeight={40}
                xAxisLabelsHeight={15}
                xAxisLabelsVerticalShift={10}
                showTextOnFocus={true}
                showVerticalLines
                spacing={20}
                initialSpacing={10}
                endSpacing={30}
                color1="#ea5b0c"
                textColor1="#222"
                textFontSize1={15}
                dataPointsHeight={12}
                dataPointsWidth={12}
                dataPointsColor1="#ea5b0c"
                overflowTop={1}
                pointerConfig={{
                  pointerStripHeight: 100,
                  pointerStripColor: 'transparent',
                  pointerStripWidth: 2,
                  pointerColor: '#ea5b0c',
                  radius: 6,
                  pointerLabelWidth: 100,
                  pointerLabelHeight: 60,
                  pointerStripUptoDataPoint: true,
                  autoAdjustPointerLabelPosition: true,
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  pointerLabelComponent: (items: any[]) => {
                    const item = items[0];

                    return (
                      <View
                        style={{
                          width: 70,
                          height: 60,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: 'white',
                          borderRadius: 4,
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.8,
                          shadowRadius: 2,
                          elevation: 5,
                          // left: 5,
                          overflow: 'visible',
                        }}
                      >
                        <Text>{item.label}</Text>
                        <Text style={{ fontWeight: 'bold' }}>
                          {item.value + ' ' + productName}
                        </Text>
                      </View>
                    );
                  },
                }}
              />
            </ScrollView>
            <View style={ReportGridStyle.container}>
              <Divider style={ReportGridStyle.header} />
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>{state.meter[0].Name}</DataTable.Title>
                  <DataTable.Title>Value</DataTable.Title>
                  <DataTable.Title>Date</DataTable.Title>
                </DataTable.Header>
                <DataTable.Row>
                  <DataTable.Cell>Min</DataTable.Cell>
                  <DataTable.Cell>
                    {minValue} {productName}
                  </DataTable.Cell>
                  <DataTable.Cell>
                    {minDate ? new Date(minDate).toLocaleString() : ''}
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Max</DataTable.Cell>
                  <DataTable.Cell>
                    {max} {productName}
                  </DataTable.Cell>
                  <DataTable.Cell>
                    {maxDate ? new Date(maxDate).toLocaleString() : ''}
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
