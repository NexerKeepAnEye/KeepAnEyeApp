import { StyleSheet } from 'react-native';
import { deviceHeight, deviceWidth } from './Dimensions';

export const filterStyle = StyleSheet.create({
  container: {
    marginTop: deviceHeight * 0.007,
    // marginLeft: deviceWidth * 0.04,
    // marginRight: deviceWidth * 0.04,
    gap: deviceHeight * 0.01,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    overflow: 'visible',
    // width: deviceWidth * 0.92,
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
    color: 'white',
    fontFamily: 'inter_Bold',
  },
  buttonContainer: {
    justifyContent: 'space-between',
  },
  scrolViewParent: {
    flex: 1,
  },
});
