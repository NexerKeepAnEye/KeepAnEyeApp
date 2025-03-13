import { useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { BackHandler, View } from 'react-native';
import MeterComponent from '../Components/MeterComponent';
import PremiseCard from '../Components/PremiseCard';
import { useFilterContext } from '../Context/FilterContext';
import { RootStackParamList } from '../Navigation/RootStackNavigation';
import { PremiseScreenStyle } from '../Style/PremiseScreenStyle';

type Prop = NativeStackNavigationProp<RootStackParamList, 'MeterDataScreen'>;

type Props = {
  navigation: Prop;
};

export default function PremiseScreen({ navigation }: Props) {
  const { state } = useFilterContext();

  useFocusEffect(() => {
    if (state.meter.length > 0) {
      navigation.navigate('MeterDataScreen');
    } else {
      const onBackPress = () => {
        navigation.navigate('StartScreen');
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
