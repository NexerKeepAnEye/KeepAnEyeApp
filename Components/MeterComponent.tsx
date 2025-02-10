import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { SectionList, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { usePremiseContext } from '../Context/PremiseContext';
import { RootStackParamList } from '../Navigation/RootStackNavigation';
import { MeterComponentStyle } from '../Style/MeterComponentStyle';
import { meterSearch } from '../Style/MeterSearchStyle';
import { Meter, MeterData } from '../Types/Type';
import { groupMeters, Section } from './GroupMeter';
import MeterIcon from './MeterIcon';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MeterDataScreen'>;
};

export default function MeterComponent({ navigation }: Props) {
  const { state, dispatch } = usePremiseContext();
  const meters = state.selectedPremise?.Meters || [];
  const sections = groupMeters(meters);

  const handleSelectMeter = (item: Meter) => {
    const meterData: MeterData[] = state.meterData.filter(
      (data) => data.MeterId === item.Id,
    );
    dispatch({
      type: 'SET_METER_DATA',
      payload: meterData,
    });
    navigation.navigate('MeterDataScreen', {
      meterId: item.Id,
    });
  };

  const renderMeter = ({ item }: { item: Meter }) => (
    <TouchableOpacity
      style={MeterComponentStyle.listItem}
      key={item.Id}
      onPress={() => handleSelectMeter(item)}
    >
      <View style={MeterComponentStyle.meterIconList}>
        <MeterIcon productId={item.ProductId} />
      </View>
      <View style={MeterComponentStyle.textContainer}>
        <Text style={MeterComponentStyle.textStyleName}>{item?.Name}</Text>
        <Text style={MeterComponentStyle.textStyleProductCode}>
          {item?.ProductCode}
        </Text>
      </View>
      <MaterialIcons
        name="keyboard-arrow-right"
        size={35}
        style={MeterComponentStyle.arrow}
      />
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section }: { section: Section }) => (
    <View style={meterSearch.sectionHeader}>
      <Text style={meterSearch.sectionHeaderText}>{section.title}</Text>
    </View>
  );

  return (
    <>
      <Text style={MeterComponentStyle.title}>Mätare</Text>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.Id.toString()}
        renderItem={renderMeter}
        renderSectionHeader={renderSectionHeader}
        style={MeterComponentStyle.container}
        bounces={false}
      />
    </>
  );
}
