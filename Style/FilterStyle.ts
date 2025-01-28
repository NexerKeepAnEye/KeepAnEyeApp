import { StyleSheet } from 'react-native';
import { deviceHeight, deviceWidth } from './Dimensions';

export const filterStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    overflow: 'visible',
  },
  snackbar: {
    height: deviceHeight * 0.04,
    width: deviceWidth * 0.88,
    borderRadius: 10,
    backgroundColor: 'red',
    alignSelf: 'center',
    bottom: deviceHeight * 0.12,
  },

  snackBarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonContainer: {
    justifyContent: 'space-between',
  },
  scrolViewParent: {
    flex: 1,
  },
});
