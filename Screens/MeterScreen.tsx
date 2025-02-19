import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { BackHandler, Platform, View } from 'react-native';
import MeterComponent from '../Components/MeterComponent';
import PremiseCard from '../Components/PremiseCard';
import { RootStackParamList } from '../Navigation/RootStackNavigation';
import { PremiseScreenStyle } from '../Style/PremiseScreenStyle';

type Prop = NativeStackNavigationProp<RootStackParamList, 'MeterDataScreen'>;

type Props = {
  navigation: Prop;
};

export default function PremiseScreen({ navigation }: Props) {
  // if (Platform.OS === 'android') {
  //   BackHandler.addEventListener('hardwareBackPress', () => {
  //     navigation.navigate('StartScreen');
  //     return true;
  //   });
  // }
  return (
    <View style={PremiseScreenStyle.container}>
      <PremiseCard navigation={navigation} />
      <MeterComponent navigation={navigation} />
    </View>
  );
}
