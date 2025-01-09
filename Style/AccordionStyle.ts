import { StyleSheet } from 'react-native';

export const AccordionStyle = StyleSheet.create({
  container: {
    width: '90%',
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
    padding: '5%',
    justifyContent: 'center',
    position: 'relative',
    fontWeight: 'bold',
  },
  header: {
    textAlign: 'center',
    // marginLeft: '28%',
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  dDL: {
    position: 'absolute',
    right: -1,
  },
  listButton: {
    width: '250%',
    height: '254%',
    bottom: '78%',
    right: '150%',
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export const DataTableStyle = StyleSheet.create({
  container: {
    width: '90%',
    marginTop: 20,
  },
  header: {
    backgroundColor: '#d9d9d9',
    justifyContent: 'space-evenly',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
  },
});
