import { StyleSheet } from 'react-native';
import { deviceHeight, deviceWidth } from './Dimensions';

export const searchButtonStyle = StyleSheet.create({
  button: {
    backgroundColor: '#FF7043',
    borderRadius: 30,
    padding: 8,
    maxWidth: deviceWidth / 3,
    minWidth: deviceWidth / 4,
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginTop: deviceHeight * 0.006,
    height: deviceHeight * 0.05,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  disableButton: {
    backgroundColor: '#FF7043',
    borderRadius: 30,
    padding: 8,
    maxWidth: deviceWidth / 3,
    minWidth: deviceWidth / 4,
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginTop: 3,
    height: deviceHeight * 0.045,
    opacity: 0.6,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: deviceHeight * 0.018,
    textAlign: 'center',
    fontFamily: 'inter_Regular',
  },
});
