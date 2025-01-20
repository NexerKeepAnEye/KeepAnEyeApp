import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { searchButtonStyle } from '../../Style/SearchButtonStyle';
import { Meter, MeterData } from '../../Types/Type';
import { usePremiseContext } from '../../PremiseState/PremiseContext';

interface SearchButtonProps {
  meterData: MeterData[];
  setFilteredResults: (data: MeterData[]) => void;
  meter?: Meter[];
  year?: string;
  fromDate?: Date;
  toDate?: Date;
  meterId?: number;
}

export function SearchButton({
  meterData,
  setFilteredResults,
  meter,
  year,
  fromDate,
  toDate,
  meterId,
}: SearchButtonProps) {
  const { state } = usePremiseContext();

  const handleSearch = () => {
    let filteredData = meterData;

    if (year !== undefined) {
      filteredData = filteredData.filter((data) =>
        data.DateTime.includes(year),
      );
    }

    if (meter !== undefined) {
      filteredData = filteredData.filter((data) =>
        meter.some((m) => m.Id === data.MeterId),
      );
    }

    if (meterId !== null || meterId !== undefined) {
      state.premise?.Meters.forEach((m) => {
        filteredData = filteredData.filter((data) => meterId === data.MeterId);
      });
    }

    if (fromDate !== undefined && toDate !== undefined) {
      filteredData = filteredData.filter(
        (data) =>
          new Date(data.DateTime) > fromDate &&
          new Date(data.DateTime) < toDate,
      );
    }

    // console.log(filteredData);
    setFilteredResults(filteredData);
    return filteredData;
  };

  return (
    <TouchableOpacity
      onPress={handleSearch}
      style={searchButtonStyle.button}
    >
      <Text style={searchButtonStyle.text}>Skapa rapport</Text>
    </TouchableOpacity>
  );
}
