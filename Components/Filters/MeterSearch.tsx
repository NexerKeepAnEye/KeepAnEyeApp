import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  SectionList,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useFilterContext } from '../../Context/FilterContext';
import { usePremiseContext } from '../../Context/PremiseContext';
import { meterSearch } from '../../Style/MeterSearchStyle';
import { Meter } from '../../Types/Type';
import { groupMeters, Section } from '../../Utils/GroupMeter';
import MeterIcon from '../MeterIcon';

interface MeterSearchProps {
  setSelectedMeter: (meter: Meter[]) => void;
  meters: Meter[] | undefined;
}

export function MeterSearch({ setSelectedMeter }: MeterSearchProps) {
  const { state: premiseState } = usePremiseContext();
  const { state: filterstate, dispatch } = useFilterContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMeter, setSelectedMeterState] = useState<
    Meter[] | string[] | undefined
  >(
    filterstate.meter.length === 0
      ? undefined
      : filterstate.meter.length < 2
        ? filterstate.meter.map((m) => m.Name)
        : groupMeters(filterstate.meter).map((m) => m.title),
  );

  const premiseRef = useRef(premiseState.selectedPremise);

  const meterRef = useRef(filterstate.meter);

  useEffect(() => {
    if (premiseRef.current !== premiseState.selectedPremise) {
      setSelectedMeter([]);
      setSelectedMeterState(['Mätare']);
      dispatch({ type: 'SET_METER', payload: [] });
      premiseRef.current = premiseState.selectedPremise;
    }
    if (
      meterRef.current !== filterstate.meter &&
      filterstate.filteredResults.length === 0
    ) {
      setSelectedMeter(filterstate.meter);
      setSelectedMeterState(
        filterstate.meter.length < 2
          ? filterstate.meter.map((m) => m.Name)
          : groupMeters(filterstate.meter).map((m) => m.title),
      );
      meterRef.current = filterstate.meter;
    }
  }, [premiseState.selectedPremise, dispatch, setSelectedMeter]);

  const meters: Meter[] = premiseState.selectedPremise?.Meters || [];

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
