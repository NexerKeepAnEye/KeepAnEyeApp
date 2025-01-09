import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MeterIconStyle } from '../Style/MeterIconStyle';

export default function MeterIcon({ productCode }: { productCode: string }) {
  const iconSelector = (productCode: string) => {
    if (productCode.includes('FJV')) {
      return 'local-fire-department';
    } else if (productCode.includes('VAT') || productCode.includes('VOL')) {
      return 'water-drop';
    } else if (productCode.includes('TMP')) {
      return 'thermostat';
    } else if (productCode.includes('El')) {
      return 'bolt';
    } else if (productCode.includes('FJK')) {
      return 'ac-unit';
    } else if (productCode.includes('OLJA')) {
      return 'local-gas-station';
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
