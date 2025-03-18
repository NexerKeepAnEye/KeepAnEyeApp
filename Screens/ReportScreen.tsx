import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  useFocusEffect,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { BackHandler, View } from 'react-native';
import Accordion from '../Components/Accordion';
import PremiseCard from '../Components/PremiseCard';
import { useFilterContext } from '../Context/FilterContext';
import { RootStackParamList } from '../Navigation/RootStackNavigation';
import { TabParamList } from '../Navigation/TabNavigator';
import { ReportScreenStyle } from '../Style/ReportScreenStyle';

type Prop = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList, 'tabs'>,
  BottomTabNavigationProp<TabParamList, 'ReportScreen'>
>;

type Props = {
  navigation: Prop;
};

export default function ReportScreen({ navigation }: Props) {
  const { state } = useFilterContext();
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (state.meter.length > 0) {
          navigation.navigate('MeterDataScreen');
        } else {
          navigation.navigate('MeterScreen');
        }
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => backHandler.remove();
    }, [navigation, state.meter]),
  );
  return (
    <View style={ReportScreenStyle.container}>
      <PremiseCard navigation={navigation} />
      <Accordion />
    </View>
  );
}
