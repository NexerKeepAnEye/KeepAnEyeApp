import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  useFocusEffect,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { BackHandler, View } from 'react-native';
import { Props } from 'react-native-paper';
import MeterComponent from '../Components/MeterComponent';
import PremiseCard from '../Components/PremiseCard';
import { useFilterContext } from '../Context/FilterContext';
import { RootStackParamList } from '../Navigation/RootStackNavigation';
import { TabParamList } from '../Navigation/TabNavigator';
import { PremiseScreenStyle } from '../Style/PremiseScreenStyle';

type Prop = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList, 'tabs'>,
  BottomTabNavigationProp<TabParamList, 'MeterScreen'>
>;
type Props = {
  navigation: Prop;
};

export default function MeterScreen({ navigation }: Props) {
  const { state } = useFilterContext();

  useFocusEffect(() => {
    if (state.meter.length > 0) {
      navigation.navigate('MeterDataScreen');
    } else {
      const onBackPress = () => {
        navigation.navigate('PremisesScreen');
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => backHandler.remove();
    }
  });
  return (
    <View style={PremiseScreenStyle.container}>
      <PremiseCard navigation={navigation} />
      <MeterComponent navigation={navigation} />
    </View>
  );
}
