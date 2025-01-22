import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Alert, Modal, Text, TouchableOpacity, View } from 'react-native';
import { dateStyles } from '../../Style/FromToDateStyle';

interface FromToDateProps {
  fromDate: Date | null;
  toDate: Date | null;
  setFromDate: (date: Date) => void;
  setToDate: (date: Date) => void;
}

export function FromToDate({
  fromDate,
  toDate,
  setFromDate,
  setToDate,
}: FromToDateProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPicker, setCurrentPicker] = useState<'from' | 'to' | null>(
    null,
  );

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => {
    if (selectedDate) {
      const endOfYear = new Date(new Date().getFullYear(), 11, 31);

      if (currentPicker === 'from') {
        if (selectedDate > (toDate || endOfYear)) {
          Alert.alert(
            'Fel',
            'Från-datumet kan inte vara större än till-datumet.',
          );
        } else if (selectedDate > endOfYear) {
          Alert.alert('Fel', 'Från-datumet kan inte vara högre än årets slut.');
        } else {
          setFromDate(selectedDate);
        }
      } else if (currentPicker === 'to') {
        if (selectedDate < (fromDate || new Date())) {
          Alert.alert(
            'Fel',
            'Till-datumet kan inte vara mindre än från-datumet.',
          );
        } else {
          setToDate(selectedDate);
        }
      }
    }
    setModalVisible(false);
  };

  const formatDate = (date: Date | null) => {
    return date
      ? date.toLocaleDateString('sv-SE', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      : '';
  };

  return (
    <View>
      <View style={dateStyles.container}>
        <View style={dateStyles.dateContainer}>
          <TouchableOpacity
            style={dateStyles.pickerContainer}
            onPress={() => {
              setCurrentPicker('from');
              setModalVisible(true);
            }}
          >
            <Text style={dateStyles.pickerText}>
              {formatDate(fromDate) || 'Från datum'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={dateStyles.dateContainer}>
          <TouchableOpacity
            style={dateStyles.pickerContainer}
            onPress={() => {
              setCurrentPicker('to');
              setModalVisible(true);
            }}
          >
            <Text style={dateStyles.pickerText}>
              {formatDate(toDate) || 'Till datum'}
            </Text>
          </TouchableOpacity>
        </View>
        {modalVisible && (
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="fade"
          >
            <View style={dateStyles.modalContainer}>
              <View style={dateStyles.modalContent}>
                <DateTimePicker
                  value={
                    currentPicker === 'from'
                      ? fromDate || new Date()
                      : toDate || new Date()
                  }
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              </View>
            </View>
          </Modal>
        )}
      </View>
    </View>
  );
}
