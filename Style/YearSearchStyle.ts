import { StyleSheet } from 'react-native';
import { deviceHeight, deviceWidth, height, width } from './Dimensions';

export const yearSearchStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    minHeight: height * 0.065,
    marginRight: 6,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
    minWidth: deviceWidth * 0.15,
    height: deviceHeight * 0.055,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    opacity: 0.8,
    paddingHorizontal: 10,
  },
  pickerText: {
    fontSize: deviceHeight > 400 ? deviceWidth * 0.04 : deviceHeight * 0.021,
    flexShrink: 1,
    fontFamily: 'inter_Regular',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: width * 0.3,
    maxHeight: height * 0.5,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalItem: {
    padding: 10,
    fontSize: width * 0.045,
    textAlign: 'center',
  },
  closeButton: {
    padding: 1,
    textAlign: 'center',
    color: '#056ffd',
    fontSize: width * 0.04,
  },
  divider: {
    padding: 0.5,
  },
});
