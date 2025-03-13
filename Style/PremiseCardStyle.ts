import { StyleSheet } from 'react-native';
import { deviceHeight, deviceWidth } from './Dimensions';

export const premiseCardStyle = StyleSheet.create({
  card: {
    marginTop: deviceHeight * 0.02,
    padding: 10,
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: deviceWidth * 0, height: deviceHeight * 0.01 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    backgroundColor: '#ffffff',
    width: deviceWidth * 0.9,
    minHeight: deviceHeight * 0.08,
    maxHeight: deviceHeight * 0.1,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: deviceWidth * 0.8,
    flex: 0,
  },
  title: {
    color: '#000000',
    fontSize: deviceHeight * 0.02,
    fontFamily: 'inter_SemiBold',
  },
  noTitle: {
    color: 'red',
    fontSize: deviceHeight * 0.02,
    fontWeight: 'bold',
    marginLeft: deviceWidth * 0.05,
    marginTop: deviceHeight * 0.02,
  },
  subtitle: {
    fontSize: deviceHeight * 0.018,
    color: '#666',
    fontFamily: 'inter_Regular',
  },
  cardButton: {
    borderRadius: 10,
  },
});
