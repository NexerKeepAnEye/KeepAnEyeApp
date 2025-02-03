import { StyleSheet } from 'react-native';
import { deviceHeight, deviceWidth } from './Dimensions';

export const SignIn = StyleSheet.create({
  SafeAreaContainer: {
    flex: 1,
    backgroundColor: '#f4f5f7',
  },
  logo: {
    marginBottom: deviceHeight * -0.05,
    width: deviceWidth * 0.8,
    height: undefined,
    aspectRatio: 1,
    backgroundColor: '#f4f5f7',
  },
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f5f7',
  },
  container: {
    width: deviceWidth * 0.9,
    alignItems: 'center',
  },
  title: {
    fontSize: deviceWidth * 0.05,
    marginBottom: deviceHeight * 0.01,
  },
  input: {
    width: deviceWidth * 0.8,
    marginBottom: deviceHeight * 0.01,
  },
  button: {
    marginTop: deviceHeight * 0.01,
    width: deviceWidth * 0.7,
    height: deviceHeight * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#ff7043',
  },
  buttonText: {
    fontSize: deviceWidth * 0.045,
    color: '#fff',
    fontWeight: 'bold',
  },
  footerLogo: {
    top: deviceHeight * 0.3,
    alignSelf: 'center',
    width: deviceWidth * 0.4,
    height: undefined,
    aspectRatio: 1,
  },
  buttonDisabled: {
    marginTop: deviceHeight * 0.01,
    width: deviceWidth * 0.7,
    height: deviceHeight * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#ff7043',
    opacity: 0.8,
  },
});
