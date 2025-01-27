import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { usePremiseContext } from '../Context/PremiseContext';
import { MeterIconStyle } from '../Style/MeterIconStyle';

export default function MeterIcon({ productId }: { productId: number }) {
  const { state } = usePremiseContext();

  const iconSelector = (productId: number) => {
    if (state.products.find((product) => product.Id === productId)?.Id === 1) {
      return 'local-fire-department';
    } else if (
      state.products.find((product) => product.Id === productId)?.Id === 4 ||
      state.products.find((product) => product.Id === productId)?.Id === 6 ||
      state.products.find((product) => product.Id === productId)?.Id === 7 ||
      state.products.find((product) => product.Id === productId)?.Id === 8
    ) {
      return 'water-drop';
    } else if (
      state.products.find((product) => product.Id === productId)?.Id === 9
    ) {
      return 'thermostat';
    } else if (
      state.products.find((product) => product.Id === productId)?.Id === 3 ||
      state.products.find((product) => product.Id === productId)?.Id === 5
    ) {
      return 'bolt';
    } else if (
      state.products.find((product) => product.Id === productId)?.Id === 2
    ) {
      return 'ac-unit';
    } else if (
      state.products.find((product) => product.Id === productId)?.Id === 10
    ) {
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
