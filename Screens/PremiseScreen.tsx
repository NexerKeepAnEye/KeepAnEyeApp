import * as React from 'react';
import { FlatList, View } from 'react-native';
import { List, Text } from 'react-native-paper';
import { mockedPremises } from '../MockedData/MockedPremises';

export default function PremiseScreen() {
  const renderItem = ({
    item,
  }: {
    item: { id: number; name: string; designation: string };
  }) => (
    <List.Item
      title={item.name}
      description={`Designation: ${item.designation}`}
      left={() => <List.Icon icon="home" />}
    />
  );

  return (
    <View>
      <Text>PREMISE SCREEN</Text>
      <FlatList
        data={mockedPremises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}
