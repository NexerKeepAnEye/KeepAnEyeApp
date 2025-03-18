import { SimpleLineIcons } from '@expo/vector-icons';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { useFilterContext } from '../Context/FilterContext';
import { initialState } from '../Context/FilterReducer';
import { usePremiseContext } from '../Context/PremiseContext';
import { RootStackParamList } from '../Navigation/RootStackNavigation';
import { TabParamList } from '../Navigation/TabNavigator';
import { premiseCardStyle } from '../Style/PremiseCardStyle';

type Prop = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList>,
  BottomTabNavigationProp<TabParamList>
>;

type Props = {
  navigation: Prop;
};

const PremiseCard = ({ navigation }: Props) => {
  const { state, dispatch } = usePremiseContext();
  const { dispatch: filterDispatch } = useFilterContext();

  return (
    <TouchableHighlight
      onPress={() => {
        filterDispatch({ type: 'SET_METER', payload: initialState.meter });
        filterDispatch({
          type: 'SET_FILTERED_RESULTS',
          payload: initialState.filteredResults,
        });
        navigation.navigate('PremisesScreen');
        setTimeout(() => {
          dispatch({ type: 'RESET_PREMISE' });
        }, 100);
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
              <Text style={premiseCardStyle.noTitle}>
                Ingen fastighet vald!
              </Text>
            </Card.Content>
          )}
        </View>
      </Card>
    </TouchableHighlight>
  );
};

export default PremiseCard;
