import React, { useReducer, useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { DataTable, Divider, List } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  FilterAction,
  filterReducer,
  FilterState,
  initialState,
} from '../Context/FilterReducer';
import { usePremiseContext } from '../Context/PremiseContext';
import { deviceHeight } from '../Style/Dimensions';
import { filterStyle } from '../Style/FilterStyle';
import { MeterDataGridStyle } from '../Style/MeterDataGridStyle';
import { ReportGridStyle } from '../Style/ReportGridStyleStyle';
import { MeterData } from '../Types/Type';
import { formatValue } from '../Utils/FormatValue';
import Filter from './Filters/Filter';

type Props = {
  meterId: number;
  meterData: MeterData[];
};

export default function MeterDataGrid({ meterId }: Props) {
  const [state, dispatch] = useReducer<
    React.Reducer<FilterState, FilterAction>
  >(filterReducer, initialState);

  const { state: product } = usePremiseContext();
  const [filteredResults, setFilteredResults] = useState<MeterData[]>([]);
  const [filterApplied, setFilterApplied] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);

  const selectedMeter =
    meterId !== undefined
      ? product.selectedPremise?.Meters.find((meter) => meter.Id === meterId)
      : undefined;

  const productCode = selectedMeter?.ProductCode || '';
  const productName =
    product.products.find((item) => item.Code === productCode)?.Unit || '';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    if (scrollPosition > deviceHeight) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const displayByRes = (resolution: string, data: MeterData) => {
    switch (resolution) {
      case 'Timma':
        return resolution === 'Timma'
          ? data.DateTime.toLocaleDateString().slice(5, 10) +
              ' ' +
              data.DateTime.toLocaleTimeString().slice(0, 5)
          : data.DateTime.toLocaleDateString();
      case 'Dag':
        return resolution === 'Dag'
          ? data.DateTime.toLocaleDateString()
          : data.DateTime.toLocaleDateString();
      case 'Månad':
        return resolution === 'Månad'
          ? data.DateTime.toLocaleDateString().slice(0, 7)
          : data.DateTime.toLocaleDateString();
      case 'År':
        return resolution === 'År'
          ? data.DateTime.toLocaleDateString().slice(0, 4)
          : data.DateTime.toLocaleDateString();
      default:
        return data.DateTime.toLocaleDateString();
    }
  };

  const [expanded, setExpanded] = useState(false);

  const handlePress = () => setExpanded(!expanded);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={1}
      >
        <View style={filterStyle.accordionView}>
          <List.Accordion
            title="Filter"
            expanded={expanded}
            onPress={handlePress}
            style={filterStyle.accordion}
            titleStyle={filterStyle.accordionText}
          >
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
            />
          </List.Accordion>
        </View>
        {filterApplied ? (
          <View>
            <DataTable style={MeterDataGridStyle.gridContainer}>
              <Divider style={ReportGridStyle.header} />
              <DataTable.Header style={MeterDataGridStyle.header}>
                <DataTable.Title textStyle={MeterDataGridStyle.title}>
                  Datum
                </DataTable.Title>
                <DataTable.Title textStyle={MeterDataGridStyle.title}>
                  Värde ({productName})
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
                    <DataTable.Cell style={{ justifyContent: 'center' }}>
                      {displayByRes(state.resolution, data)}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ justifyContent: 'center' }}>
                      {formatValue(data.Value)}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ justifyContent: 'center' }}>
                      {formatValue(data.Cost)}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ justifyContent: 'center' }}>
                      {data.Code}
                    </DataTable.Cell>
                  </DataTable.Row>
                ))
              ) : (
                <Text style={ReportGridStyle.noDataText}>Data saknas</Text>
              )}
            </DataTable>
          </View>
        ) : null}
      </ScrollView>
      {showButton && (
        <View style={MeterDataGridStyle.goToTop}>
          <TouchableOpacity
            onPress={() => {
              scrollViewRef.current?.scrollTo({ y: 0, animated: true });
            }}
          >
            <MaterialIcons
              name="arrow-upward"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
