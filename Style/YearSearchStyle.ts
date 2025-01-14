import { StyleSheet } from 'react-native';
import { height, width } from './Dimensions';

export const yearSearchStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: width * 0.45,
    padding: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    width: '100%',
    height: height * 0.04,
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
    marginTop: 10,
    textAlign: 'center',
    color: 'blue',
    fontSize: width * 0.04,
  },
});
