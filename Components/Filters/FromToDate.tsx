import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import {
  Alert,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { width } from '../../Style/Dimensions';
import { dateStyles } from '../../Style/FromToDateStyle';
import { searchButtonStyle } from '../../Style/SearchButtonStyle';

interface FromToDateProps {
  fromDate: Date | null;
  toDate: Date | null;
  setFromDate: (date: Date | undefined) => void;
  setToDate: (date: Date | undefined) => void;
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
        {fromDate && (
          <TouchableOpacity
            style={searchButtonStyle.resetButton}
            onPress={() => {
              setFromDate(undefined);
            }}
          >
            <Icon
              name="close"
              size={width * 0.03}
              color="#333"
            />
          </TouchableOpacity>
        )}
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
        {toDate && (
          <TouchableOpacity
            style={searchButtonStyle.resetButton}
            onPress={() => setToDate(undefined)}
          >
            <Icon
              name="close"
              size={width * 0.03}
              color="#333"
            />
          </TouchableOpacity>
        )}
      </View>
      {modalVisible && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
        >
          <View style={dateStyles.modalContainer}>
            <View style={dateStyles.modalContent}>
              <RNDateTimePicker
                value={
                  currentPicker === 'from'
                    ? fromDate || new Date()
                    : toDate || new Date()
                }
                mode="date"
                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                onChange={handleDateChange}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 10,
                }}
                minimumDate={new Date(2015, 0, 1)}
                maximumDate={
                  new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate(),
                  )
                }
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}
