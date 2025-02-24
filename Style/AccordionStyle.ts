import { StyleSheet } from 'react-native';
import { deviceHeight, deviceWidth } from './Dimensions';

export const AccordionStyle = StyleSheet.create({
  container: {
    marginTop: deviceHeight * 0.001,
    width: deviceWidth * 0.9,
    minHeight: deviceHeight * 0.08,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 10,
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    width: deviceWidth * 0.9,
    justifyContent: 'center',
    height: 70,
  },
  header: {
    marginLeft: deviceWidth * 0.1,
    flex: 1,
    fontSize: 18,
    fontFamily: 'inter_Bold',
  },
  dDL: {
    position: 'absolute',
    right: -1,
  },
  listButton: { //BORT
    width: deviceWidth * 0.15,
    height: deviceHeight * 0.08,
    // backgroundColor: '#d9d9d9',
    // borderTopRightRadius: 10,
  },
  listExpanded: {
    width: deviceWidth * 0.9,
    borderTopWidth: 1,
    borderColor: '#d9d9d9',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  listItem: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: deviceWidth * 0.02,
  },
  listText: {
    fontFamily: 'inter_Regular',
    fontSize: deviceWidth * 0.045,
    marginLeft: deviceWidth * 0.07,
  },
  headerChanged: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'inter_Bold',
  },
});
