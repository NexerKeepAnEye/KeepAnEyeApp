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
  cell: {
    borderColor: '#d9d9d9',
    borderBottomWidth: 0.8,
  },
  text: {
    fontSize: 18,
    textAlign: 'left',
    marginTop: '50%',
    fontStyle: 'italic',
    color: '#ababab',
  },
});
