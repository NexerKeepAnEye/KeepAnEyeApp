import React, { useReducer, useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { DataTable, Divider } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  FilterAction,
  filterReducer,
  FilterState,
  initialState,
} from '../Context/FilterReducer';
import { deviceHeight } from '../Style/Dimensions';
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
  const [showButton, setShowButton] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    if (scrollPosition > deviceHeight) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={1}
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
        {filterApplied ? (
          <View>
            <DataTable style={MeterDataGridStyle.gridContainer}>
              <Divider style={ReportGridStyle.header} />
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
                    <DataTable.Cell style={{ justifyContent: 'center' }}>
                      {data.DateTime.toISOString().split('T')[0]}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ justifyContent: 'center' }}>
                      {Math.round(data.Value)}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ justifyContent: 'center' }}>
                      {Math.round(data.Cost)}
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
        <View style={styles.floatingButton}>
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

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 0,
    zIndex: 1000,
    backgroundColor: '#FF7043',
    height: deviceHeight * 0.055,
    width: deviceHeight * 0.055,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
