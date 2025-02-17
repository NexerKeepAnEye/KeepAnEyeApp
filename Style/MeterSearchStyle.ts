import { StyleSheet } from 'react-native';
import { deviceHeight, deviceWidth } from './Dimensions';

export const meterSearch = StyleSheet.create({
  container: {
    maxWidth: deviceWidth * 0.45,
    minHeight: deviceHeight * 0.06,
    // marginTop: 12,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
    // width: width * 0.4,
    height: deviceHeight * 0.055,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    opacity: 0.8,
    marginRight: 6,
  },
  iconResetContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dddddd',
    width: deviceWidth * 0,
    height: deviceHeight * 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  iconMeterResetContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#dddddd',
    width: deviceWidth * 0,
    height: deviceHeight * 0,
    bottom: deviceHeight * 0.014,
    // left: deviceWidth * 0.18,
  },
  pickerText: {
    fontSize: deviceWidth * 0.045,
  },
  touchArea: {
    maxWidth: deviceWidth * 0.4,
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
