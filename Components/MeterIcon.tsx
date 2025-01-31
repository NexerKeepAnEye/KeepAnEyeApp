import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MeterIconStyle } from '../Style/MeterIconStyle';

export default function MeterIcon({ productId }: { productId: number }) {
  const isProductId = (productId: number, ids: number[]) =>
    ids.includes(productId);

  const iconSelector = (productId: number) => {
    if (isProductId(productId, [22, 36, 32, 68, 305])) {
      return 'local-fire-department';
    } else if (isProductId(productId, [25, 35, 39, 70, 30])) {
      return 'water-drop';
    } else if (isProductId(productId, [28, 29, 72])) {
      return 'thermostat';
    } else if (isProductId(productId, [23, 33, 37, 69, 306])) {
      return 'bolt';
    } else if (isProductId(productId, [24, 34, 38, 67])) {
      return 'ac-unit';
    } else if (isProductId(productId, [31])) {
      return 'local-gas-station';
    } else if (isProductId(productId, [26])) {
      return 'electrical-services';
    } else if (isProductId(productId, [27])) {
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
