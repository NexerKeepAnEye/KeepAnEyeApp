import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import {
  Provider as PaperProvider,
  Portal,
  Snackbar,
  Text,
} from 'react-native-paper';
import { filterStyle } from '../../Style/FilterStyle';
import { searchButtonStyle } from '../../Style/SearchButtonStyle';
import { Meter, MeterData } from '../../Types/Type';
import { FromToDate } from './FromToDate';
import MeterSearch from './MeterSearch';
import YearSearch from './YearSearch';

interface FilterProps {
  filters: string[];
  setYear?: (year: string) => void;
  setMeter?: (meter: Meter[]) => void;
  setFromDate?: (date: Date) => void;
  setToDate?: (date: Date) => void;
  setMeterId?: (meterId: number) => void;
  year?: string;
  meter?: Meter[];
  fromDate?: Date | null;
  toDate?: Date | null;
  meterData: MeterData[];
  setFilteredResults: (data: MeterData[]) => void;
  meterId?: number;
  buttonText: string;
}

const Filter: React.FC<FilterProps> = ({
  filters,
  setYear,
  setMeter,
  setFromDate,
  setToDate,
  setMeterId,
  year,
  meter,
  fromDate,
  toDate,
  meterData,
  setFilteredResults,
  meterId: meterId,
  buttonText,
}) => {
  const [visible, setVisible] = useState(false);

  const showSnackbar = () => setVisible(true);
  const hideSnackbar = () => setVisible(false);

  const handleSearch = () => {
    let filteredData = meterData;

    if (
      (filters.includes('year') && !year) ||
      (filters.includes('meter') && !meter) ||
      (filters.includes('dateRange') && !fromDate && !toDate)
    ) {
      showSnackbar();
      return;
    }

    if (year) {
      filteredData = filteredData.filter((item) => {
        const itemYear = new Date(item.DateTime).getFullYear();
        return itemYear === parseInt(year, 10);
      });
    }

    if (fromDate && toDate) {
      filteredData = filteredData.filter((item) => {
        const itemDate = new Date(item.DateTime);
        return itemDate >= fromDate && itemDate <= toDate;
      });
    }

    if (meter && meter.length > 0) {
      filteredData = filteredData.filter((item) =>
        meter.some((m) => m.Id === item.MeterId),
      );
    }

    if (meterId !== null && meterId !== undefined) {
      filteredData = filteredData.filter((data) => data.MeterId === meterId);
      if (setMeterId) {
        setMeterId(meterId);
      }
    }
    console.log(filteredData);
    setFilteredResults(filteredData);
  };

  return (
    <PaperProvider>
      <View style={filterStyle.container}>
        {filters.includes('year') && setYear && (
          <YearSearch setSelectedYear={setYear} />
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
          style={filterStyle.snackbar}
        >
          <Text style={filterStyle.snackBarText}>Fyll i fälten</Text>
        </Snackbar>
      </Portal>
    </PaperProvider>
  );
};

export default Filter;
