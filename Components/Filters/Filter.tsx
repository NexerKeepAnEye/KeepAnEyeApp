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
import { TimeConverter } from '../../Utils/TimeConverter';

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

    if (
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
      ) === 'error'
    ) {
      return;
    }

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

    const FetchData = async (fromDate: Date, toDate: Date) => {
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

    try {
      const fetchYearlyData = async (start: string, end: string) => {
        const fromDate = new Date(Date.parse(start + '-01-01T00:00:00'));
        const toDate = new Date(Date.parse(end + '-12-31T23:59:59'));
        return await FetchData(fromDate, toDate);
      };

      if (filters.includes('compareYears')) {
        const [startYear, endYear] = [
          parseInt(year, 10),
          parseInt(yearTwo, 10),
        ].sort();
        meterData = [
          ...(await fetchYearlyData(
            startYear.toString(),
            startYear.toString(),
          )),
          ...(await fetchYearlyData(endYear.toString(), endYear.toString())),
        ];
      } else if (filters.includes('year')) {
        meterData = await fetchYearlyData(year, year);
      } else if (filters.includes('yearRange')) {
        meterData = await fetchYearlyData(year, yearTwo);
      } else {
        const convertedDate = TimeConverter({
          fromDate: fromDate,
          toDate: toDate,
        });

        meterData = await FetchData(
          convertedDate.fromDate,
          convertedDate.toDate,
        );
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
            {filters.includes('yearRange') && setYear && setYearTwo && (
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
