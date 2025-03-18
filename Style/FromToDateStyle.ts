import { StyleSheet } from 'react-native';
import { deviceHeight, deviceWidth } from './Dimensions';

export const dateStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: deviceHeight * 0.01,
  },
  dateContainer: {
    alignItems: 'center',
    opacity: 0.8,
    position: 'relative',
    marginRight: deviceWidth > 400 ? 22 : 11,
  },
  pickerContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
    width: deviceWidth * 0.42,
    paddingHorizontal: 10,
    height: deviceHeight * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    flex: 1,

  },
  pickerText: {
    fontSize: deviceHeight > 400 ? deviceWidth * 0.04 : deviceHeight * 0.021,
    fontFamily: 'inter_Regular',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: deviceWidth * 0.8,
    height: deviceHeight * 0.1,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
});
