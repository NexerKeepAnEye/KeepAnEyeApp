import { StyleSheet } from 'react-native';
import { deviceHeight, deviceWidth } from './Dimensions';

export const alertDialogStyles = StyleSheet.create({
  dialog: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    maxHeight: deviceHeight < 800 ? deviceHeight * 0.23 : deviceHeight * 0.2,
    maxWidth: deviceWidth * 0.9,
  },
  title: {
    fontSize: deviceHeight * 0.03,
    fontFamily: 'inter_Bold',
  },
  message: {
    fontSize: deviceHeight > 800 ? deviceHeight * 0.018 : deviceHeight * 0.02,
    paddingVertical: 10,
    fontFamily: 'inter_Regular',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: deviceWidth * 0.02,
  },
  button: {
    flexGrow: 1,
    justifyContent: 'space-between',
    // paddingHorizontal: deviceWidth * 0.02,
    marginLeft: deviceWidth * 0.09,
    flexDirection: 'row',
  },
  confirmText: {
    color: '#007bff',
    fontFamily: 'inter_Bold',
    fontSize: deviceHeight > 800 ? deviceHeight * 0.02 : deviceHeight * 0.025,
    paddingHorizontal: 10,
  },
  cancelText: {
    color: '#ed5e68',
    fontFamily: 'inter_Bold',
    fontSize: deviceHeight > 800 ? deviceHeight * 0.02 : deviceHeight * 0.025,
    paddingHorizontal: 10,
  },
});
