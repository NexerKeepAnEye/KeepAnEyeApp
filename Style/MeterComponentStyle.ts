import { StyleSheet } from 'react-native';
import { deviceHeight, deviceWidth } from './Dimensions';

export const MeterComponentStyle = StyleSheet.create({
  container: {
    width: deviceWidth * 1,
    backgroundColor: '#f4f5f7',
  },
  listItem: {
    height: deviceHeight * 0.083,
    borderBottomWidth: 1,
    borderBottomColor: '#d9d9d9',
    alignContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: deviceWidth * 0.03,
    backgroundColor: '#fff',
  },
  iconContainer: {
    width: deviceWidth * 0.1,
    height: deviceHeight * 1,
    alignItems: 'center',
    marginTop: deviceHeight * 0.005,
  },
  meterIconList: {
    width: deviceWidth * 0.1,
    height: deviceHeight * 1,
    alignItems: 'center',
    marginTop: deviceHeight * 0.02,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: deviceWidth * 0.03,
  },
  textStyleName: {
    fontSize: deviceWidth * 0.045,
    color: '#222',
    fontFamily: 'inter_Regular',
    paddingRight: deviceWidth * 0.2,
    flexWrap: 'wrap',
  },
  textStyleProductCode: {
    fontSize: deviceWidth * 0.04,
    color: '#d3d3d3',
    fontFamily: 'inter_Regular',
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: deviceHeight * 0.02,
    fontFamily: 'inter_Bold',
    opacity: 0.7,
    marginTop: deviceHeight * 0.01,
    paddingBottom: 4,
    width: deviceWidth * 1,
  },
  arrow: {
    position: 'absolute',
    right: deviceWidth * 0.03,
    alignSelf: 'center',
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
