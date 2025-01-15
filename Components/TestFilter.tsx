import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { TestFilterStyle } from '../Style/TestFilterStyle';

type FilterProps = {
  onFilter: (startDate: string, endDate: string) => void;
};

export default function TestFilter({ onFilter }: FilterProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleStartDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const handleEndDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  return (
    <View style={TestFilterStyle.container}>
      <View style={TestFilterStyle.row}>
        <View style={TestFilterStyle.filterBtnContainer}>
          <TouchableOpacity
            style={TestFilterStyle.button}
            onPress={() => setShowStartDatePicker(true)}
          >
            <Text style={TestFilterStyle.buttonText}>
              {startDate
                ? startDate.toISOString().split('T')[0]
                : 'Select Start Date'}
            </Text>
          </TouchableOpacity>
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate || new Date()}
              mode="date"
              display="default"
              onChange={handleStartDateChange}
            />
          )}

          <TouchableOpacity
            style={TestFilterStyle.button}
            onPress={() => setShowEndDatePicker(true)}
          >
            <Text style={TestFilterStyle.buttonText}>
              {endDate
                ? endDate.toISOString().split('T')[0]
                : 'Select End Date'}
            </Text>
          </TouchableOpacity>
          {showEndDatePicker && (
            <DateTimePicker
              value={endDate || new Date()}
              mode="date"
              display="default"
              onChange={handleEndDateChange}
            />
          )}
        </View>
        <TouchableOpacity
          style={TestFilterStyle.searchButton}
          onPress={() =>
            onFilter(
              startDate?.toISOString().split('T')[0] || '',
              endDate?.toISOString().split('T')[0] || '',
            )
          }
        >
          <Text style={TestFilterStyle.searchButtonText}>Sök</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
