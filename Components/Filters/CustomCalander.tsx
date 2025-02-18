import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Divider, TextInput } from 'react-native-paper';
import { deviceHeight, deviceWidth } from '../../Style/Dimensions';

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

const CustomCalendar = ({ value, onChange }) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(value || today);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [showDateInput, setShowDateInput] = useState(false);
  const [inputDate, setInputDate] = useState('');
  const [showYearPicker, setShowYearPicker] = useState(false);

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
    onChange && onChange(newDate);
  };

  const goToToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedDate(today);
    onChange && onChange(today);
  };

  const goToSelectedDate = () => {
    Keyboard.dismiss();
    if (!inputDate) return alert('Vänligen ange ett datum');

    if (!/^\d{8}$/.test(inputDate))
      return alert('Ogiltigt datumformat. Använd YYYYMMDD.');

    // Extrahera år, månad och dag från inputDate
    const year = parseInt(inputDate.substring(0, 4), 10);
    const month = parseInt(inputDate.substring(4, 6), 10) - 1;
    const day = parseInt(inputDate.substring(6, 8), 10);

    const newDate = new Date(year, month, day);

    if (isNaN(newDate.getTime())) return alert('Ogiltigt datum');

    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
    setSelectedDate(newDate);
    setShowDateInput(false);
    onChange && onChange(newDate);
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
    <View style={{ flex: 1, justifyContent: 'flex-start' }}>
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
          <Modal
            visible={true}
            transparent
            animationType="fade"
          >
            <TouchableWithoutFeedback onPress={() => setShowDateInput(false)}>
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
                    <TouchableOpacity onPress={() => setShowDateInput(false)}>
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
        )}

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
  );
};

const calendar = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingLeft: 20,
    paddingRight: 8,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
    alignSelf: 'flex-start',
    minHeight: deviceHeight * 0.5,
    maxHeight: deviceHeight * 0.7,
    bottom: deviceHeight * 0.08,
  },
  header: {
    width: '98%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: -1,
  },
  navButton: {
    fontSize: 15,
    fontFamily: 'inter_Bold',
    padding: 7,
  },
  monthText: {
    fontSize: 20,
    fontFamily: 'inter_Bold',
  },
  weekDays: {
    width: '97%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  weekDay: {
    fontSize: deviceWidth < 400 ? 13 : 15,
    fontFamily: 'inter_Bold',
    width: '13%',
    textAlign: 'center',
    marginVertical: 5,
    // marginHorizontal: 1,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  day: {
    width: '14%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginVertical: 10,
  },
  dayText: {
    fontSize: 16,
    fontFamily: 'inter_Regular',
  },
  grayText: {
    color: 'gray',
  },
  grayBackground: {
    // backgroundColor: '#f0f0f0',
  },
  todayText: {
    color: '#222',
  },
  selectedDay: {
    backgroundColor: '#FF7043',
    borderRadius: 10,
    color: 'white',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop:
      deviceHeight < 800 ? deviceHeight * -0.03 : deviceHeight * -0.045,
  },
  footerButton: {
    fontSize: 16,
    color: '#007bff',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '75%',
  },
  input: {
    // borderBottomWidth: 1,
    backgroundColor: 'white',
    marginBottom: 10,
    fontSize: 16,
  },
  modalButton: {
    fontSize: 17,
    color: '#007bff',
    fontFamily: 'inter_Regular',
  },
  modalClose: {
    color: 'red',
    fontSize: 16,
    fontFamily: 'inter_Regular',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    // gap: '70%',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  yearPicker: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 100,
    maxHeight: 300,
  },
  yearItem: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  yearText: {
    fontSize: 18,
  },
  closeButton: {
    textAlign: 'center',
    color: 'red',
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'inter_Medium',
  },
  divider: {
    padding: 0.8,
    width: deviceWidth < 400 ? deviceWidth * 0.69 : deviceWidth * 0.7,
  },
});

export default CustomCalendar;
