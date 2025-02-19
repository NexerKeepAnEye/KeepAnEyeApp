import React, { useEffect, useState } from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { width } from '../../Style/Dimensions';
import { dateStyles } from '../../Style/FromToDateStyle';
import { searchButtonStyle } from '../../Style/SearchButtonStyle';
import AlertDialog from '../AlertDialog';
import CustomCalendar from '../CustomCalander';

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
  const [showAlartDialog, setShowAlartDialog] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  // const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    if (!fromDate && !toDate) {
      const today = new Date();
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(today.getDate() - 30);

      setFromDate(thirtyDaysAgo);
      setToDate(today);
    }
  }, [setFromDate, setToDate]);

  const formatDate = (date: Date | null) => {
    return date
      ? date.toLocaleDateString('sv-SE', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      : '';
  };

  const handleDateChange = (date: Date) => {
    if (currentPicker === 'from') {
      if (toDate && date > toDate && date !== fromDate) {
        setIsVisible(true);
        setShowAlartDialog(true);
        return;
      }
      setFromDate(date);
    } else {
      if (fromDate && date < fromDate && date !== toDate) {
        setIsVisible(true);
        setShowAlartDialog(true);
        return;
      }
      setToDate(date);
    }
    setModalVisible(false);
  };

  return (
    <>
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
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <View style={dateStyles.modalContainer}>
                <View style={dateStyles.modalContent}>
                  <CustomCalendar
                    value={currentPicker === 'from' ? fromDate : toDate}
                    onChange={handleDateChange}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        )}
        <View>
          <Modal
            statusBarTranslucent={true}
            animationType="fade"
            transparent={true}
            visible={showAlartDialog}
            onRequestClose={() => {
              setShowAlartDialog(!showAlartDialog);
            }}
          >
            <AlertDialog
              visible={isVisible}
              title="Varning"
              message="Till datumet kan inte vara mindre än från datumet."
              onConfirmText="Uppfattat"
              onConfirm={async () => {
                setIsVisible(false);
                setShowAlartDialog(false);
              }}
            >
              {/* <Text>Extra innehåll här</Text> */}
            </AlertDialog>
          </Modal>
        </View>
      </View>
    </>
  );
}
