import React, { useContext, useEffect, useState } from 'react';
import {
  Modal,
  SectionList,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { FilterContext } from '../../Context/FilterContext';
import { usePremiseContext } from '../../Context/PremiseContext';
import { meterSearch } from '../../Style/MeterSearchStyle';
import { Meter } from '../../Types/Type';
import { groupMeters, Section } from '../GroupMeter';
import MeterIcon from '../MeterIcon';

interface MeterSearchProps {
  setSelectedMeter: (meter: Meter[]) => void;
  meters: Meter[] | undefined;
}

export function MeterSearch({ setSelectedMeter }: MeterSearchProps) {
  const { state: filterstate, dispatch } = useContext(FilterContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMeter, setSelectedMeterState] = useState<
    Meter[] | string[] | undefined
  >(
    filterstate.meter.length > 0 && filterstate.meter.length < 2
      ? filterstate.meter.map((m) => m.Name)
      : groupMeters(filterstate.meter).map((m) => m.title),
  );

  useEffect(() => {
    if (filterstate.meter.length === 0) {
      setSelectedMeterState(undefined);
    }
  }, [filterstate.meter.length]);

  const { state } = usePremiseContext();
  const meters: Meter[] = state.selectedPremise?.Meters || [];

  const handlePress = () => setModalVisible(true);

  const handleSelectMeter = (meter: Meter[]) => {
    setSelectedMeter(meter);
    setSelectedMeterState(meter.map((m) => m.Name));
    dispatch({ type: 'SET_METER', payload: meter });
    setModalVisible(false);
  };

  const handleSelectCategory = (category: Section) => {
    const selectedMeters = category.data;
    setSelectedMeter(selectedMeters);
    setSelectedMeterState([category.title]);
    dispatch({ type: 'SET_METER', payload: selectedMeters });
    setModalVisible(false);
  };

  const sections = groupMeters(meters);

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
            {selectedMeter?.toString() || 'Mätare'}
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
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
