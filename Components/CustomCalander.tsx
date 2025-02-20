import React, { useEffect, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Divider, TextInput } from 'react-native-paper';
import { calendar } from '../Style/CalendarStyle';
import AlertDialog from './AlertDialog';

interface CustomCalanderProps {
  value: Date;
  onChange: (date: Date) => void;
}

const months = [
  'Januari',
  'Februari',
  'Mars',
  'April',
  'Maj',
  'Juni',
  'Juli',
  'Augusti',
  'September',
  'Oktober',
  'November',
  'December',
];

const getDaysInMonth = (month, year) => {
  const firstDayIndex = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const prevLastDate = new Date(year, month, 0).getDate();

  const adjustedFirstDay = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

  const daysArray = [];

  for (let x = adjustedFirstDay; x > 0; x--) {
    daysArray.push({ day: prevLastDate - x + 1, monthOffset: -1 });
  }

  for (let i = 1; i <= lastDate; i++) {
    daysArray.push({ day: i, monthOffset: 0 });
  }

  const nextDays = 7 - (daysArray.length % 7);
  if (nextDays < 7) {
    for (let j = 1; j <= nextDays; j++) {
      daysArray.push({ day: j, monthOffset: 1 });
    }
  }

  return daysArray;
};

const CustomCalendar = ({ value, onChange }: CustomCalanderProps) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(value || today);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [showDateInput, setShowDateInput] = useState(false);
  const [inputDate, setInputDate] = useState('');
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showAlartDialog, setShowAlartDialog] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  useEffect(() => {
    if (value) {
      setSelectedDate(value);
      setCurrentMonth(value.getMonth());
      setCurrentYear(value.getFullYear());
    }
  }, [value]);

  const days = getDaysInMonth(currentMonth, currentYear);

  const changeMonth = (direction) => {
    let newMonth = currentMonth + direction;
    let newYear = currentYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const handleDateSelect = (day, monthOffset) => {
    const newDate = new Date(currentYear, currentMonth + monthOffset, day);
    setSelectedDate(newDate);
    if (onChange) {
      onChange(newDate);
    }
  };

  const goToToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedDate(today);
    if (onChange) {
      onChange(today);
    }
  };

  const goToSelectedDate = () => {
    if (!inputDate) {
      setInputMessage('Datumet får inte vara tomt');
      setShowAlartDialog(true);
      setIsVisible(true);
      return;
    }

    if (!/^\d{8}$/.test(inputDate) && inputDate) {
      setInputMessage(
        'Ogiltigt datumformat. Använd YYYYMMDD.Exempel: 20250101',
      );
      setShowAlartDialog(true);
      setIsVisible(true);
      return;
    }

    // Keyboard.dismiss();

    const year = parseInt(inputDate.substring(0, 4), 10);
    const month = parseInt(inputDate.substring(4, 6), 10) - 1;
    const day = parseInt(inputDate.substring(6, 8), 10);

    const newDate = new Date(year, month, day);

    if (isNaN(newDate.getTime())) return alert('Ogiltigt datum');

    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
    setSelectedDate(newDate);
    setShowDateInput(false);
    if (onChange) {
      onChange(newDate);
    }
  };

  const toggleYearPicker = () => setShowYearPicker(!showYearPicker);
  const selectYear = (year) => {
    setCurrentYear(year);
    setShowYearPicker(false);
  };

  const generateYears = () => {
    const years = [];
    for (let i = 2010; i <= new Date().getFullYear(); i++) {
      years.push(i);
    }
    years.reverse();
    return years;
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={calendar.root}>
        <View style={calendar.container}>
          {/* Header */}
          <View style={calendar.header}>
            <TouchableOpacity onPress={() => changeMonth(-1)}>
              <Text style={calendar.navButton}>◀</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleYearPicker}>
              <Text style={calendar.monthText}>
                {months[currentMonth]} {currentYear}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeMonth(1)}>
              <Text style={calendar.navButton}>▶</Text>
            </TouchableOpacity>
          </View>

          <Divider style={calendar.divider} />

          {/* Weekdays */}
          <View style={calendar.weekDays}>
            {['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'].map(
              (day, index) => (
                <Text
                  key={index}
                  style={calendar.weekDay}
                >
                  {day}
                </Text>
              ),
            )}
          </View>

          {/* Days Grid */}
          <View style={calendar.daysGrid}>
            {days.map(({ day, monthOffset }, index) => {
              const isCurrentMonth = monthOffset === 0;
              const isSelected =
                selectedDate &&
                selectedDate.getDate() === day &&
                selectedDate.getMonth() === currentMonth + monthOffset &&
                selectedDate.getFullYear() === currentYear;
              const isToday =
                today.getDate() === day &&
                today.getMonth() === currentMonth + monthOffset &&
                today.getFullYear() === currentYear;

              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    calendar.day,
                    isSelected && calendar.selectedDay,
                    !isCurrentMonth && calendar.grayBackground,
                  ]}
                  onPress={() => handleDateSelect(day, monthOffset)}
                >
                  <Text
                    style={[
                      calendar.dayText,
                      !isCurrentMonth && calendar.grayText,
                      isToday && calendar.todayText,
                    ]}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Footer */}
          <View style={calendar.footer}>
            <TouchableOpacity onPress={goToToday}>
              <Text style={calendar.footerButton}>Idag</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowDateInput(true)}>
              <Text style={calendar.footerButton}>Skriv Datum</Text>
            </TouchableOpacity>
          </View>

          {/* Modal for date-input */}
          {showDateInput && (
            <ScrollView keyboardShouldPersistTaps={'always'}>
              <Modal
                visible={true}
                transparent
                animationType="fade"
              >
                <TouchableWithoutFeedback
                  onPress={() => setShowDateInput(false)}
                >
                  <View style={calendar.modalBackground}>
                    <View style={calendar.modalContainer}>
                      <TextInput
                        style={calendar.input}
                        placeholder="Exempel: 20250101"
                        label={'Ange datum (YYYYMMDD)'}
                        mode="outlined"
                        keyboardType="numeric"
                        onChangeText={setInputDate}
                        activeOutlineColor="black"
                        onSubmitEditing={goToSelectedDate}
                      />
                      <View style={calendar.modalButtonContainer}>
                        <TouchableOpacity
                          onPress={() => setShowDateInput(false)}
                        >
                          <Text style={calendar.modalClose}>Stäng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={goToSelectedDate}>
                          <Text style={calendar.modalButton}>Välj</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
            </ScrollView>
          )}

          {/* Alert Dialog */}
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
              title="Något gick fel"
              message={inputMessage}
              onConfirmText="Stäng"
              onConfirm={() => {
                setIsVisible(false);
                setShowAlartDialog(false);
              }}
              // onCancelText="Cancel"
              // onCancel={() => {
              //   setIsVisible(false);
              //   setShowAlartDialog(false);
              // }}
            >
              {/* <Text>Extra innehåll här</Text> */}
            </AlertDialog>
          </Modal>

          {/* Year Modal */}
          <Modal
            visible={showYearPicker}
            transparent
            animationType="fade"
          >
            <TouchableWithoutFeedback onPress={toggleYearPicker}>
              <View style={calendar.modalBackground}>
                <View style={calendar.yearPicker}>
                  <FlatList
                    data={generateYears()}
                    keyExtractor={(item) => item.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={calendar.yearItem}
                        onPress={() => selectYear(item)}
                      >
                        <Text style={calendar.yearText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                  <Divider />
                  <TouchableOpacity onPress={() => setShowYearPicker(false)}>
                    <Text style={calendar.closeButton}>Stäng</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CustomCalendar;
