import { StyleSheet, TextStyle } from 'react-native';
import { deviceHeight, deviceWidth } from './Dimensions';

export const MeterDataGridStyle = StyleSheet.create({
  gridContainer: {
    width: deviceWidth * 0.9,
    marginTop: deviceHeight * 0.02,
    marginBottom: deviceHeight * 0.001,
  },
  header: {
    backgroundColor: '#d9d9d9',
    justifyContent: 'space-evenly',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontFamily: 'inter_Bold',
  } as TextStyle,

  cell: {
    borderColor: '#d9d9d9',
    borderBottomWidth: 0.8,
  },
  text: {
    fontSize: deviceHeight * 0.018,
    textAlign: 'left',
    marginTop: deviceHeight * 0.01,
    fontFamily: 'inter_BlackItalic',
    color: '#ababab',
  },
});
