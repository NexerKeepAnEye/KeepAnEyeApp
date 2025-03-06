import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import {
  ActivityIndicator,
  MD2Colors,
  Provider as PaperProvider,
  Text,
} from 'react-native-paper';
import { fetchMeterData } from '../../Api/fetchAPI';
import StorageService from '../../AsyncStorage/AsyncStorage';
import { useFilterContext } from '../../Context/FilterContext';
import { usePremiseContext } from '../../Context/PremiseContext';
import { useSnackbar } from '../../Context/SnackbarContext';
import { filterStyle } from '../../Style/FilterStyle';
import { searchButtonStyle } from '../../Style/SearchButtonStyle';
import { Meter, MeterData } from '../../Types/Type';
import SnackBarErrorHandling from '../../Utils/SnackBarErrorHandling';
import { FromToDate } from './FromToDate';
import MeterSearch from './MeterSearch';
import { Resolution } from './Resolution';
import StandardYearAdjusted from './StandardYearAdjusted';
import YearSearch from './YearSearch';

interface FilterProps {
  setYear?: (year: string) => void;
  setYearTwo?: (yearTwo: string) => void;
  setMeter?: (meter: Meter[]) => void;
  setFromDate?: (date: Date | undefined) => void;
  setToDate?: (date: Date | undefined) => void;
  setMeterId?: (meterId: number) => void;
  setResolution?: (resolution: string) => void;
  setFilteredResults: (data: MeterData[]) => void;
  year?: string;
  yearTwo?: string;
  meter?: Meter[];
  fromDate?: Date;
  toDate?: Date;
  meterData: MeterData[];
  meterId?: number;
  resolution?: string;
  filters: string[];
  buttonText?: string;
  showButton?: boolean;
}

