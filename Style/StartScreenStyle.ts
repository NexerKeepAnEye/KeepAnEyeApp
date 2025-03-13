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
    height: deviceHeight * 0.09,
    backgroundColor: '#f4f5f7',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: deviceWidth * 0.15,
    paddingRight: deviceWidth * 0.1,
  },
  textHeader: {
    fontSize: deviceHeight * 0.0285,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'inter_Bold',
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
  searchIcon: {
    borderWidth: 1,
    backgroundColor: '#FF7043',
    borderColor: '#FF7043',
    borderRadius: 30,
    padding: 7,
    left: 30,
  },
  searchBar: {
    height: deviceHeight > 800 ? deviceHeight * 0.045 : deviceHeight * 0.06,
    width: deviceWidth * 0.65,
    fontSize: deviceHeight * 0.017,
    borderColor: '#d9d9d9',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 8,
    fontFamily: 'inter_Regular',
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: deviceHeight * 0.1,
    fontSize: deviceHeight * 0.025,
    color: '#ababab',
  },
});
