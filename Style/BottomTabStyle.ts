import { StyleSheet } from 'react-native';
import { deviceHeight, deviceWidth } from './Dimensions';

export const BottomTabStyle = StyleSheet.create({
  tabBar: {
    height: deviceHeight * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  iconContainer: {
    marginTop: deviceHeight * 0.03,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  tabBarIcon: {
    height: deviceHeight * 0.04,
  },
  tabBarText: {
    fontSize: deviceHeight * 0.015,
    fontFamily: 'inter_Bold',
    padding: 25,
  },
  selectedTab: {
    backgroundColor: '#f2e2ce',
    borderRadius: 15,
    width: deviceWidth * 0.15,
    height: deviceHeight * 0.05,
  },
});
