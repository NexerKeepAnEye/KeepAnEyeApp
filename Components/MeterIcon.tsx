import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchProduct } from '../Api/fetchAPI';
import { MeterIconStyle } from '../Style/MeterIconStyle';

export default function MeterIcon({ productId }: { productId: number }) {
  fetchProduct('abc');
  const iconSelector = (productId: number) => {
    if (productId === 1) {
      return 'local-fire-department';
    } else if (
      productId === 4 ||
      productId === 6 ||
      productId === 7 ||
      productId === 8
    ) {
      return 'water-drop';
    } else if (productId === 9) {
      return 'thermostat';
    } else if (productId === 3 || productId === 5) {
      return 'bolt';
    } else if (productId === 2) {
      return 'ac-unit';
    } else if (productId === 10) {
      return 'local-gas-station';
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
