import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { TestFilterStyle } from '../Style/TestFilterStyle';

type FilterProps = {
  onFilter: (startDate: string | null, endDate: string | null) => void;
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

  const handleFilter = () => {
    if (startDate && endDate && endDate <= startDate) {
      Alert.alert('Fel', 'Slutdatum måste vara senare än startdatum.');
      return;
    }
    if (!startDate && !endDate) {
      // Fetch the latest 20 posts
      onFilter(null, null);
    } else {
      onFilter(
        startDate?.toISOString().split('T')[0] || '',
        endDate?.toISOString().split('T')[0] || '',
      );
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
              {startDate ? startDate.toISOString().split('T')[0] : 'Från datum'}
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
              {endDate ? endDate.toISOString().split('T')[0] : 'Till datum'}
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
          onPress={handleFilter}
        >
          <Text style={TestFilterStyle.searchButtonText}>Sök</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
