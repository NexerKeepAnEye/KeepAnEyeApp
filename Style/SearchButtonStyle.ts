import { StyleSheet } from 'react-native';
import { width } from './Dimensions';

export const searchButtonStyle = StyleSheet.create({
  button: {
    backgroundColor: '#FF7043',
    borderRadius: 20,
    padding: 10,
    width: width / 3,
    alignSelf: 'flex-end',
  },
  text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
