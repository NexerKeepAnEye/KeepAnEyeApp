import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { useRef, useState } from 'react';
import { SectionList, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFilterContext } from '../Context/FilterContext';
import { usePremiseContext } from '../Context/PremiseContext';
import { RootStackParamList } from '../Navigation/RootStackNavigation';
import { deviceHeight } from '../Style/Dimensions';
import { MeterComponentStyle } from '../Style/MeterComponentStyle';
import { meterSearch } from '../Style/MeterSearchStyle';
import { Meter } from '../Types/Type';
import { groupMeters, Section } from '../Utils/GroupMeter';
import MeterIcon from './MeterIcon';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'tabs'>;
};

export default function MeterComponent({ navigation }: Props) {
  const { state } = usePremiseContext();
  const { dispatch: filterDispatch } = useFilterContext();
  const meters = state.selectedPremise?.Meters || [];
  const sections = groupMeters(meters);

  const [showButton, setShowButton] = useState(false);
  const sectionListRef = useRef<SectionList>(null);

  const handleSelectMeter = (item: Meter) => {
    filterDispatch({
      type: 'SET_METER',
      payload: [item],
    });
    navigation.navigate('tabs', { screen: 'MeterDataScreen' });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    if (scrollPosition > deviceHeight) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const renderMeter = ({ item }: { item: Meter }) => (
    <TouchableOpacity
      style={MeterComponentStyle.listItem}
      key={item.Id}
      onPress={() => handleSelectMeter(item)}
    >
      <View style={MeterComponentStyle.meterIconList}>
        <MeterIcon productCode={item.ProductCode} />
      </View>
      <View style={MeterComponentStyle.textContainer}>
        <Text style={MeterComponentStyle.textStyleName}>
          {item?.Name.trimEnd()}
        </Text>
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
      <Text style={MeterComponentStyle.margin}></Text>
      <SectionList
        ref={sectionListRef}
        sections={sections}
        keyExtractor={(item) => item.Id.toString()}
        renderItem={renderMeter}
        renderSectionHeader={renderSectionHeader}
        style={MeterComponentStyle.container}
        bounces={false}
        onScroll={handleScroll}
        scrollEventThrottle={4}
      />
      {showButton && (
        <View style={MeterComponentStyle.goToTop}>
          <TouchableOpacity
            onPress={() => {
              sectionListRef.current?.scrollToLocation({
                sectionIndex: 0,
                itemIndex: 0,
                animated: true,
              });
            }}
          >
            <MaterialIcons
              name="arrow-upward"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
