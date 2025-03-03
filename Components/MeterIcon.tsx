import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MeterIconStyle } from '../Style/MeterIconStyle';

export default function MeterIcon({ productCode }: { productCode: string }) {
  const isProductId = (productCode: string, ids: string[]) =>
    ids.includes(productCode);

  const iconSelector = (productCode: string) => {
    if (
      isProductId(productCode, [
        'FJV',
        'FJV sek',
        'FJV under',
        'FJV Effekt',
        'FJV Energi',
      ])
    ) {
      return 'local-fire-department';
    } else if (
      isProductId(productCode, [
        'VAT',
        'Flöde',
        'VOL',
        'VAT sek',
        'VAT under',
        'VAT ind',
      ])
    ) {
      return 'water-drop';
    } else if (isProductId(productCode, ['TMP'])) {
      return 'thermostat';
    } else if (
      isProductId(productCode, ['EL', 'El', 'EL sek', 'EL under', 'EL Effekt'])
    ) {
      return 'bolt';
    } else if (isProductId(productCode, ['FJK', 'FJK sek', 'FJK under'])) {
      return 'ac-unit';
    } else if (isProductId(productCode, [])) {
      return 'local-gas-station';
    } else if (isProductId(productCode, ['Effekt'])) {
      return 'electrical-services';
    } else if (isProductId(productCode, [''])) {
      return 'double-arrow';
    }

    return 'help-outline';
  };

  return (
    <View>
      <Icon
        name={iconSelector(productCode)}
        style={MeterIconStyle.icon}
      />
    </View>
  );
}
