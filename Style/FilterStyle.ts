import { Dimensions, StyleSheet } from 'react-native';
import { height, width } from './Dimensions';

const window = Dimensions.get('window').height;

export const filterStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width * 0.9,
    overflow: 'visible',
  },
  snackbar: {
    height: height * 0.04,
    borderRadius: 10,
    backgroundColor: 'red',
    top: window > 800 ? 420 : window > 800 ? 350 : 280,
  },
  snackBarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonContainer: {
    justifyContent: 'space-between',
  },
});
