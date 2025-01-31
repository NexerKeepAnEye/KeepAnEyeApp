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
import Filter from '../Filters/Filter';
import MeterDataComparisonChart from '../MeterDataComparisonChart';

export const YearComparison = () => {
  const [state, dispatch] = useReducer<Reducer<FilterState, FilterAction>>(
    filterReducer,
    initialState,
  );
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
        resolution="År"
        setFilteredResults={(data) => {
          dispatch({ type: 'SET_FILTERED_RESULTS', payload: data });
          setSearchClicked(true);
        }}
        buttonText="Skapa rapport"
      />
      {searchClicked ? (
        filteredResults.length > 0 ? (
          <>
            <MeterDataComparisonChart
              filteredResults={filteredResults}
              resolution="Monthly"
              year={state.year}
              yearTwo={state.yearTwo}
            />
            <View style={ReportGridStyle.container}>
              <>
                <Divider style={ReportGridStyle.header} />
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title>År</DataTable.Title>
                    <DataTable.Title>
                      Förbrukning ({productName})
                    </DataTable.Title>
                  </DataTable.Header>
                  {filteredResults.map((item, index) => (
                    <DataTable.Row key={index}>
                      <DataTable.Cell>
                        {item.DateTime.toLocaleDateString()}
                      </DataTable.Cell>
                      <DataTable.Cell>{item.Value}</DataTable.Cell>
                    </DataTable.Row>
                  ))}
                </DataTable>
              </>
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
