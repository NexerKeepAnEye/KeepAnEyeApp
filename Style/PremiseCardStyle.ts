import { StyleSheet } from 'react-native';

export const premiseCardStyle = StyleSheet.create({
  card: {
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    elevation: 4, // Adds shadow for Android
    shadowColor: '#000', // Adds shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Adds shadow for iOS
    shadowOpacity: 0.2, // Adds shadow for iOS
    shadowRadius: 4, // Adds shadow for iOS
    backgroundColor: '#ffffff',
    minWidth: '90%',
    minHeight: '10%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  noTitle: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: '22%',
    marginTop: '4%',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});
