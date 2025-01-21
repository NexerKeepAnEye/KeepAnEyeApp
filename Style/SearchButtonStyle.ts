import { StyleSheet } from 'react-native';
import { width } from './Dimensions';

export const searchButtonStyle = StyleSheet.create({
  button: {
    backgroundColor: '#FF7043',
    borderRadius: 30,
    padding: 10,
    maxWidth: width / 3,
    minWidth: width / 7,
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginTop: 3,
    height: 40,
  },
  text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
