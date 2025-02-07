import { StyleSheet } from 'react-native';
import { deviceHeight, deviceWidth } from './Dimensions';

export const dateStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 5,
    marginBottom: deviceHeight * 0.01,
    marginHorizontal: 5,
  },
  dateContainer: {
    alignItems: 'center',
    opacity: 0.8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
    maxWidth: deviceWidth * 0.3,
    minWidth: deviceWidth * 0.2,
    paddingHorizontal: 10,
    height: deviceHeight * 0.053,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  pickerText: {
    fontSize: deviceWidth * 0.045,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: deviceWidth * 0.8,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
});
