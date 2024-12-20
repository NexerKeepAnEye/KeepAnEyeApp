import { StyleSheet } from 'react-native';

export const AccordionStyle = StyleSheet.create({
  accordionContainer: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 10,
    alignItems: 'center',
    overflow: 'hidden',
  },
  accordionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: '5%',
    justifyContent: 'center',
    position: 'relative',
  },
  accordionHeader: {
    textAlign: 'center',
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  accordionDDL: {
    position: 'absolute',
    right: -1,
  },
  accordionListButton: {
    width: 65,
    height: 65,
    backgroundColor: '#d9d9d9',
    borderTopRightRadius: 10,
  },
  accordionListExpanded: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#d9d9d9',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  accordionListItem: {
    borderBottomWidth: 1,
    borderColor: '#d9d9d9',
  },
  accordionHeaderChanged: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export const DataTableStyle = StyleSheet.create({
  dataTableContainer: {
    width: '90%',
    marginTop: 20,
  },
  dataTableHeader: {
    backgroundColor: '#d9d9d9',
    justifyContent: 'space-evenly',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
  },
});
