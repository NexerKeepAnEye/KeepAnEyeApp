import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { width } from '../../Style/Dimensions';
import { meterSearch } from '../../Style/MeterSearchStyle';
import { searchButtonStyle } from '../../Style/SearchButtonStyle';
import { yearSearchStyle } from '../../Style/YearSearchStyle';

interface YearSearchProps {
  setSelectedYear: (year: string) => void;
  label: string;
}

export function YearSearch({ setSelectedYear, label }: YearSearchProps) {
  const [year, setYear] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const years = Array.from({ length: 10 }, (_, i) =>
    (new Date().getFullYear() - i).toString(),
  );

  const handleSelectYear = (selectedYear: string) => {
    setYear(selectedYear);
    setSelectedYear(selectedYear);
    setModalVisible(false);
  };

  return (
    <View>
      <View style={yearSearchStyle.container}>
        <TouchableOpacity
          style={yearSearchStyle.pickerContainer}
          onPress={() => setModalVisible(true)}
        >
          <Text style={yearSearchStyle.pickerText}>{year ? year : label}</Text>
        </TouchableOpacity>
        <View style={meterSearch.iconResetContainer}>
          {year && (
            <TouchableOpacity
              style={searchButtonStyle.yearResetButton}
              onPress={() => {
                setYear(null);
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
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={yearSearchStyle.modalContainer}>
              <TouchableWithoutFeedback>
                <View style={yearSearchStyle.modalContent}>
                  <FlatList
                    data={years}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => handleSelectYear(item)}>
                        <Text style={yearSearchStyle.modalItem}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                  <Divider style={yearSearchStyle.divider} />
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text style={yearSearchStyle.closeButton}>Stäng</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </View>
  );
}

export default YearSearch;
