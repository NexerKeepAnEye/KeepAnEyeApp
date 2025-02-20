import { Platform, StyleSheet } from 'react-native';
import { deviceHeight, deviceWidth } from './Dimensions';
export const headerStyle = StyleSheet.create({
  HeaderLogo: {
    flex: 1,
    width: deviceWidth * 0.6,
  },
  container: {
    height: Platform.OS === 'ios' ? deviceHeight * 0.025 : deviceHeight * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
