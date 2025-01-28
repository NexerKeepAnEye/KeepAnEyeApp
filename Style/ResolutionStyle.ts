import { StyleSheet } from 'react-native';
import { height, width } from './Dimensions';

export const ResolutionStyle = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  resolutionContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fff',
    padding: 5,
    width: width * 0.28,
    height: height * 0.05,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  buttonText: {
    fontSize: width * 0.045,
    color: '#222',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: width * 0.35,
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
    color: '#056ffd',
    fontSize: width * 0.04,
  },
});
