import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { View } from 'react-native';
import Accordion from '../Components/Accordion';
import PremiseCard from '../Components/PremiseCard';
import { RootStackParamList } from '../Navigation/RootStackNavigation';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ReportScreen'>;
};

export default function ReportScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <PremiseCard navigation={navigation} />
      <Accordion />
    </View>
  );
}
