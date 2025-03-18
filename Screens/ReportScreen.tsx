import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { View } from 'react-native';
import Accordion from '../Components/Accordion';
import PremiseCard from '../Components/PremiseCard';
import { RootStackParamList } from '../Navigation/RootStackNavigation';
import { TabParamList } from '../Navigation/TabNavigator';
import { ReportScreenStyle } from '../Style/ReportScreenStyle';

type Prop = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList, 'tabs'>,
  BottomTabNavigationProp<TabParamList, 'ReportScreen'>
>;

type Props = {
  navigation: Prop;
};

export default function ReportScreen({ navigation }: Props) {
  return (
    <View style={ReportScreenStyle.container}>
      <PremiseCard navigation={navigation} />
      <Accordion />
    </View>
  );
}
