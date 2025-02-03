import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const SignIn = StyleSheet.create({
  SafeAreaContainer: {
    flex: 1,
    backgroundColor: '#f4f5f7',
  },
  logo: {
    marginBottom: height * -0.05,
    width: width * 0.8,
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
    width: width * 0.9,
    alignItems: 'center',
  },
  title: {
    fontSize: width * 0.05,
    marginBottom: height * 0.01,
  },
  input: {
    width: width * 0.8,
    marginBottom: height * 0.01,
  },
  button: {
    marginTop: height * 0.01,
    width: width * 0.7,
    height: height * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 30,
    backgroundColor: '#ff7043',
  },
  buttonText: {
    fontSize: width * 0.042,
    color: '#fff',
    fontWeight: 'bold',
  },
  footerLogo: {
    top: height * 0.3,
    alignSelf: 'center',
    width: width * 0.4,
    height: undefined,
    aspectRatio: 1,
  },
  buttonDisabled: {
    marginTop: height * 0.01,
    width: width * 0.7,
    height: height * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#ff7043',
    opacity: 0.8,
    fontSize: width * 0.042,
    color: '#fff',
    fontWeight: 'bold',
    flexDirection: 'row',
  },
});
