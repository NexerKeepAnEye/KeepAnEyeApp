import { StyleSheet } from 'react-native';
import { deviceHeight, deviceWidth } from './Dimensions';


export const PremiseScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    height: deviceHeight * 1,
    width: deviceWidth * 1,
    alignItems: 'center',
    backgroundColor: '#f4f5f7',
  },
});
