import { StyleSheet, TextStyle } from 'react-native';
import { deviceHeight, deviceWidth } from './Dimensions';

export const ReportGridStyle = StyleSheet.create({
  root: {
    width: deviceWidth * 0.9,
  },
  container: {
    marginBottom: deviceHeight * 0.12,
  },
  header: {
    // backgroundColor: '#d9d9d9',
    // height: deviceHeight * 0.001,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontFamily: 'inter_Bold' as TextStyle['fontFamily'],
    // textAlign: 'center',
    // flex: 1,
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: deviceHeight * 0.02,
  },
  noDataText: {
    fontSize: deviceHeight * 0.02,
    color: 'gray',
    textAlign: 'center',
    marginTop: deviceHeight * 0.02,
  },
  columntext: {
    fontFamily: 'inter_Bold',
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  flex11: {
    flex: 1.1,
  },
  flex09: {
    flex: 0.9,
  },
});
