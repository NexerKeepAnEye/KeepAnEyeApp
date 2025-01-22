import { StyleSheet } from 'react-native';
import { height, width } from './Dimensions';

export const AccordionStyle = StyleSheet.create({
  container: {
    marginTop: 3,
    width: width * 0.9, // 90% of screen width
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 10,
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: width * 0.05, // 5% of screen width
    justifyContent: 'center',
    position: 'relative',
    fontWeight: 'bold',
  },
  header: {
    textAlign: 'center',
    flex: 1,
    fontSize: width * 0.045, // 4.5% of screen width
    fontWeight: 'bold',
  },
  dDL: {
    position: 'absolute',
    right: -1,
  },
  listButton: {
    width: width * 0.15, // 15% of screen width
    height: height * 0.082, // 8.4% of screen height
    backgroundColor: '#d9d9d9',
    borderTopRightRadius: 10,
  },
  listExpanded: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#d9d9d9',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  listItem: {
    borderBottomWidth: 1,
    borderColor: '#d9d9d9',
    fontWeight: 'bold',
    justifyContent: 'center', // Center the content horizontally
  },
  listText: {
    // fontWeight: 'bold',
    textAlign: 'center', // Center the text horizontally
  },
  headerChanged: {
    textAlign: 'center',
    fontSize: width * 0.05, // 5% of screen width
    fontWeight: 'bold',
    // marginBottom: 10,
  },
});
