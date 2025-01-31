import React, { useState } from 'react';
import {
  Modal,
  SectionList,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { usePremiseContext } from '../../Context/PremiseContext';
import { meterSearch } from '../../Style/MeterSearchStyle';
import { Meter } from '../../Types/Type';
import MeterIcon from '../MeterIcon';

interface Section {
  title: string;
  data: Meter[];
}

interface MeterSearchProps {
  setSelectedMeter: (meter: Meter[]) => void;

  meters: Meter[] | undefined;
}

export function MeterSearch({ setSelectedMeter }: MeterSearchProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMeter, setSelectedMeterState] = useState<
    string[] | undefined
  >();
  const { state } = usePremiseContext();
  const meters: Meter[] =
    state.premises?.flatMap((premise) => premise.Meters) || [];

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
      data: meters.filter((meter) => meter.ProductId === 22),
    },
    {
      title: 'El',
      data: meters.filter((meter) => meter.ProductId === 23),
    },
    {
      title: 'Fjärrkyla',
      data: meters.filter((meter) => meter.ProductId === 24),
    },
    {
      title: 'Vatten',
      data: meters.filter((meter) => meter.ProductId === 25),
    },
    {
      title: 'Effekt',
      data: meters.filter((meter) => meter.ProductId === 26),
    },
    {
      title: 'Flöde',
      data: meters.filter((meter) => meter.ProductId === 27),
    },
    {
      title: 'Temperatur',
      data: meters.filter(
        (meter) => meter.ProductId === 28 || meter.ProductId === 29,
      ),
    },
    {
      title: 'Volym',
      data: meters.filter((meter) => meter.ProductId === 30),
    },
    {
      title: 'Olja',
      data: meters.filter((meter) => meter.ProductId === 31),
    },
    {
      title: 'Fjärrvärme sek',
      data: meters.filter((meter) => meter.ProductId === 32),
    },
    {
      title: 'El sek',
      data: meters.filter((meter) => meter.ProductId === 33),
    },
    {
      title: 'Fjärrkyla sek',
      data: meters.filter((meter) => meter.ProductId === 34),
    },
    {
      title: 'Vatten sek',
      data: meters.filter((meter) => meter.ProductId === 35),
    },
    {
      title: 'Fjärrvärme under',
      data: meters.filter((meter) => meter.ProductId === 36),
    },
    {
      title: 'El under',
      data: meters.filter((meter) => meter.ProductId === 37),
    },
    {
      title: 'Fjärrkyla under',
      data: meters.filter((meter) => meter.ProductId === 38),
    },
    {
      title: 'Vatten under',
      data: meters.filter((meter) => meter.ProductId === 39),
    },
    {
      title: 'NN',
      data: meters.filter((meter) => meter.ProductId === 66),
    },
    {
      title: 'Fjärrkyla',
      data: meters.filter((meter) => meter.ProductId === 67),
    },
    {
      title: 'Fjärrvärme Virtuell',
      data: meters.filter((meter) => meter.ProductId === 68),
    },
    {
      title: 'El Virtuell',
      data: meters.filter((meter) => meter.ProductId === 69),
    },
    {
      title: 'Industriellt Vatten',
      data: meters.filter((meter) => meter.ProductId === 70),
    },
    {
      title: 'BSK',
      data: meters.filter((meter) => meter.ProductId === 71),
    },
    {
      title: 'Utetemperatur',
      data: meters.filter((meter) => meter.ProductId === 72),
    },
    {
      title: 'Fjärrvärme Effekt',
      data: meters.filter((meter) => meter.ProductId === 305),
    },
    {
      title: 'El Effekt',
      data: meters.filter((meter) => meter.ProductId === 306),
    },
    {
      title: 'Övrigt',
      data: meters.filter(
        (meter) =>
          ![
            22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
            39, 66, 67, 68, 69, 70, 71, 72, 305, 306,
          ].includes(meter.ProductId),
      ),
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
            {selectedMeter?.toString() || ' Mätare '}
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
                      <MeterIcon productId={item.ProductId} />
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
