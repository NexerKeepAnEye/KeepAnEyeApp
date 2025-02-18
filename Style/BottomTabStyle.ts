import { StyleSheet } from 'react-native';
import { deviceHeight } from './Dimensions';

export const BottomTabStyle = StyleSheet.create({
  tabBar: {
    height: deviceHeight * 0.085,
    backgroundColor: '#FFF',
  },
  iconContainer: {
    marginTop: deviceHeight * 0.02,
    justifyContent: 'center',
    // alignItems: 'center',
    height: deviceHeight * 1,
    marginBottom: deviceHeight * 0.01,
  },
  tabBarIcon: {
    height: deviceHeight * 0.04,
  },
  tabBarText: {
    fontSize: deviceHeight * 0.013,
    fontFamily: 'inter_Bold',
    padding: deviceHeight * 0.01,
    bottom: deviceHeight * 0.002,
  },
});
