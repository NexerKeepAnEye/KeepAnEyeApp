import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { Card } from 'react-native-paper';
import { RootStackParamList } from '../Navigation/RootStackNavigation';
import { usePremiseContext } from '../PremiseState/PremiseContext';
import { MeterDataCardStyle } from '../Style/MeterDataCardStyle';
import MeterIcon from './MeterIcon';

type Props = {
  meterId: number;
  navigation?: NativeStackNavigationProp<RootStackParamList>;
};

export default function MeterDataCard({ meterId, navigation }: Props) {
  const { state } = usePremiseContext();

  const meter = state.premise?.Meters.find((m) => m.Id === meterId);

  return (
    <TouchableHighlight
      onPress={() => {
        navigation?.goBack();
      }}
      underlayColor={'#ddd'}
      style={{ borderRadius: 10 }}
    >
      <Card style={MeterDataCardStyle.card}>
        <View style={MeterDataCardStyle.row}>
          {state.premise?.Name ? (
            <>
              <View style={MeterDataCardStyle.iconContainer}>
                <MeterIcon productCode={meter?.ProductCode ?? ''} />
              </View>
              <Card.Content style={MeterDataCardStyle.content}>
                <Text style={MeterDataCardStyle.title}>{meter?.Name}</Text>
                <Text style={MeterDataCardStyle.subtitle}>
                  Designation: {meter?.ProductCode}
                </Text>
              </Card.Content>
            </>
          ) : (
            <Card.Content style={MeterDataCardStyle.content}>
              <Text style={MeterDataCardStyle.noTitle}>
                No premise provided!
              </Text>
            </Card.Content>
          )}
        </View>
      </Card>
    </TouchableHighlight>
  );
}
