import { StyleSheet } from 'react-native';
import { height, width } from './Dimensions';

export const dateStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 5,
    marginBottom: 10,
    marginHorizontal: 5,
    // marginTop: 12,
  },
  dateContainer: {
    alignItems: 'center',
    opacity: 0.8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
    maxWidth: width * 0.3,
    minWidth: width * 0.2,
    paddingHorizontal: 10,
    height: height * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  pickerText: {
    fontSize: width * 0.045,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: width * 0.8,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
});
