import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  useFocusEffect,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { BackHandler, View } from 'react-native';
import MeterComponent from '../Components/MeterComponent';
import PremiseCard from '../Components/PremiseCard';
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
  // React.useEffect(() => {
  //   if (Platform.OS === 'ios') {
  //     navigation.setOptions({
  //       gestureEnabled: false,
  //     });
  //   }
  // }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('tabs', { screen: 'MeterScreen' });
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => backHandler.remove();
    }, [navigation]),
  );

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('beforeRemove', (e) => {
  //     if (e.data.action.type !== 'GO_BACK') {
  //       e.preventDefault();
  //       navigation.navigate('tabs', { screen: 'MeterScreen' });
  //     }
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  return (
    <View style={PremiseScreenStyle.container}>
      <PremiseCard navigation={navigation} />
      <MeterComponent navigation={navigation} />
    </View>
  );
}
