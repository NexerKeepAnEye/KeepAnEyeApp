import React from 'react';
import { Button } from 'react-native';
import { Meter, MeterData } from '../../Types/Type';

interface SearchButtonProps {
  meterData: MeterData[];
  setFilteredResults: (data: MeterData[]) => void;
  meter?: { meter: Meter[] }[];
  year?: string;
  fromDate?: Date;
  toDate?: Date;
}

const SearchButton: React.FC<SearchButtonProps> = ({
  meterData,
  setFilteredResults,
  meter,
  year,
  fromDate,
  toDate,
}) => {
  const handleSearch = () => {
    // console.log('meterData:', meterData);
    // console.log('year:', year);
    // console.log('meter:', meter);
    // console.log('fromDate:', fromDate);
    // console.log('toDate:', toDate);
    let filteredData = meterData;

    if (year !== undefined) {
      filteredData = filteredData.filter((data) =>
        data.DateTime.includes(year),
      );
    }

    if (meter !== undefined) {
      filteredData = filteredData.filter((data) =>
        meter.some((m) => m.meter.some((meter) => meter.Id === data.MeterId)),
      );
    }

    if (fromDate !== undefined && toDate !== undefined) {
      filteredData = filteredData.filter(
        (data) =>
          new Date(data.DateTime) > fromDate &&
          new Date(data.DateTime) < toDate,
      );
    }

    console.log(filteredData);
    setFilteredResults(filteredData);
    return filteredData;
  };

  return (
    <Button
      onPress={handleSearch}
      title="Sök"
    />
  );
};

export default SearchButton;
