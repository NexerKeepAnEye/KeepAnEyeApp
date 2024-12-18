import { StyleSheet } from 'react-native';

export const BarChartStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  chartContainer: {
    width: '100%',
    alignItems: 'center',
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
  },
  tooltipText: {
    color: '#000',
  },
});
