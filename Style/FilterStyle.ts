import { StyleSheet } from 'react-native';
import { deviceHeight, deviceWidth } from './Dimensions';

export const filterStyle = StyleSheet.create({
  container: {
    marginTop: deviceHeight * 0.01,
    margin: deviceWidth > 400 ? deviceWidth * 0.001 : 0.1,
    flexDirection: 'row',
    marginLeft: deviceWidth > 400 ? 0 : deviceWidth * 0.01,
    flexWrap: 'wrap',
    marginBottom: deviceHeight * 0.03,
  },
  snackbar: {
    height: deviceHeight * 0.04,
    width: deviceWidth * 0.88,
    borderRadius: 10,
    backgroundColor: 'red',
    alignSelf: 'center',
    bottom: deviceHeight * 0.12,
  },

  snackBarText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'inter_Bold',
  },
  buttonContainer: {
    flex: 1,
    elevation: 5,
  },
  metersContainer: {
    width: deviceWidth * 0.95,
    marginBottom: deviceHeight * 0.01,
  },
  accordionView: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 8,
    padding: 1,
    backgroundColor: '#fff',
    width: deviceWidth * 0.9,
  },
  accordion: {
    borderRadius: 8,
    width: deviceWidth * 0.89,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    padding: 29,
  },
  accordionText: {
    fontFamily: 'inter_Regular',
    fontSize: 17,
    color: '#333',
    fontWeight: 'bold',
  },
});
