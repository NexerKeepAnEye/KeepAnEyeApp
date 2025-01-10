import { StyleSheet, Dimensions } from 'react-native';

export const MeterDataGridStyle = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.9, // 90% of screen width
    marginTop: 20,
  },
  header: {
    backgroundColor: '#d9d9d9',
    justifyContent: 'space-evenly',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
  },
});