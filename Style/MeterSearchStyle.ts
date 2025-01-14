import { StyleSheet } from 'react-native';
import { height, width } from './Dimensions';

export const meterSearch = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: width * 0.45,
    padding: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    width: '100%',
    height: height * 0.04,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    opacity: 0.8,
  },
  pickerText: {
    fontSize: width * 0.045,
    flex: 1,
  },
  iconContainer: {
    paddingLeft: 10,
  },
  icon: {
    marginLeft: 0,
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
  sectionList: {
    width: '100%',
  },
  sectionHeader: {
    backgroundColor: '#f4f4f4',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sectionHeaderText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  meterTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  meterText: {
    fontSize: width * 0.04,
  },
  meterSubText: {
    fontSize: width * 0.035,
    color: 'gray',
  },
  closeButton: {
    marginTop: 10,
    textAlign: 'center',
    color: 'blue',
    fontSize: width * 0.04,
  },
});
