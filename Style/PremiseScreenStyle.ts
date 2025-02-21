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
  goToTop: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1000,
    backgroundColor: '#FF7043',
    height: deviceHeight * 0.055,
    width: deviceHeight * 0.055,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
