import React, { Reducer, useEffect, useReducer, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { DataTable, Divider } from 'react-native-paper';
import { useFilterContext } from '../../Context/FilterContext';
import {
  FilterAction,
  filterReducer,
  FilterState,
  initialState,
} from '../../Context/FilterReducer';
import { usePremiseContext } from '../../Context/PremiseContext';
import { deviceHeight, deviceWidth } from '../../Style/Dimensions';
import { MeterDataGridStyle } from '../../Style/MeterDataGridStyle';
import { ReportGridStyle } from '../../Style/ReportGridStyleStyle';
import Filter from '../Filters/Filter';

export default function Analysisreport() {
  const [state, dispatch] = useReducer<Reducer<FilterState, FilterAction>>(
    filterReducer,
    initialState,
  );
  const { state: filterstate } = useFilterContext();

  const [searchClicked, setSearchClicked] = useState(false);
  const [minValue, setMinValue] = useState<number | null>(null);
  const [maxValue, setMaxValue] = useState<number | null>(null);
  const [minDate, setMinDate] = useState<Date | null>(null);
  const [maxDate, setMaxDate] = useState<Date | null>(null);
  const [averageValue, setAverageValue] = useState<number | null>(null);
  const filteredResults = state.filteredResults;
  const resolution = state.resolution;

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    switch (resolution) {
      case 'Dag':
        return `${date.getDate()}/${date.getMonth() + 1}`;
      case 'Timma':
        return `${date.getDate()}/${date.getMonth() + 1}`;
      case 'Månad':
        return `${date.getMonth() + 1}/${date.getFullYear()}`;
      case 'År':
        return `${date.getFullYear()}`;
      default:
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().split('20')[1]}`;
    }
  };

  const getFormattedData = () => {
    const totalPoints = filteredResults.length;
    const seenDates = new Set();

    if (totalPoints === 0) {
      return [];
    }
    if (totalPoints <= 7) {
      return filteredResults
        .map((item, index) => {
          const formattedDate = formatDate(item.DateTime);
          if (
            seenDates.has(formattedDate) ||
            (index === 1 && (resolution === 'Timma' || resolution === 'Dag')) ||
            (index === totalPoints - 2 &&
              (resolution === 'Timma' || resolution === 'Dag'))
          ) {
            return null;
          }
          seenDates.add(formattedDate);
          return {
            value: item.Value || 0,
            label: formattedDate,
            date: `${new Date(item.DateTime).toLocaleDateString()} ${new Date(item.DateTime).toLocaleTimeString()}`,
          };
        })
        .filter((item) => item && !isNaN(item.value));
    }

    const step = Math.round((totalPoints - 2) / 6);

    return filteredResults
      .map((item, index) => {
        const formattedDate = formatDate(item.DateTime);
        if (
          index !== 0 &&
          index !== totalPoints - 1 &&
          (index - 1) % step !== 0 &&
          index >= 0
        ) {
          return {
            value: item.Value || 0,
            label: '',
            date: `${new Date(item.DateTime).toLocaleDateString()} ${new Date(item.DateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          };
        }
        if (
          seenDates.has(formattedDate) ||
          (index === 1 && (resolution === 'Timma' || resolution === 'Dag')) ||
          (index === totalPoints - 3 &&
            (resolution === 'Timma' || resolution === 'Dag'))
        ) {
          return null;
        }
        seenDates.add(formattedDate);
        return {
          value: item.Value || 0,
          label: formattedDate,
          date: `${new Date(item.DateTime).toLocaleDateString()} ${new Date(item.DateTime).toLocaleTimeString()}`,
        };
      })
      .filter((item) => item && !isNaN(item.value));
  };

  const formattedData = getFormattedData().filter((item) => !isNaN(item.value));

  const roundMaxValue = Math.round(maxValue) * 1.5;
  const meter = filterstate.meter;
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

  const dynamicSpacing =
    (deviceWidth * 2 - deviceWidth * 0.16) / filteredResults.length;
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
            <ScrollView horizontal>
              <LineChart
                areaChart
                hideDataPoints1
                data={formattedData}
                startFillColor="#ea5b0c"
                startOpacity={0.3}
                height={deviceHeight * 0.27}
                noOfSections={4}
                maxValue={roundMaxValue}
                focusEnabled
                adjustToWidth
                showDataPointLabelOnFocus
                yAxisLabelWidth={deviceWidth * 0.1}
                labelsExtraHeight={deviceHeight * 0.055}
                xAxisLabelsHeight={deviceHeight * 0.025}
                xAxisLabelsVerticalShift={10}
                showTextOnFocus={true}
                spacing={
                  filteredResults.length < 8
                    ? dynamicSpacing / 3
                    : dynamicSpacing / 2
                }
                initialSpacing={20}
                endSpacing={deviceWidth * 0.08}
                xAxisLabelTextStyle={{ right: 20 }}
                color1="#ea5b0c"
                textColor1="#222"
                textFontSize1={deviceHeight * 0.02}
                dataPointsHeight={deviceHeight * 0.02}
                dataPointsWidth={deviceWidth * 0.02}
                dataPointsColor1="#ea5b0c"
                overflowTop={1}
                pointerConfig={{
                  pointerStripHeight: deviceHeight * 0.2,
                  pointerStripColor: 'transparent',
                  pointerStripWidth: 2,
                  pointerColor: '#ea5b0c',
                  radius: 6,
                  pointerLabelWidth: deviceWidth * 0.15,
                  pointerLabelHeight: deviceHeight * 0.07,
                  pointerStripUptoDataPoint: true,
                  autoAdjustPointerLabelPosition: true,
                  pointerVanishDelay: 15000,
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  pointerLabelComponent: (items: any[]) => {
                    const item = items[0];

                    return (
                      <View
                        style={{
                          minWidth: deviceWidth * 0.2,
                          minHeight: deviceHeight * 0.06,
                          maxHeight: deviceHeight * 1,
                          maxWidth: deviceWidth * 0.3,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: 'white',
                          borderRadius: 4,
                          shadowColor: '#000',
                          shadowOffset: {
                            width: deviceWidth * 0,
                            height: deviceHeight * 0.01,
                          },
                          shadowOpacity: 0.8,
                          shadowRadius: 2,
                          elevation: 5,
                          overflow: 'visible',
                          bottom: deviceHeight * 0.02,
                        }}
                      >
                        <Text>{item.date}</Text>
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
              <DataTable style={MeterDataGridStyle.gridContainer}>
                <DataTable.Header style={ReportGridStyle.header}>
                  <DataTable.Title style={{ flex: 1.5 }}>
                    {filterstate.meter[0].Name}
                  </DataTable.Title>
                  <DataTable.Title
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    Värde
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
