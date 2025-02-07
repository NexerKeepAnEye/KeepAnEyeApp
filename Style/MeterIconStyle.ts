import { StyleSheet } from 'react-native';
import { deviceHeight } from './Dimensions';

export const MeterIconStyle = StyleSheet.create({
  icon: {
    fontSize: deviceHeight * 0.035,
    top: deviceHeight * 0.001,
    justifyContent: 'center',
  },
});
