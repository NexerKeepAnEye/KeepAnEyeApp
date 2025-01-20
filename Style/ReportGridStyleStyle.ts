import { StyleSheet } from 'react-native';
import { width } from './Dimensions';

export const ReportGridStyle = StyleSheet.create({
  root: {
    width: width * 0.9,
  },
  container: {
    // alignItems: 'center',
  },
  header: {
    backgroundColor: '#d9d9d9',
    height: 4,
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  noDataText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  //   header: {
  //     fontSize: 18,
  //     fontWeight: 'bold',
  //     marginBottom: 10,
  //   },
});
