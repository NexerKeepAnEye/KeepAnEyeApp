import { StyleSheet } from 'react-native';
import { width } from './Dimensions';

export const searchButtonStyle = StyleSheet.create({
  button: {
    backgroundColor: '#FF7043',
    borderRadius: 20,
    padding: 10,
    maxWidth: width / 3,
    minWidth: width / 6,
    alignSelf: 'flex-end',
    marginTop: 3,
  },
  text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
