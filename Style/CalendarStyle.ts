import { StyleSheet } from 'react-native';
import { deviceHeight, deviceWidth } from './Dimensions';

export const calendar = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  container: {
    paddingVertical: 15,
    paddingLeft: 20,
    paddingRight: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
    alignSelf: 'flex-start',
    minHeight: deviceHeight * 0.4,
    maxHeight: deviceHeight * 0.7,
    bottom: deviceHeight < 800 ? deviceHeight * 0.23 : deviceHeight * 0.18,
  },
  header: {
    width: '98%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: -1,
  },
  navButton: {
    fontSize: 15,
    fontFamily: 'inter_Bold',
    padding: 7,
  },
  monthText: {
    fontSize: 20,
    fontFamily: 'inter_Bold',
  },
  weekDays: {
    width: '97%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  weekDay: {
    fontSize: deviceWidth < 400 ? 13 : 15,
    fontFamily: 'inter_Bold',
    width: '13%',
    textAlign: 'center',
    marginVertical: 5,
    // marginHorizontal: 1,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  day: {
    width: '14%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginVertical: 10,
  },
  dayText: {
    fontSize: 16,
    fontFamily: 'inter_Regular',
  },
  grayText: {
    color: 'gray',
  },
  grayBackground: {
    // backgroundColor: '#f0f0f0',
  },
  todayText: {
    color: '#222',
  },
  selectedDay: {
    backgroundColor: '#FF7043',
    borderRadius: 10,
    color: 'white',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop:
      deviceHeight < 800 ? deviceHeight * -0.03 : deviceHeight * -0.045,
  },
  footerButton: {
    fontSize: 16,
    color: '#007bff',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '75%',
  },
  input: {
    // borderBottomWidth: 1,
    backgroundColor: 'white',
    marginBottom: 10,
    fontSize: 16,
  },
  modalButton: {
    fontSize: 17,
    color: '#007bff',
    fontFamily: 'inter_Regular',
  },
  modalClose: {
    color: 'red',
    fontSize: 16,
    fontFamily: 'inter_Regular',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    // gap: '70%',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  yearPicker: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 100,
    maxHeight: 300,
  },
  yearItem: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  yearText: {
    fontSize: 18,
  },
  closeButton: {
    textAlign: 'center',
    color: 'red',
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'inter_Medium',
  },
  divider: {
    padding: 0.8,
    width: deviceWidth < 400 ? deviceWidth * 0.69 : deviceWidth * 0.7,
  },
});
