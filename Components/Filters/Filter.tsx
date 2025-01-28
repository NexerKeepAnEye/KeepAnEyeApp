import { useNavigationState } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import {
  Provider as PaperProvider,
  Portal,
  Snackbar,
  Text,
} from 'react-native-paper';
import { fetchMeterData } from '../../Api/fetchAPI';
import StorageService from '../../AsyncStorage/AsyncStorage';
import { usePremiseContext } from '../../Context/PremiseContext';
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
  const [visible, setVisible] = useState(false);
  // const [products, setProducts] = useState<Product[]>([]);
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

  const showSnackbar = () => setVisible(true);
  const hideSnackbar = () => setVisible(false);

  const handleSearch = async () => {
    let meterData;

    if (year && yearTwo) {
      fromDate = new Date(Date.parse(year + '-01-01'));
      toDate = new Date(Date.parse(yearTwo + '-12-31'));
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
        resolution ?? '',
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
      showSnackbar();
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
    // console.log(filteredData);
    setFilteredResults(filteredData);
  };

  const routeNames = useNavigationState((state) => state.routeNames);
  const currentRoute = routeNames[routeNames.length - 1];

  const getSnackbarStyle = () => {
    switch (currentRoute) {
      case 'ReportScreen':
        return filterStyle.snackbar;
      case 'MeterDataScreen':
        return filterStyle.snackbar2;
      default:
        return filterStyle.snackbar;
    }
  };

  return (
    <PaperProvider>
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
      <View style={filterStyle.buttonContainer}>
        <TouchableOpacity
          onPress={handleSearch}
          style={searchButtonStyle.button}
        >
          <Text style={searchButtonStyle.text}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
      <Portal>
        <Snackbar
          visible={visible}
          onDismiss={hideSnackbar}
          duration={Snackbar.DURATION_SHORT}
          action={{
            label: 'Uppfattat',
            onPress: hideSnackbar,
            textColor: 'white',
          }}
          elevation={0}
          style={getSnackbarStyle()}
        >
          <Text style={filterStyle.snackBarText}>Fyll i fälten</Text>
        </Snackbar>
      </Portal>
    </PaperProvider>
  );
};

export default Filter;
