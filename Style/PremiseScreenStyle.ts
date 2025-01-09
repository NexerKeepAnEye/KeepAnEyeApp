import { StyleSheet } from 'react-native';

export const PremiseScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#f4f5f7',
  },
  premiseCard: {
    width: '90%',
    height: '28%',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#d9d9d9',
    backgroundColor: '#fff',
    marginTop: '5%',
    padding: '5%',
  },
  cardHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#222',
    marginLeft: '1%',
    marginRight: '10%',
  },
  secondHeaders: {
    fontSize: 18,
    color: '#515151',
    marginLeft: '5%',
  },
  premiseInformation: {
    fontSize: 20,
    color: '#515151',
    fontWeight: 'bold',
    marginLeft: '5%',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
