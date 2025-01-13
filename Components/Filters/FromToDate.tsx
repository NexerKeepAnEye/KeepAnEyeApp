import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface FromToDateProps {
  fromDate: Date | null;
  toDate: Date | null;
  setFromDate: (date: Date) => void;
  setToDate: (date: Date) => void;
}

export const FromToDate: React.FC<FromToDateProps> = ({
  fromDate,
  toDate,
  setFromDate,
  setToDate,
}) => {
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
      <View style={styles.container}>
        <View style={styles.dateContainer}>
          <TouchableOpacity
            style={styles.pickerContainer}
            onPress={() => {
              setCurrentPicker('from');
              setModalVisible(true);
            }}
          >
            <Text style={styles.pickerText}>{formatDate(fromDate)}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.dateContainer}>
          <TouchableOpacity
            style={styles.pickerContainer}
            onPress={() => {
              setCurrentPicker('to');
              setModalVisible(true);
            }}
          >
            <Text style={styles.pickerText}>{formatDate(toDate)}</Text>
          </TouchableOpacity>
        </View>
        {modalVisible && (
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
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
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
  },
  dateContainer: {
    alignItems: 'center',
    opacity: 0.8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    width: width * 0.28,
    height: height * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  pickerText: {
    fontSize: width * 0.045,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: width * 0.8,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default FromToDate;
