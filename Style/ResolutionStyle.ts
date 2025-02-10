import { StyleSheet } from 'react-native';
import { deviceHeight, deviceWidth } from './Dimensions';

export const ResolutionStyle = StyleSheet.create({
  container: {
    // marginTop: 12,
  },
  resolutionContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fff',
    padding: 5,
    width: deviceWidth * 0.28,
    height: deviceHeight * 0.055,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  buttonText: {
    fontSize: deviceWidth * 0.045,
    color: '#222',
    textAlign: 'center',
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
  modalTitle: {
    fontSize: deviceHeight * 0.02,
    fontWeight: 'bold',
    marginBottom: deviceHeight * 0.02,
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: deviceWidth * 0.25,
    alignItems: 'center',
  },
  modalItemText: {
    fontSize: deviceHeight * 0.017,
  },
  modalCloseButton: {
    marginTop: deviceHeight * 0.01,
  },
  modalCloseButtonText: {
    color: '#056ffd',
    fontSize: deviceWidth * 0.04,
  },
});
