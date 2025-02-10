import { StyleSheet } from 'react-native';
import { deviceHeight, deviceWidth } from './Dimensions';

export const StartScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  headerBox: {
    width: deviceWidth * 1,
    height: deviceHeight * 0.1,
    backgroundColor: '#f4f5f7',
    alignItems: 'center',
    flex: 1,
  },
  textHeader: {
    marginTop: deviceHeight * 0.03,
    fontSize: deviceHeight * 0.04,
    // fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'inter_SemiBoldItalic',
  },
  itemBox: {
    width: deviceWidth * 1,
    height: deviceHeight * 0.6,
    backgroundColor: 'white',
  },
  listItems: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#d9d9d9',
    flexDirection: 'row',
    alignItems: 'center',
    height: deviceHeight * 0.065,
    marginLeft: deviceWidth * 0.05,
    marginRight: deviceWidth * 0.05,
  },
  textItem: {
    fontSize: deviceHeight * 0.02,
    marginLeft: deviceWidth * 0.05,
    // color: 'black',
    flex: 1,
    fontFamily: 'inter_Regular',
  },
  listItemPositionStart: {
    justifyContent: 'flex-start',
  },
  listItemPositionEnd: {
    justifyContent: 'flex-end',
    marginRight: deviceWidth * 0.01,
  },
  footer: {
    width: deviceWidth * 0.35,
    height: deviceHeight * 0.09,
    resizeMode: 'contain',
  },
});
