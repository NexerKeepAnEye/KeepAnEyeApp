import { SimpleLineIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { usePremiseContext } from '../Context/PremiseContext';
import { RootStackParamList } from '../Navigation/RootStackNavigation';
import { premiseCardStyle } from '../Style/PremiseCardStyle';

type Props<T extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
};

const PremiseCard = <T extends keyof RootStackParamList>({
  navigation,
}: Props<T>) => {
  const { state, dispatch } = usePremiseContext();

  return (
    <TouchableHighlight
      onPress={() => {
        dispatch({ type: 'RESET_PREMISE' });
        navigation.navigate('StartScreen');
      }}
      underlayColor={'transparent'}
      style={premiseCardStyle.cardButton}
    >
      <Card style={premiseCardStyle.card}>
        <View style={premiseCardStyle.row}>
          {state.selectedPremise ? (
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
                  {state.selectedPremise.Name}
                </Text>
                <Text style={premiseCardStyle.subtitle}>
                  Beteckning: {state.selectedPremise.Designation}
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
    </TouchableHighlight>
  );
};

export default PremiseCard;
