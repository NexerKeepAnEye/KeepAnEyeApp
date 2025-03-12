import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { View } from 'react-native';
import Accordion from '../Components/Accordion';
import PremiseCard from '../Components/PremiseCard';
import { RootStackParamList } from '../Navigation/RootStackNavigation';
import { ReportScreenStyle } from '../Style/ReportScreenStyle';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ReportScreen'>;
};

export default function ReportScreen({ navigation }: Props) {
  return (
    <View style={ReportScreenStyle.container}>
      <PremiseCard navigation={navigation} />
      <Accordion />
    </View>
  );
}
