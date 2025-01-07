import { StyleSheet } from 'react-native';

export const StartScreenStyle = StyleSheet.create({
    container : {
        marginTop: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'visible',
    },
    headerBox: {
        marginTop: 50,
        width: '100%',
        height: 100,
        backgroundColor: '#f4f5f7',
        // justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    textHeader: {
        marginTop: 30,
        fontSize: 30,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
    },
   itemBox: {
        width: '100%',
        height: 600,
        backgroundColor: 'white',
        // justifyContent: 'center',
        // alignItems: 'center',
        marginBottom: 70,
   },
   listItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#d9d9d9',
    padding: 20,
    alignContent: 'center',
   }
});