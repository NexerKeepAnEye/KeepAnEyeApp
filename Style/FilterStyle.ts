import { StyleSheet } from 'react-native';
import { deviceHeight, deviceWidth } from './Dimensions';

export const filterStyle = StyleSheet.create({
  container: {
    marginTop: deviceHeight * 0.01,
    margin: deviceWidth > 400 ? deviceWidth * 0.001 : 0.1,
    flexDirection: 'row',
    // overflow: 'visible',
    marginLeft: deviceWidth > 400 ? 0 : deviceWidth * 0.01,
    flexWrap: 'wrap',
    marginBottom: deviceHeight * 0.03,
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
    // justifyContent: 'space-between',
    // marginRight: deviceWidth * 0.04,
    // borderWidth: 1,
    // borderColor: 'red',
    flex: 1,
    // marginTop: deviceHeight * 0.02,
  },
  metersContainer: {
    width: deviceWidth * 0.95,
    marginBottom: deviceHeight * 0.01,
  },
});
