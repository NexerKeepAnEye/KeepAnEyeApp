import { SimpleLineIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { RootStackParamList } from '../Navigation/RootStackNavigation';
import { usePremiseContext } from '../PremiseState/PremiseContext';
import { premiseCardStyle } from '../Style/PremiseCardStyle';

type Props<T extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
};

const PremiseCard = <T extends keyof RootStackParamList>({
  navigation,
}: Props<T>) => {
  const { state } = usePremiseContext();

  return (
    <Pressable onPress={() => navigation.navigate('StartScreen')}>
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
                <Text style={premiseCardStyle.title}>
                  {state.premise?.Name}
                </Text>
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
    </Pressable>
  );
};

export default PremiseCard;
