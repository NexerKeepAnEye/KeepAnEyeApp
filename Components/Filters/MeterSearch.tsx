import React, { useState } from 'react';
import {
  Modal,
  SectionList,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { usePremiseContext } from '../../PremiseState/PremiseContext';
import { meterSearch } from '../../Style/MeterSearchStyle';
import { Meter } from '../../Types/Type';
import MeterIcon from '../MeterIcon';

interface Section {
  title: string;
  data: Meter[];
}

interface MeterSearchProps {
  setSelectedMeter: (meter: Meter[]) => void;
}

export function MeterSearch({ setSelectedMeter }: MeterSearchProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMeter, setSelectedMeterState] = useState<
    string[] | undefined
  >();
  const { state } = usePremiseContext();
  const meters: Meter[] = state.premise?.Meters || [];

  const handlePress = () => setModalVisible(true);

  const handleSelectMeter = (meter: Meter[]) => {
    setSelectedMeter(meter);

    setSelectedMeterState(meter.map((m) => m.Name));
    setModalVisible(false);
    console.log(meter);
  };

  const handleSelectCategory = (category: Section) => {
    const selectedMeters = category.data;
    setSelectedMeter(selectedMeters);
    setSelectedMeterState([category.title]);
    setModalVisible(false);
    console.log(selectedMeters);
  };

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
  ].filter((section) => section.data.length > 0);

  return (
    <View style={meterSearch.container}>
      <View style={meterSearch.pickerContainer}>
        <TouchableOpacity
          style={meterSearch.touchArea}
          onPress={handlePress}
        >
          <Text
            style={meterSearch.pickerText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {selectedMeter?.toString() || '- Mätare -'}
          </Text>
          {/* <View style={meterSearch.iconContainer}>
            <List.Icon
              icon="chevron-down"
              style={meterSearch.icon}
            />
          </View> */}
        </TouchableOpacity>
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={meterSearch.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={meterSearch.modalContent}>
                <SectionList
                  sections={sections}
                  keyExtractor={(item) => item.Id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={meterSearch.dropdownItem}
                      onPress={() => handleSelectMeter([item])}
                    >
                      <MeterIcon productCode={item.ProductCode} />
                      <View style={meterSearch.meterTextContainer}>
                        <Text style={meterSearch.meterText}>{item.Name}</Text>
                        <Text style={meterSearch.meterSubText}>
                          {item.ProductCode}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  renderSectionHeader={({ section }) => (
                    <TouchableOpacity
                      style={meterSearch.sectionHeader}
                      onPress={() => handleSelectCategory(section)}
                    >
                      <Text style={meterSearch.sectionHeaderText}>
                        {section.title}
                      </Text>
                    </TouchableOpacity>
                  )}
                  style={meterSearch.sectionList}
                />
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={meterSearch.closeButton}>Stäng</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

export default MeterSearch;
