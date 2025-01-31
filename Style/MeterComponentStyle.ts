import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const MeterComponentStyle = StyleSheet.create({
  container: {
    width: '100%',
    // marginTop: height * 0.02,
    backgroundColor: '#fff',
  },
  listItem: {
    height: height * 0.08,
    borderBottomWidth: 1,
    borderBottomColor: '#d9d9d9',
    alignContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: width * 0.03,
  },
  iconContainer: {
    width: width * 0.1,
    height: '100%',
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: width * 0.03,
  },
  textStyleName: {
    fontSize: width * 0.045,
    color: '#222',
  },
  textStyleProductCode: {
    fontSize: width * 0.04,
    color: '#d3d3d3',
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'semibold',
    opacity: 0.7,
    marginTop: 8,
    paddingBottom: 4,
    width: '100%',
  },
  arrow: {
    position: 'absolute',
    right: width * 0.03,
    alignSelf: 'center',
  },
});
