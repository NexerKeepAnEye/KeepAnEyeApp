import React, { useEffect, useState } from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { dateStyles } from '../../Style/FromToDateStyle';
import AlertDialog from '../AlertDialog';
import CustomCalendar from '../CustomCalander';
import { TimeConverter } from '../../Utils/TimeConverter';

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
    date = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0),
    );
    const convertedDate = TimeConverter({ fromDate, toDate });
    fromDate = convertedDate.fromDate;
    toDate = convertedDate.toDate;

    if (currentPicker === 'from') {
      if (toDate && date > toDate && date !== toDate) {
        setToDate(date);
        setIsVisible(true);
        setShowAlartDialog(true);
      }
      setFromDate(date);
    } else {
      if (fromDate && date < fromDate && date !== fromDate) {
        setFromDate(date);
        setIsVisible(true);
        setShowAlartDialog(true);
      }
      setToDate(date);
    }
    setModalVisible(false);
  };

  // const handleDateChange = (date: Date) => {
  //   date = new Date(
  //     Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  //   );
  //   fromDate = new Date(
  //     Date.UTC(
  //       fromDate?.getFullYear(),
  //       fromDate?.getMonth(),
  //       fromDate?.getDate(),
  //     ),
  //   );
  //   toDate = new Date(
  //     Date.UTC(toDate?.getFullYear(), toDate?.getMonth(), toDate?.getDate()),
  //   );

  //   if (currentPicker === 'from') {
  //     if (toDate && date > toDate && date !== toDate) {
  //       setToDate(date);
  //       setIsVisible(true);
  //       setShowAlartDialog(true);
  //     }
  //     setFromDate(date);
  //   } else {
  //     if (fromDate && date < fromDate && date !== fromDate) {
  //       setFromDate(date);
  //       setIsVisible(true);
  //       setShowAlartDialog(true);
  //     }
  //     setToDate(date);
  //   }

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
            ></AlertDialog>
          </Modal>
        </View>
      </View>
    </>
  );
}
