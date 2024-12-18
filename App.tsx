import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Accordion from './Accordion';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Accordion />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'f4f5f7',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 200,
  },
});
