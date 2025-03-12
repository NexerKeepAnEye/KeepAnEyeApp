import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { Card } from 'react-native-paper';
import { useFilterContext } from '../Context/FilterContext';
import { initialState } from '../Context/FilterReducer';
import { usePremiseContext } from '../Context/PremiseContext';
import { RootStackParamList } from '../Navigation/RootStackNavigation';
import { CardStyle } from '../Style/MeterDataCardStyle';
import MeterIcon from './MeterIcon';

type Props = {
  meterId: number;
  navigation?: NativeStackNavigationProp<RootStackParamList>;
};

export default function MeterDataCard({ meterId, navigation }: Props) {
  const { state } = usePremiseContext();
  const [expanded, setExpanded] = useState(false);
  const [textHeight, setTextHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const { dispatch } = useFilterContext();
  const textRef = useRef<Text>(null);

  const meter = state.selectedPremise?.Meters.find((m) => m.Id === meterId);

  useEffect(() => {
    if (textHeight > containerHeight) {
      setExpanded(true);
    }
  }, [textHeight, containerHeight]);

  return (
    <TouchableHighlight
      onPress={() => {
        dispatch({ type: 'SET_METER', payload: initialState.meter });
        dispatch({
          type: 'SET_FILTERED_RESULTS',
          payload: initialState.filteredResults,
        });
        navigation?.goBack();
      }}
      underlayColor={'transparent'}
      style={CardStyle.cardButton}
    >
      <Card style={[CardStyle.card, expanded ? CardStyle.expandedCard : {}]}>
        <View style={CardStyle.row}>
          {state.selectedPremise?.Name ? (
            <>
              <View style={CardStyle.iconContainer}>
                <MeterIcon productCode={meter?.ProductCode ?? ''} />
              </View>
              <Card.Content
                style={CardStyle.content}
                onLayout={(event) => {
                  const { height } = event.nativeEvent.layout;
                  setContainerHeight(height);
                }}
              >
                <Text
                  ref={textRef}
                  style={CardStyle.title}
                  numberOfLines={expanded ? undefined : 1}
                  onLayout={(event) => {
                    const { height } = event.nativeEvent.layout;
                    setTextHeight(height);
                  }}
                >
                  {meter?.Name}
                </Text>
                <Text style={CardStyle.subtitle}>
                  Produktkod: {meter?.ProductCode}
                </Text>
              </Card.Content>
            </>
          ) : (
            <Card.Content style={CardStyle.content}>
              <Text style={CardStyle.noTitle}>Ingen mätare vald!</Text>
            </Card.Content>
          )}
        </View>
      </Card>
    </TouchableHighlight>
  );
}
