import { StyleSheet } from 'react-native';
import { height, width } from './Dimensions';

export const yearSearchStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
    width: width * 0.15,
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
    marginTop: 10,
    textAlign: 'center',
    color: 'blue',
    fontSize: width * 0.04,
  },
});
