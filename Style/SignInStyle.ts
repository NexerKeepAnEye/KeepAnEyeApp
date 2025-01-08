import { StyleSheet } from 'react-native';

export const SignIn = StyleSheet.create({
  SafeAreaContainer: {
    flex: 1,
    // height: '80%',
    backgroundColor: '#f4f5f7',
  },
  Scontainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f4f5f7',
  },
  logo: {
    marginBottom: '-10%',
    width: '80%',
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
    width: '80%',
    backgroundColor: '#f4f5f7',
  },
  title: {
    fontSize: 20,
    marginBottom: '5%',
  },
  input: {
    borderRadius: 10,
  },
  button: {
    marginTop: '5%',
    backgroundColor: '#ff7043',
    width: '70%',
    alignItems: 'center',
  },
  buttonDisabled: {
    marginTop: '5%',
    backgroundColor: '#ff7043',
    opacity: 0.8,
    width: '70%',
    alignItems: 'center',
  },
  footerLogo: {
    bottom: '-35%',
    alignSelf: 'center',
    width: '40%',
    height: undefined,
    aspectRatio: 1,
    backgroundColor: '#f4f5f7',
  },
});
