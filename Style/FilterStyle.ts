import { StyleSheet } from 'react-native';
import { width } from './Dimensions';

export const filterStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width * 0.9,
    overflow: 'visible',
  },
});
