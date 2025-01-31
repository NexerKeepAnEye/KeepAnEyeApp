import { StyleSheet } from 'react-native';
export const CompareChartStyle = StyleSheet.create({
  chartContainer: {
    marginTop: 10,
    marginBottom: 10,
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
    marginLeft: -7,
    marginBottom: -40,
    zIndex: 1,
    top: 50,
  },
  tooltipText: {
    color: '#000',
  },
});
