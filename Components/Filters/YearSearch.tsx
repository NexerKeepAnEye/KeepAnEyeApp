import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface YearSearchProps {
  setSelectedYear: (year: string) => void;
}

export const YearSearch: React.FC<YearSearchProps> = ({ setSelectedYear }) => {
  const [year, setYear] = useState<string>(new Date().getFullYear().toString());
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
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.pickerContainer}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.pickerText}>{year}</Text>
        </TouchableOpacity>
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <FlatList
                    data={years}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => handleSelectYear(item)}>
                        <Text style={styles.modalItem}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text style={styles.closeButton}>Stäng</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    width: width * 0.15,
    height: height * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    opacity: 0.8,
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
    width: width * 0.3,
    maxHeight: height * 0.5,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalItem: {
    padding: 10,
    fontSize: width * 0.045,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 10,
    textAlign: 'center',
    color: 'blue',
    fontSize: height * 0.02,
  },
});

export default YearSearch;
