import { StyleSheet } from 'react-native';

export const BottomTabStyle = StyleSheet.create({
  tabBar: {
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  iconContainer: {
    marginTop: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  tabBarIcon: {
    height: '100%',
  },
  tabBarText: {
    fontSize: 15,
    fontWeight: 'bold',
    padding: '10%',
  },
  selectedTab: {
    flex: 1,
    backgroundColor: '#f2e2ce',
    borderRadius: 15,
    width: '200%',
    height: '110%',
  },
});
