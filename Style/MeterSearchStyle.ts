import { StyleSheet } from 'react-native';
import { deviceHeight, deviceWidth } from './Dimensions';

export const meterSearch = StyleSheet.create({
  container: {
    width: deviceWidth > 400 ? deviceWidth * 0.9 : deviceWidth * 0.88,
    marginRight: 6,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 10,
    height: deviceHeight * 0.05,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
    opacity: 0.8,
    marginRight: 5,
    flex: 2,
    // marginBottom: 5,
  },
  pickerText: {
    fontSize: deviceHeight > 400 ? deviceWidth * 0.04 : deviceHeight * 0.021,
    fontFamily: 'inter_Regular',
    textAlign: 'center',
  },
  touchArea: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: deviceWidth * 0.8,
    maxHeight: deviceHeight * 0.55,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  sectionList: {
    width: deviceWidth * 0.7,
  },
  sectionHeader: {
    backgroundColor: '#f4f4f4',
    padding: 9,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sectionHeaderText: {
    fontSize: deviceWidth * 0.045,
    marginLeft: 8,
    fontFamily: 'inter_Bold',
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
    marginLeft: deviceWidth * 0.025,
    fontFamily: 'inter_Regular',
  },
  meterText: {
    fontSize: deviceWidth * 0.04,
    fontFamily: 'inter_Regular',
  },
  meterSubText: {
    fontSize: deviceWidth * 0.035,
    fontFamily: 'inter_Regular',
    color: 'gray',
  },
  closeButton: {
    marginTop: deviceHeight * 0.01,
    textAlign: 'center',
    color: '#056ffd',
    fontSize: deviceHeight * 0.018,
  },
});
