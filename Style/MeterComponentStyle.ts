import { StyleSheet } from 'react-native';

export const MeterComponentStyle = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: '12%',
        backgroundColor: '#fff',
    },
    listItem: {
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#d9d9d9',
        alignContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    iconContainer: {
        width: '10%',
        height: '100%',
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: '3%'
    },
    textStyleName: {
        fontSize: 17,
        color: '#222',
    },
    textStyleProductCode: {
        fontSize: 15,
        color: '#d3d3d3',
    },
   


 });