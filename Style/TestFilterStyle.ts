import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const TestFilterStyle = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    justifyContent: 'space-around',
    width: width * 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterBtnContainer: {
    flexDirection: 'row',
    marginRight: '10%',
  },
  button: {
    marginHorizontal: 5,
    backgroundColor: '#fff',
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    marginRight: '2%',
    borderRadius: 10,
  },
  searchButton: {
    backgroundColor: '#ff7043',
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    width: 70,
    borderRadius: 20,
    marginLeft: '20%',
    elevation: 3,
  },
  searchButtonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#222',
    textAlign: 'center',
  },
  dateText: {
    marginVertical: 10,
    fontSize: 16,
    color: '#333',
  },
});
