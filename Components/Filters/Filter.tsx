import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import { fetchMeterData } from '../../Api/fetchAPI';
import StorageService from '../../AsyncStorage/AsyncStorage';
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
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const fetchApiKey = async () => {
      const key = await StorageService.getApiKey();
      setApiKey(key);
    };
    fetchApiKey();
  }, []);

  const handleSearch = async () => {
    let meterData;

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

    const selectedMeterId =
      meterId !== undefined
        ? state.selectedPremise?.Meters.find((meter) => meter.Id === meterId)
        : undefined;

    const selectedMeter: Meter =
      (meter ?? []).find((m) => m.ProductId) ?? ({} as Meter);

    const selectedProductId: number =
      selectedMeterId?.ProductId ?? selectedMeter.ProductId;

    try {
      meterData = await fetchMeterData(
        apikey ?? '',
        selectedProductId,
        translateResolution(resolution ?? ''),
        fromDate ?? new Date(),
        toDate ?? new Date(),
        isChecked,
        state.selectedPremise?.Id ? [state.selectedPremise.Id] : [],
        state.selectedPremise?.Designation
          ? [state.selectedPremise.Designation]
          : [],
        meterId !== undefined ? [meterId] : (meter?.map((m) => m.Id) ?? []),
      );
    } catch (error) {
      console.log('error fetching meterdata:', error);
    }
    let filteredData = meterData ?? [];

    if (
      (filters.includes('resolution') && !resolution) ||
      (filters.includes('year') && !year) ||
      (filters.includes('fromToYear') && !year && !yearTwo) ||
      (filters.includes('meter') && !meter) ||
      (filters.includes('dateRange') && !fromDate && !toDate) ||
      (filters.includes('meter') && !meter)
    ) {
      showSnackbar('Fyll i fälten');
      return;
    }

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
                  isChecked={isChecked}
                  setIsChecked={setIsChecked}
                />
              )}
            </View>
          </ScrollView>
        </View>
        <View style={filterStyle.buttonContainer}>
          <TouchableOpacity
            onPress={handleSearch}
            style={searchButtonStyle.button}
          >
            <Text style={searchButtonStyle.text}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </PaperProvider>
  );
};

export default Filter;
