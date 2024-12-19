import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignInScreen from './Screens/SignInScreen';
import { GeneralStyle } from './Style/ChartStyle';

export default function App() {
  return (
    <SafeAreaView style={GeneralStyle.container}>
      <View style={GeneralStyle.container}>
        <Text> App start sida </Text>
        <SignInScreen />
      </View>
    </SafeAreaView>
  );
}
