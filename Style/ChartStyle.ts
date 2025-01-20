import { StyleSheet } from 'react-native';
import { height } from './Dimensions';

export const BarChartStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  chartContainer: {
    height: height * 1.5,
    alignItems: 'center',
    overflow: 'visible',
    // marginTop: 20,
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginLeft: -7,
    marginTop: 25,
    zIndex: 1,
  },
  tooltipText: {
    color: '#000',
  },
});
