import { StyleSheet } from 'react-native';
import { height, width } from './Dimensions';

export const BottomTabStyle = StyleSheet.create({
  tabBar: {
    height: height * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  iconContainer: {
    marginTop: height * 0.03,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  tabBarIcon: {
    height: height * 0.04,
  },
  tabBarText: {
    fontSize: width * 0.03,
    fontWeight: 'bold',
    padding: width * 0.055,
  },
  selectedTab: {
    backgroundColor: '#f2e2ce',
    borderRadius: 15,
    width: width * 0.15,
    height: height * 0.05,
  },
});
