import React from 'react';
import { ScrollView, View } from 'react-native';
import { filterStyle } from '../../Style/FilterStyle';
import { Meter, MeterData } from '../../Types/Type';
import { FromToDate } from './FromToDate';
import MeterSearch from './MeterSearch';
import { SearchButton } from './SearchButton';
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

export default function Filter({
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
}: FilterProps) {
  return (
    <View>
      <ScrollView
        horizontal={true}
        style={filterStyle.container}
      >
        {filters.includes('dateRange') && setFromDate && setToDate && (
          <FromToDate
            setFromDate={setFromDate}
            setToDate={setToDate}
            fromDate={fromDate ?? null}
            toDate={toDate ?? null}
          />
        )}
        {filters.includes('year') && setYear && (
          <YearSearch setSelectedYear={setYear} />
        )}
        {filters.includes('meter') && setMeter && (
          <MeterSearch setSelectedMeter={setMeter} />
        )}
      </ScrollView>
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
}
