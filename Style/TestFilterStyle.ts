import { StyleSheet } from 'react-native';

export const TestFilterStyle = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    justifyContent: 'space-around',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterBtnContainer: {
    flexDirection: 'row',
    // marginRight: '3%',
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
    // marginLeft: '20%',
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
  resetButton: {
    borderWidth: 0.5,
    borderColor: '#dfdfdf',
    backgroundColor: '#f2f2f2',
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -20,
    marginTop: -10,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '40%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
    alignItems: 'center',
  },
  modalItemText: {
    fontSize: 16,
  },
  modalCloseButton: {
    marginTop: 10,
  },
  modalCloseButtonText: {
    color: '#222',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
