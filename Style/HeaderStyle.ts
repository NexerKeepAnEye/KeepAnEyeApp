import { StyleSheet } from 'react-native';
import { deviceHeight, deviceWidth } from './Dimensions';
export const headerStyle = StyleSheet.create({
  HeaderLogo: {
    flex: 1,
    width: deviceWidth * 0.6,
  },
  container: {
    height: deviceHeight * 0.1,
    // padding: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
