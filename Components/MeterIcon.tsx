import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MeterIconStyle } from '../Style/MeterIconStyle';

export default function MeterIcon({ productId }: { productId: number }) {
  const isProductId = (productId: number, ids: number[]) =>
    ids.includes(productId);

  const iconSelector = (productId: number) => {
    if (isProductId(productId, [22, 25, 36, 63, 67, 305, 505])) {
      return 'local-fire-department';
    } else if (isProductId(productId, [28, 30, 33, 35, 39, 66, 70, 426])) {
      return 'water-drop';
    } else if (isProductId(productId, [31, 32, 72])) {
      return 'thermostat';
    } else if (isProductId(productId, [23, 37, 64, 68, 306, 506])) {
      return 'bolt';
    } else if (isProductId(productId, [24, 27, 34, 38, 65, 69])) {
      return 'ac-unit';
    } else if (isProductId(productId, [])) {
      return 'local-gas-station';
    } else if (isProductId(productId, [26, 29])) {
      return 'electrical-services';
    } else if (isProductId(productId, [0])) {
      return 'double-arrow';
    }

    return 'help-outline';
  };

  return (
    <View>
      <Icon
        name={iconSelector(productId)}
        style={MeterIconStyle.icon}
      />
    </View>
  );
}
