import { Platform, StyleSheet } from 'react-native';
import { deviceHeight, deviceWidth } from './Dimensions';

export const alertDialogStyles = StyleSheet.create({
  dialog: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    maxHeight:
      Platform.OS === 'ios'
        ? deviceHeight * 0.3 // iOS specific height
        : deviceHeight < 800
          ? deviceHeight * 0.26
          : deviceHeight * 0.22,
    maxWidth: deviceWidth * 0.9,
  },
  title: {
    paddingTop: deviceHeight < 800 ? 5 : 5,
    paddingBottom: deviceHeight < 800 ? 5 : 0,
    fontSize: deviceHeight < 800 ? deviceHeight * 0.03 : deviceHeight * 0.028,
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
    marginLeft: deviceWidth * 0.09,
    flexDirection: 'row',
  },
  confirmText: {
    color: '#007bff',
    fontFamily: 'inter_Bold',
    fontSize: deviceHeight > 800 ? deviceHeight * 0.02 : deviceHeight * 0.023,
    paddingHorizontal: 10,
  },
  cancelText: {
    color: '#ed5e68',
    fontFamily: 'inter_Bold',
    fontSize: deviceHeight > 800 ? deviceHeight * 0.02 : deviceHeight * 0.02,
    paddingHorizontal: 10,
  },
  singleButton: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: deviceWidth * 0.02,
    marginLeft: deviceWidth < 400 ? deviceWidth * 0.04 : deviceWidth * 0.45,
  },
});
