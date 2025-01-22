import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { Card } from 'react-native-paper';
import { usePremiseContext } from '../Context/PremiseContext';
import { RootStackParamList } from '../Navigation/RootStackNavigation';
import { MeterDataCardStyle } from '../Style/MeterDataCardStyle';
import MeterIcon from './MeterIcon';

type Props = {
  meterId: number;
  navigation?: NativeStackNavigationProp<RootStackParamList>;
};

export default function MeterDataCard({ meterId, navigation }: Props) {
  const { state } = usePremiseContext();

  const meter = state.selectedPremise?.Meters.find((m) => m.Id === meterId);

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
          {state.selectedPremise?.Name ? (
            <>
              <View style={MeterDataCardStyle.iconContainer}>
                <MeterIcon productId={meter?.ProductId ?? 0} />
              </View>
              <Card.Content style={MeterDataCardStyle.content}>
                <Text style={MeterDataCardStyle.title}>{meter?.Name}</Text>
                <Text style={MeterDataCardStyle.subtitle}>
                  Produktkod: {meter?.ProductCode}
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
