import { StyleSheet } from 'react-native';
import { height, width } from './Dimensions';

export const yearSearchStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 5,
    minHeight: height * 0.065,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
    minWidth: width * 0.15,
    height: height * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    opacity: 0.8,
    paddingHorizontal: 10,
    marginTop: 12,
  },
  pickerText: {
    fontSize: width * 0.045,
    flexShrink: 1,
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
