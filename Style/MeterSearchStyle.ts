import { StyleSheet } from 'react-native';
import { height, width } from './Dimensions';

export const meterSearch = StyleSheet.create({
  container: {
    maxWidth: width * 0.45,
    minHeight: height * 0.06,
    // marginTop: 12,
  },
  pickerContainer: {
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
    // width: width * 0.4,
    height: height * 0.05,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    opacity: 0.8,
    marginRight: 3,
  },
  iconResetContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dddddd',
    width: width * 0,
    height: height * 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  pickerText: {
    fontSize: width * 0.045,
  },
  touchArea: {
    maxWidth: width * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    paddingLeft: 0,
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
    padding: 9,
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
    color: '#056ffd',
    fontSize: width * 0.04,
  },
});
