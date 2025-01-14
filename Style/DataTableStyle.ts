import { StyleSheet } from 'react-native';
import { width } from './Dimensions';
s;

export const DataTableStyle = StyleSheet.create({
  container: {
    width: width * 0.9, // 90% of screen width
    // marginTop: 10,
    flex: 1,
    padding: 10,
  },
  header: {
    backgroundColor: '#d9d9d9',
    justifyContent: 'space-evenly',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  //   header: {
  //     fontSize: 18,
  //     fontWeight: 'bold',
  //     marginBottom: 10,
  //   },
});
