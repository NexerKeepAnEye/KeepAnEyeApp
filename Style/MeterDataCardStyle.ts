import { StyleSheet } from 'react-native';
import { deviceHeight, deviceWidth } from './Dimensions';

export const CardStyle = StyleSheet.create({
  card: {
    marginBottom: deviceHeight * 0.01,
    marginTop: deviceHeight * 0.02,
    padding: 10,
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: deviceWidth * 0, height: deviceHeight * 0.001 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    backgroundColor: '#ffffff',
    minWidth: deviceWidth * 0.9,
    minHeight: deviceHeight * 0.08,
    maxHeight: deviceHeight * 0.1,
    // overflow: 'hidden',
  },
  expandedCard: {
    maxHeight: 'auto',
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
    minHeight: deviceHeight * 0.06,
    maxHeight: deviceHeight * 0.1,
    flex: 1,
    flexWrap: 'wrap',
  },
  title: {
    color: '#000000',
    fontSize: deviceHeight * 0.02,
    fontFamily: 'inter_SemiBold',
  },
  noTitle: {
    color: 'red',
    fontSize: deviceHeight * 0.02,
    fontFamily: 'inter_SemiBold',
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
