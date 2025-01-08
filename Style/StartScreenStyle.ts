import { StyleSheet } from 'react-native';

export const StartScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  headerBox: {
    // marginTop: '10%',
    width: '100%',
    height: '20%',
    backgroundColor: '#f4f5f7',
    // justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textHeader: {
    marginTop: '20%',
    fontSize: 30,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemBox: {
    width: '100%',
    height: '50%',
    backgroundColor: 'white',
    marginBottom: '15%',
  },
  listItems: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#d9d9d9',
    // alignContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    height: 50,
    marginLeft: '5%',
    marginRight: '5%',
  },
  textItem: {
    fontSize: 17,
    marginLeft: '5%',
    color: 'black',
    flex: 1,
  },
  listItemPositionStart: {
    justifyContent: 'flex-start',
  },
  listItemPositionEnd: {
    justifyContent: 'flex-end',
    marginRight: '1%',
  },
});
