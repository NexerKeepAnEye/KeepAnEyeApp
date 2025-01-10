import { Dimensions, StyleSheet, TextStyle } from 'react-native';

export const MeterDataGridStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // marginBottom: 20,
  },
  gridContainer: {
    width: Dimensions.get('window').width * 0.95,
    marginTop: 20,
  },
  header: {
    backgroundColor: '#d9d9d9',
    justifyContent: 'space-evenly',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
  } as TextStyle,
});