import * as React from 'react';
import { View } from 'react-native';
import PremiseCard from '../Components/PremiseCard';

// type MeterComponentProps = {
//   navigation: PremiseScreenNavigationProp;
// };

export default function MeterDataScreen() {
  return (
    <View>
      <PremiseCard />

      {/* 
    "Fastighet" as bottomTab
    Show which premises you're at, which meter you've selected and a filter button to render data 
      */}
    </View>
  );
}
