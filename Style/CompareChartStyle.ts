import { StyleSheet } from 'react-native';
import { deviceHeight, deviceWidth } from './Dimensions';
export const CompareChartStyle = StyleSheet.create({
  chartContainer: {
    marginTop: deviceHeight * 0.02,
    marginBottom: deviceHeight * 0.02,
    alignItems: 'center',
    overflow: 'visible',
  },
  tooltip: {
    position: 'relative',
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginLeft: -deviceWidth * 0.015,
    marginTop: 10, 
    marginBottom: -40, //unavaibale to use deviceprops, since max value exceeds amount needed
  },
  tooltipText: {
    color: '#000',
    fontFamily: 'inter_Regular',
  },
});
