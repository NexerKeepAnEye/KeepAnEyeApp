import { SimpleLineIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { usePremiseContext } from '../PremiseState/PremiseContext';
import { premiseCardStyle } from '../Style/PremiseCardStyle';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation/RootStackNavigation';

type Prop = NativeStackNavigationProp<RootStackParamList, 'MeterDataScreen'>;

type Props = {
  navigation: Prop;
};

const PremiseCard = ({ navigation }: Props) => {
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
