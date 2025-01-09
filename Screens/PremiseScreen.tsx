import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import MeterComponent from '../Components/MeterComponent';
import PremiseCard from '../Components/PremiseCard';
import { RootStackParamList } from '../Navigation/RootStackNavigation';

type Prop = NativeStackNavigationProp<RootStackParamList, 'MeterDataScreen'>;

type Props = {
  navigation: Prop;
};

export default function PremiseScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1 }}>
      <PremiseCard />
      <MeterComponent navigation={navigation} />
    </View>
  );
}
