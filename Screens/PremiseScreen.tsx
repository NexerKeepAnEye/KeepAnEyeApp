import * as React from 'react';
import { View } from 'react-native';
import MeterComponent from '../Components/MeterComponent';
import PremiseCard from '../Components/PremiseCard';
import { PremiseScreenStyle } from '../Style/PremiseScreenStyle';

export default function PremiseScreen() {
  return (
    <View style={PremiseScreenStyle.container}>
      <PremiseCard />
      <MeterComponent />
    </View>
  );
}
