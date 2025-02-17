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
  buttonText: string;
}

const Filter = ({
  filters,
  setYear,
  setYearTwo,
  setMeter,
  setFromDate,
  setToDate,
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
        [] /*state.selectedPremise?.Id ? [state.selectedPremise.Id] : [],*/,
        [],
        meterId !== undefined ? [meterId] : (meter?.map((m) => m.Id) ?? []),
      );
      return data;
    };

    if (
      (filters.includes('resolution') && !resolution) ||
      (filters.includes('year') && !year) ||
      (filters.includes('fromToYear') && !year && !yearTwo) ||
      (filters.includes('meter') && !meter) ||
      (filters.includes('dateRange') && !fromDate && !toDate) ||
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

    if (year && yearTwo) {
      fromDate = new Date(Date.parse(year + '-01-01'));
      toDate = new Date(Date.parse(yearTwo + '-12-31'));
    }
    if (year && !yearTwo) {
      fromDate = new Date(Date.parse(year + '-01-01'));
      toDate = new Date(Date.parse(year + '-12-31'));
    }

    if (translateResolution(resolution ?? '') === 'Yearly') {
      const yearDiff =
        fromDate && toDate ? toDate.getFullYear() - fromDate.getFullYear() : 0;
      if (yearDiff > 5) {
        showSnackbar('För stor tidsperiod, max 5 år');
        setLoading(false);

        return;
      }
    }
    if (
      translateResolution(resolution ?? '') === 'Monthly' &&
      !filters.includes('compareYears')
    ) {
      const monthDiff =
        fromDate && toDate
          ? toDate.getMonth() -
            fromDate.getMonth() +
            12 * (toDate.getFullYear() - fromDate.getFullYear())
          : 0;
      if (monthDiff > 12) {
        showSnackbar('För stor tidsperiod, max 12 månader');
        setLoading(false);

        return;
      }
    }
    if (translateResolution(resolution ?? '') === 'Daily') {
      const dayDiff =
        fromDate && toDate
          ? Math.floor((toDate.getTime() - fromDate.getTime()) / 86400000)
          : 0;
      if (dayDiff > 90) {
        showSnackbar('För stor tidsperiod, max 90 dagar');
        setLoading(false);

        return;
      }
    }

    if (translateResolution(resolution ?? '') === 'Hourly') {
      const dayDiff =
        fromDate && toDate
          ? Math.floor((toDate.getTime() - fromDate.getTime()) / 86400000)
          : 0;
      // console.log('dayDiff:', dayDiff);
      if (dayDiff > 31) {
        showSnackbar('För stor tidsperiod, max 31 dagar');
        setLoading(false);
        return;
      }
    }

    try {
      if (year && yearTwo && filters.includes('compareYears')) {
        const fromDate1 = new Date(Date.parse(year + '-01-01'));
        const toDate1 = new Date(Date.parse(year + '-12-31'));
        const data1 = await fetchDataForDateRange(fromDate1, toDate1);
        meterData = [...(meterData ?? []), ...data1];

        const fromDate2 = new Date(Date.parse(yearTwo + '-01-01'));
        const toDate2 = new Date(Date.parse(yearTwo + '-12-31'));
        const data2 = await fetchDataForDateRange(fromDate2, toDate2);
        meterData = [...(meterData ?? []), ...data2];
      } else if (year && !yearTwo) {
        const fromDate = new Date(Date.parse(year + '-01-01'));
        const toDate = new Date(Date.parse(year + '-12-31'));
        meterData = await fetchDataForDateRange(fromDate, toDate);
      } else if (fromDate && toDate) {
        meterData = await fetchDataForDateRange(fromDate, toDate);
      } else if (year && yearTwo && filters.includes('fromToYear')) {
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

    let filteredData = meterData ?? [];

    if (year && !yearTwo) {
      if (Array.isArray(filteredData)) {
        filteredData = filteredData.filter((item: MeterData) => {
          const itemYear = new Date(item.DateTime).getFullYear();
          return itemYear === parseInt(year, 10);
        });
      }
    }

    if (fromDate && toDate) {
      filteredData = filteredData.filter((item: MeterData) => {
        const itemDate = new Date(item.DateTime);
        return fromDate && toDate
          ? itemDate >= fromDate && itemDate <= toDate
          : false;
      });
    }

    if (meter && meter.length > 0) {
      filteredData = filteredData.filter((item: MeterData) =>
        meter.some((m) => m.Id === item.MeterId),
      );
    }

    if (meterId !== null && meterId !== undefined) {
      filteredData = filteredData.filter(
        (data: MeterData) => data.MeterId === meterId,
      );
      if (setMeterId) {
        setMeterId(meterId);
      }
    }
    setLoading(false);
    setFilteredResults(filteredData);
  };

  return (
    <PaperProvider>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ScrollView horizontal>
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
              {filters.includes('meter') && setMeter && (
                <MeterSearch
                  setSelectedMeter={setMeter}
                  meters={meter}
                />
              )}
              {filters.includes('dateRange') && setFromDate && setToDate && (
                <FromToDate
                  setFromDate={setFromDate}
                  setToDate={setToDate}
                  fromDate={fromDate ?? null}
                  toDate={toDate ?? null}
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
        </View>
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
      </View>
    </PaperProvider>
  );
};

export default Filter;
