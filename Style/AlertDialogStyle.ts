import { StyleSheet } from 'react-native';

export const alertDialogStyles = StyleSheet.create({
  dialog: {
    flex: 1,
    // padding: 10,
    // borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    maxHeight: '25%',
  },
  title: {
    fontSize: 20,
    fontFamily: 'inter_Bold',
  },
  message: {
    fontSize: 16,
    marginVertical: 10,
    fontFamily: 'inter_Regular',
  },
  button: {
    gap: 100,
  },
  confirmText: {
    color: 'blue',
    fontFamily: 'inter_Bold',
    fontSize: 18,
    paddingHorizontal: 10,
  },
  cancelText: {
    color: 'red',
    fontFamily: 'inter_Bold',
    fontSize: 18,
    paddingHorizontal: 10,
  },
});
