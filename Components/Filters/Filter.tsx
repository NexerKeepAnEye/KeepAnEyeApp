import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Meter, MeterData } from '../../Types/Type';
import FromToDate from './FromToDate';
import MeterSearch from './MeterSearch';
import SearchButton from './SearchButton';
import YearSearch from './YearSearch';

interface FilterProps {
  filters: string[];
  setYear?: (year: string) => void;
  setMeter?: (meter: Meter[]) => void;
  setFromDate?: (date: Date) => void;
  setToDate?: (date: Date) => void;
  year?: string;
  meter?: Meter[];
  fromDate?: Date | null;
  toDate?: Date | null;
  meterData: MeterData[];
  setFilteredResults: (data: MeterData[]) => void;
}

const Filter: React.FC<FilterProps> = ({
  filters,
  setYear,
  setMeter,
  setFromDate,
  setToDate,
  year,
  meter,
  fromDate,
  toDate,
  meterData,
  setFilteredResults,
}) => {
  return (
    <View>
      <View style={styles.container}>
        {filters.includes('year') && setYear && (
          <YearSearch setSelectedYear={setYear} />
        )}
        {filters.includes('meter') && setMeter && (
          <MeterSearch setSelectedMeter={setMeter} />
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
      <SearchButton
        meterData={meterData}
        setFilteredResults={setFilteredResults}
        meter={meter}
        year={year}
        fromDate={fromDate ?? undefined}
        toDate={toDate ?? undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
  },
});

export default Filter;
