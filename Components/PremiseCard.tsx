import { SimpleLineIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { TouchableHighlight, View } from 'react-native';
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
  const { state, dispatch } = usePremiseContext();

  return (
    <TouchableHighlight
      onPress={() => {
        dispatch({ type: 'RESET_PREMISE' });
        navigation.navigate('StartScreen');
      }}
      underlayColor={'#ddd'}
      style={{ borderRadius: 10 }}
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
                  {state.selectedPremise.name}
                </Text>
                <Text style={premiseCardStyle.subtitle}>
                  Beteckning: {state.selectedPremise.designation}
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
