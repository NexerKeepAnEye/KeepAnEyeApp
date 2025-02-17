import { StyleSheet } from 'react-native';
import { deviceHeight, deviceWidth } from './Dimensions';

export const AccordionStyle = StyleSheet.create({
  container: {
    marginTop: deviceHeight * 0.01,
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
    position: 'relative',
    fontWeight: 'bold',
  },
  header: {
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 1,
    fontSize: deviceWidth * 0.045,
    height: deviceHeight * 0.08,
    fontFamily: 'inter_Bold',
  },
  dDL: {
    position: 'absolute',
    right: -1,
  },
  listButton: {
    width: deviceWidth * 0.15,
    height: deviceHeight * 0.08,
    backgroundColor: '#d9d9d9',
    borderTopRightRadius: 10,
  },
  listExpanded: {
    width: deviceWidth * 0.9,
    borderTopWidth: 1,
    borderColor: '#d9d9d9',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  listItem: {
    borderBottomWidth: 1,
    borderColor: '#d9d9d9',
    fontWeight: 'bold',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  listText: {
    textAlign: 'center',
    fontFamily: 'inter_Regular',
  },
  headerChanged: {
    textAlign: 'center',
    fontSize: deviceWidth * 0.05,
    fontFamily: 'inter_Bold',
  },
});
