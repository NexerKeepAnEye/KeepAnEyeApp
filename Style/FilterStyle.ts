import { Dimensions, StyleSheet } from 'react-native';
import { height, width } from './Dimensions';

const window = Dimensions.get('window').height;

const getTopValue = () => {
  if (window > 900) {
    return 480;
  } else if (window > 800) {
    return 420;
  } else if (window > 600) {
    return 285;
  } else {
    return 300; // Default value if none of the conditions are met
  }
};

export const filterStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width * 0.9,
    overflow: 'visible',
  },
  snackbar: {
    height: height * 0.04,
    borderRadius: 10,
    backgroundColor: 'red',
    top: getTopValue(),
  },
  snackBarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonContainer: {
    justifyContent: 'space-between',
  },
});
