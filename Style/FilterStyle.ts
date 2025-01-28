import { Dimensions, StyleSheet } from 'react-native';
import { height, width } from './Dimensions';

const window = Dimensions.get('window').height;

const getTopValue = () => {
  if (window > 900) {
    return 480;
  } else if (window > 800) {
    return 423;
  } else if (window > 600) {
    return 292;
  } else {
    return 300;
  }
};

const getTopValue2 = () => {
  if (window > 900) {
    return 475;
  } else if (window > 800) {
    return 415;
  } else if (window > 600) {
    return 275;
  } else {
    return 330;
  }
};

export const filterStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    overflow: 'visible',
  },
  snackbar: {
    height: height * 0.04,
    width: width * 0.88,
    borderRadius: 10,
    backgroundColor: 'red',
    top: getTopValue(),
    marginBottom: 70,
  },
  snackbar2: {
    height: height * 0.04,
    width: width * 0.88,
    borderRadius: 10,
    backgroundColor: 'red',
    top: getTopValue2(),
  },
  snackBarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonContainer: {
    justifyContent: 'space-between',
  },
  scrolViewParent: {
    flex: 1,
  },
});
