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
    minWidth: width * 0.15,
    height: height * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    opacity: 0.8,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  pickerText: {
    fontSize: width * 0.045,
    flexShrink: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalItem: {
    padding: 10,
    fontSize: width * 0.045,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#dddddd',
    marginVertical: 10,
  },
  closeButton: {
    fontSize: width * 0.045,
    color: 'blue',
    marginTop: 10,
  },
});
