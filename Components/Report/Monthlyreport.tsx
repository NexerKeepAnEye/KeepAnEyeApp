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
import MeterDataBarChart from '../MeterDataBarChart';

// interface MonthlyReportProps {
//   selectedReport: string;
// }

export const MonthlyReport = () => {
  const [state, dispatch] = useReducer<Reducer<FilterState, FilterAction>>(
    filterReducer,
    initialState,
  );

  const [productName, setProductName] = useState<string | null>(null);

  const [searchClicked, setSearchClicked] = useState(false);

  const filteredResults = state.filteredResults;

  const formatMonth = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'long' });
  };

  const { state: premiseState } = usePremiseContext();

  const meter = state.meter;
  // console.log(meter);
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
        filters={['year', 'meter', 'dateRange']}
        setYear={(year) => dispatch({ type: 'SET_YEAR', payload: year })}
        setMeter={(meter) => dispatch({ type: 'SET_METER', payload: meter })}
        setFromDate={(fromDate) => {
          if (fromDate !== null) {
            dispatch({ type: 'SET_FROM_DATE', payload: fromDate });
          }
        }}
        setToDate={(toDate) => {
          if (toDate !== null) {
            dispatch({ type: 'SET_TO_DATE', payload: toDate });
          }
        }}
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
              <MeterDataBarChart filteredResults={filteredResults} />
            </View>
            <View style={ReportGridStyle.container}>
              {/* {selectedReport && ( */}
              <>
                <Divider style={ReportGridStyle.header} />
                <DataTable>
                  <DataTable.Header>
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
                      <DataTable.Cell>{item.Value}</DataTable.Cell>
                    </DataTable.Row>
                  ))}
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
    </>
  );
};
