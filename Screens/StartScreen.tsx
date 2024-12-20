import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { mockedPremises } from '../MockedData/MockedPremises';
import { RootStackParamList } from '../Navigation/RootStackNavigation';

type StartScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'StartScreen'
>;

type Props = {
  navigation: StartScreenNavigationProp;
};

export default function StartScreen({ navigation }: Props) {
  const renderItem = ({ item }: { item: { id: number; name: string } }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('tabs', {
          screen: 'PremiseScreen',
          params: { premiseId: item.id },
        })
      }
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );
  return (
    <>
      <View style={{ marginTop: 50 }}>
        <Text>START SCREEN</Text>
        Go to Premises
        <FlatList
          data={mockedPremises}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
    </>
  );
}
