import { StyleSheet } from 'react-native';
import { deviceHeight, deviceWidth } from './Dimensions';

export const ResolutionStyle = StyleSheet.create({
  resolutionContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#f9f9f9',
    padding: 5,
    width: deviceWidth * 0.42,
    height: deviceHeight * 0.05,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
    flex: 1
  },
  buttonText: {
    fontSize: deviceHeight > 400 ? deviceWidth * 0.04 : deviceHeight * 0.021,
    color: '#222',
    textAlign: 'center',
    fontFamily: 'inter_Regular',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: deviceWidth * 0.35,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: deviceWidth * 0.25,
    alignItems: 'center',
  },
  modalItemText: {
    fontSize: deviceHeight * 0.021,
    fontFamily: 'inter_Regular',
  },
  modalCloseButton: {
    marginTop: deviceHeight * 0.015,
  },
  modalCloseButtonText: {
    color: '#056ffd',
    fontSize: deviceWidth * 0.04,
  },
});
