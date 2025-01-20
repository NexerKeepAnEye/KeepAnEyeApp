import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { yearSearchStyle } from '../../Style/YearSearchStyle';

interface YearSearchProps {
  setSelectedYear: (year: string) => void;
}

export function YearSearch({ setSelectedYear }: YearSearchProps) {
  const [year, setYear] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const years = Array.from({ length: 50 }, (_, i) =>
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
          <Text style={yearSearchStyle.pickerText}>{year ? year : 'År'}</Text>
        </TouchableOpacity>
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
