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
    backgroundColor: '#fefefe',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: deviceWidth * 0.8,
    height: deviceHeight * 0.32, 
    backgroundColor: 'white',
    borderRadius: 8,
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
    height: 70,
  },
  header: {
    fontSize: 18,
    fontFamily: 'inter_Bold',
  },
  listItem: {
    fontSize: 22, 
    fontFamily: 'inter_Regular',
    padding: 10,
  },
  headerChanged: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'inter_Bold',
  },
  listPressed:{
    borderBottomWidth: 0.4,
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    display: 'flex',
  },
  closeButton: { 
    alignItems: 'center',
    justifyContent: 'center' 
  },
  closeButtonText: {
    color: 'blue',
    fontSize: 18,
    marginTop: 17,
  }
});