const Filter = ({
  filters,
  setYear,
  setYearTwo,
  setMeter,
  setFromDate,
  setToDate,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setMeterId,
  setResolution,
  setFilteredResults,
  year,
  yearTwo,
  meter,
  fromDate,
  toDate,
  meterId,
  resolution,
  buttonText,
  showButton = true,
}: FilterProps) => {
  const { showSnackbar } = useSnackbar();
  const { state } = usePremiseContext();
  const [apikey, setApiKey] = useState<string | null>(null);
  const [correctedValues, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchApiKey = async () => {
      const key = await StorageService.getApiKey();
      setApiKey(key);
    };
    fetchApiKey();
  }, []);
  const { state: filterstate } = useFilterContext();

  const handleSearch = async () => {
    setLoading(true);
    let meterData: MeterData[] | null = null;

    if (meterId === undefined) {
      [meterId] = filterstate.meter.map((m) => m.Id);
    }

    const selectedMeterId =
      meterId !== undefined
        ? state.selectedPremise?.Meters.find((meter) => meter.Id === meterId)
        : undefined;

    const selectedMeter: Meter =
      (meter ?? []).find((m) => m.ProductId) ?? ({} as Meter);

    const selectedProductId: number =
      selectedMeterId?.ProductId ?? selectedMeter.ProductId;

    const fetchDataForDateRange = async (fromDate: Date, toDate: Date) => {
      const data = await fetchMeterData(
        apikey ?? '',
        selectedProductId ?? filterstate.meter[0].ProductId,
        translateResolution(resolution ?? ''),
        fromDate,
        toDate,
        correctedValues,
        [],
        [],
        meterId !== undefined ? [meterId] : (meter?.map((m) => m.Id) ?? []),
      );
      return data;
    };

    if (
      (filters.includes('resolution') && !resolution) ||
      (filters.includes('year') && !year) ||
      (filters.includes('fromToYear') && !year && !yearTwo) ||
      (filters.includes('dateRange') && !fromDate && !toDate) ||
      (filters.includes('meter') && !meter) ||
      (filters.includes('meter') && !meter) ||
      (filters.includes('compareYears') && !year && !yearTwo)
    ) {
      showSnackbar('Fyll i fälten');
      setLoading(false);
      return;
    }
    const translateResolution = (resolution: string) => {
      switch (resolution) {
        case 'Timma':
          return 'Hourly';
        case 'Dag':
          return 'Daily';
        case 'Månad':
          return 'Monthly';
        case 'År':
          return 'Yearly';
        default:
          return resolution;
      }
    };

    SnackBarErrorHandling(
      translateResolution(resolution ?? ''),
      fromDate,
      toDate,
      filters,
      setLoading,
      showSnackbar,
      year,
      yearTwo,
      meter,
    );

    try {
      if (year && yearTwo && filters.includes('compareYears')) {
        const year1 = parseInt(year, 10);
        const year2 = parseInt(yearTwo, 10);
        const fromDate1 = new Date(
          Date.parse(year1 < year2 ? year + '-01-01' : yearTwo + '-01-01'),
        );
        const toDate1 = new Date(
          Date.parse(year1 < year2 ? year + '-12-31' : yearTwo + '-12-31'),
        );
        const data1 = await fetchDataForDateRange(fromDate1, toDate1);
        meterData = [...(meterData ?? []), ...data1];

        const fromDate2 = new Date(
          Date.parse(year1 < year2 ? yearTwo + '-01-01' : year + '-01-01'),
        );
        const toDate2 = new Date(
          Date.parse(year1 < year2 ? yearTwo + '-12-31' : year + '-12-31'),
        );
        const data2 = await fetchDataForDateRange(fromDate2, toDate2);
        meterData = [...(meterData ?? []), ...data2];
      } else if (year && !yearTwo) {
        const fromDate = new Date(Date.parse(year + '-01-01'));
        const toDate = new Date(Date.parse(year + '-12-31'));
        meterData = await fetchDataForDateRange(fromDate, toDate);
      } else if (fromDate && toDate) {
        meterData = await fetchDataForDateRange(fromDate, toDate);
      } else if (filters.includes('fromToYear')) {
        const fromDate = new Date(Date.parse(year + '-01-01'));
        const toDate = new Date(Date.parse(yearTwo + '-12-31'));
        meterData = await fetchDataForDateRange(fromDate, toDate);
      } else {
        const fromDate = new Date();
        const toDate = new Date();
        meterData = await fetchDataForDateRange(fromDate, toDate);
      }
    } catch (error) {
      setLoading(false);
      console.log('error fetching meterdata:', error);
      showSnackbar('Ett fel inträffade');
    }

    setLoading(false);
    setFilteredResults(meterData ?? []);
  };

  return (
    <PaperProvider>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          persistentScrollbar={true}
        >
          <View style={filterStyle.container}>
            {filters.includes('year') && setYear && (
              <YearSearch
                setSelectedYear={setYear}
                label="År"
              />
            )}
            {filters.includes('fromToYear') && setYear && setYearTwo && (
              <>
                <YearSearch
                  setSelectedYear={setYear}
                  label="Från år"
                />
                <YearSearch
                  setSelectedYear={setYearTwo}
                  label="Till år"
                />
              </>
            )}
            {filters.includes('compareYears') && setYear && setYearTwo && (
              <>
                <YearSearch
                  setSelectedYear={setYear}
                  label="År"
                />
                <YearSearch
                  setSelectedYear={setYearTwo}
                  label="År"
                />
              </>
            )}
            {filters.includes('dateRange') && setFromDate && setToDate && (
              <FromToDate
                setFromDate={setFromDate}
                setToDate={setToDate}
                fromDate={fromDate ?? null}
                toDate={toDate ?? null}
              />
            )}
            {filters.includes('meter') && setMeter && (
              <MeterSearch
                setSelectedMeter={setMeter}
                meters={meter}
              />
            )}
            {filters.includes('resolution') && setResolution && (
              <Resolution setSelectedResolution={setResolution} />
            )}
            {filters.includes('standardAdjusted') && (
              <StandardYearAdjusted
                isChecked={correctedValues}
                setIsChecked={setIsChecked}
              />
            )}
          </View>
        </ScrollView>
        {showButton && (
          <View style={filterStyle.buttonContainer}>
            <TouchableOpacity
              onPress={handleSearch}
              style={
                loading
                  ? searchButtonStyle.disableButton
                  : searchButtonStyle.button
              }
              disabled={loading}
            >
              {loading ? (
                <>
                  <Text style={searchButtonStyle.text}>Hämtar...</Text>
                  <ActivityIndicator
                    animating={true}
                    color={MD2Colors.white}
                    size="small"
                    style={{ paddingLeft: 19 }}
                  />
                </>
              ) : (
                <Text style={searchButtonStyle.text}>{buttonText}</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </PaperProvider>
  );
};

export default Filter;
