import { RouteProp } from '@react-navigation/native';
import * as React from 'react';
import { Text, View } from 'react-native';
import { TabParamList } from '../Navigation/TabNavigator';

type ReportScreenRouteProp = RouteProp<TabParamList, 'ReportScreen'>;

type Props = {
  route: ReportScreenRouteProp;
};

export default function ReportScreen({ route }: Props) {
  const { premiseId } = route.params;

  return (
    <View>
      <Text>REPORT SCREEN</Text>
      <Text>Premise Id: {premiseId}</Text>
    </View>
  );
}
