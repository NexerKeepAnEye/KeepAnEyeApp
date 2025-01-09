import * as React from 'react';
import { View } from 'react-native';
import Accordion from '../Components/Accordion';
import PremiseCard from '../Components/PremiseCard';

export default function ReportScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <PremiseCard />
      <Accordion />
    </View>
  );
}
