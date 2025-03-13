import { StyleSheet } from 'react-native';
import { deviceHeight } from './Dimensions';

export const BottomTabStyle = StyleSheet.create({
  tabBar: {
    height: deviceHeight < 900 ? deviceHeight * 0.085 : deviceHeight * 0.07,
    backgroundColor: '#FFF',
  },
  iconContainer: {
    marginTop: deviceHeight * 0.02,
    justifyContent: 'center',

    height: deviceHeight < 800 ? deviceHeight * 1 : deviceHeight * 0.05,
    marginBottom:
      deviceHeight < 800 ? deviceHeight * 0.01 : deviceHeight * 0.005,
  },
  tabBarText: {
    fontSize: deviceHeight < 800 ? deviceHeight * 0.015 : deviceHeight * 0.013,
    fontFamily: 'inter_Bold',
    padding: deviceHeight < 800 ? deviceHeight * 0.01 : deviceHeight * 0.009,
    bottom: deviceHeight < 800 ? deviceHeight * 0.002 : deviceHeight * 0.001,
  },
});
