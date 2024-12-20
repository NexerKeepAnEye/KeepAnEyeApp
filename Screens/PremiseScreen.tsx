import { RouteProp } from '@react-navigation/native';
import * as React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { RootStackParamList } from '../Navigation/RootStackNavigation';

type PremiseScreenRouteProp = RouteProp<RootStackParamList, 'PremiseScreen'>;

type Props = {
  route: PremiseScreenRouteProp;
};

export default function PremiseScreen({ route }: Props) {
  const { premiseId } = route.params;

  return (
    <View>
      <Text>PREMISE SCREEN</Text>
      <Text>Fastighet Id: {premiseId}</Text>
    </View>
  );
}
