import { StyleSheet } from 'react-native';
import { deviceHeight, deviceWidth } from './Dimensions';

export const BottomTabStyle = StyleSheet.create({
  tabBar: {
    height: deviceHeight * 0.09,
    backgroundColor: '#FFF',
  },
  iconContainer: {
    marginTop: deviceHeight * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
    height: deviceHeight * 1,
  },
  tabBarIcon: {
    height: deviceHeight * 0.04,
  },
  tabBarText: {
    fontSize: deviceHeight * 0.015,
    fontFamily: 'inter_Bold',
    padding: deviceHeight * 0.015,
  },
  selectedTab: {
    backgroundColor: '#f2e2ce',
    borderRadius: 15,
    width: deviceWidth * 0.15,
    height: deviceHeight * 0.045,
  },
});
