import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { BackHandler, Text, View } from 'react-native';
import MeterDataCard from '../Components/MeterDataCard';
import MeterDataGrid from '../Components/MeterDataGrid';
import PremiseCard from '../Components/PremiseCard';
import { useFilterContext } from '../Context/FilterContext';
import { usePremiseContext } from '../Context/PremiseContext';
import { RootStackParamList } from '../Navigation/RootStackNavigation';
import { MeterDataScreenStyle } from '../Style/MeterDataScreenStyle';

type Props = NativeStackScreenProps<RootStackParamList, 'tabs'>;

export default function MeterDataScreen({ navigation }: Props) {
  const { state: filterState, dispatch } = useFilterContext();
  const meterId = filterState.meter.length > 0 ? filterState.meter[0].Id : null;
  const { state } = usePremiseContext();
  const meter = state.selectedPremise?.Meters.find((m) => m.Id === meterId);
  const meterData = state.meterData
    ? state.meterData.filter((data) => data.MeterId === meterId)
    : [];

  useFocusEffect(
    React.useCallback(() => {
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

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (e.data.action.type !== 'GO_BACK') {
        e.preventDefault();
        navigation.navigate('tabs', { screen: 'MeterScreen' });
      }
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={MeterDataScreenStyle.container}>
      <PremiseCard navigation={navigation} />
      {meter ? (
        <View style={MeterDataScreenStyle.container}>
          <MeterDataCard
            meterId={meter.Id}
            navigation={navigation}
          />
          <MeterDataGrid
            meterId={meter.Id}
            meterData={meterData}
          />
        </View>
      ) : (
        <Text>Meter not found</Text>
      )}
    </View>
  );
}
