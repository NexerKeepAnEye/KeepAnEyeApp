import { SimpleLineIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { usePremiseContext } from '../PremiseState/PremiseContext';
import { premiseCardStyle } from '../Style/PremiseCardStyle';

const PremiseCard = () => {
  const { state } = usePremiseContext();

  return (
    <Card style={premiseCardStyle.card}>
      <View style={premiseCardStyle.row}>
        {state.premise?.Name ? (
          <>
            <View style={premiseCardStyle.iconContainer}>
              <SimpleLineIcons
                name="location-pin"
                size={43}
                color="#ff7f57"
              />
            </View>
            <Card.Content style={premiseCardStyle.content}>
              <Text style={premiseCardStyle.title}>{state.premise?.Name}</Text>
              <Text style={premiseCardStyle.subtitle}>
                Designation: {state.premise?.Designation}
              </Text>
            </Card.Content>
          </>
        ) : (
          <Card.Content style={premiseCardStyle.content}>
            <Text style={premiseCardStyle.noTitle}>No premise provided!</Text>
          </Card.Content>
        )}
      </View>
    </Card>
  );
};

export default PremiseCard;
