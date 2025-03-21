import { StyleSheet } from 'react-native';
import { deviceHeight, deviceWidth } from './Dimensions';

export const AccordionStyle = StyleSheet.create({
  container: {
    marginTop: deviceHeight * 0.001,
    width: deviceWidth * 0.9,
    height: deviceHeight * 0.07,
    borderWidth: 1.5,
    borderColor: '#d9d9d9',
    borderRadius: 10,
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#fefefe',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: deviceWidth * 0.75,
    height: deviceHeight * 0.35,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#d9d9d9',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    width: deviceWidth * 0.9,
    justifyContent: 'center',
    height: deviceWidth > 400 ? 60 : 45,
  },
  header: {
    fontSize: deviceWidth * 0.045,
    fontFamily: 'inter_Bold',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginRight: 45
  },
  headerBlank: {
    fontSize: deviceWidth * 0.045,
    fontFamily: 'inter_Bold',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginRight: 10
  },
  listItem: {
    fontSize: deviceWidth > 400 ? 21 : 18,
    fontFamily: 'inter_Regular',
    padding: 10,
  },
  headerChanged: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'inter_Bold',
    flex: 3,
  },
  listPressed: {
    borderBottomWidth: 0.4,
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    display: 'flex',
  },
  closeButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: '#056ffd',
    fontSize:deviceWidth > 400 ? 18 : 16,
    marginTop: 17,
    fontFamily: 'inter_Regular',
  },
});
