import React, { useState } from 'react';
import {
  Dimensions,
  Modal,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { List } from 'react-native-paper';
import { usePremiseContext } from '../../PremiseState/PremiseContext';
import MeterIcon from '../MeterIcon';

const { width, height } = Dimensions.get('window');

interface Meter {
  Id: number;
  Name: string;
  ProductCode: string;
}

interface Section {
  title: string;
  data: Meter[];
}

interface MeterSearchProps {
  setSelectedMeter: (meterId: string) => void;
}

export const MeterSearch: React.FC<MeterSearchProps> = ({
  setSelectedMeter,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMeter, setSelectedMeterState] = useState<string | null>(null);

  const handlePress = () => setModalVisible(true);

  const handleSelectMeter = (meter: Meter) => {
    setSelectedMeterState(meter.Name);
    setSelectedMeter(meter.Id.toString());
    setModalVisible(false);
  };

  const { state } = usePremiseContext();
  const meters: Meter[] = state.premise?.Meters || [];

  const sections: Section[] = [
    {
      title: 'Fjärrvärme',
      data: meters.filter((meter) => meter.ProductCode.includes('FJV')),
    },
    {
      title: 'Vatten',
      data: meters.filter(
        (meter) =>
          meter.ProductCode.includes('VAT') ||
          meter.ProductCode.includes('VOL'),
      ),
    },
    {
      title: 'Fjärrkyla',
      data: meters.filter((meter) => meter.ProductCode.includes('FJK')),
    },
    {
      title: 'El',
      data: meters.filter((meter) => meter.ProductCode.includes('El')),
    },
    {
      title: 'Olja',
      data: meters.filter((meter) => meter.ProductCode.includes('OLJA')),
    },
    {
      title: 'Temperatur',
      data: meters.filter((meter) => meter.ProductCode.includes('TMP')),
    },
  ].filter((section) => section.data.length > 0); // Filtrera bort tomma kategorier

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Text
          style={styles.pickerText}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {selectedMeter || '- Välj -'}
        </Text>
        <TouchableOpacity
          onPress={handlePress}
          style={styles.iconContainer}
        >
          <List.Icon
            icon="chevron-down"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <SectionList
                  sections={sections}
                  keyExtractor={(item) => item.Id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.dropdownItem}
                      onPress={() => handleSelectMeter(item)}
                    >
                      <MeterIcon productCode={item.ProductCode} />
                      <View style={styles.meterTextContainer}>
                        <Text style={styles.meterText}>{item.Name}</Text>
                        <Text style={styles.meterSubText}>
                          {item.ProductCode}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  renderSectionHeader={({ section }) => (
                    <TouchableOpacity
                      style={styles.sectionHeader}
                      onPress={() => handleSelectCategory(section)}
                    >
                      <Text style={styles.sectionHeaderText}>
                        {section.title}
                      </Text>
                    </TouchableOpacity>
                  )}
                  style={styles.sectionList}
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
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: width * 0.45,
    padding: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    width: '100%',
    height: height * 0.04,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    opacity: 0.8,
  },
  pickerText: {
    fontSize: width * 0.045,
    flex: 1,
  },
  iconContainer: {
    paddingLeft: 10,
  },
  icon: {
    marginLeft: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: width * 0.8,
    maxHeight: height * 0.5,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  sectionList: {
    width: '100%',
  },
  sectionHeader: {
    backgroundColor: '#f4f4f4',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sectionHeaderText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  meterTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  meterText: {
    fontSize: width * 0.04,
  },
  meterSubText: {
    fontSize: width * 0.035,
    color: 'gray',
  },
  closeButton: {
    marginTop: 10,
    textAlign: 'center',
    color: 'blue',
    fontSize: width * 0.04,
  },
});

export default MeterSearch;
