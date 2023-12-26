import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212',
    },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    weightInput: {
      fontSize: 26,
      color: '#ccc',
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#333',
      margin: 10,
      paddingHorizontal: 15,
      paddingVertical: 5,
    },
    saveButton: {
      borderWidth: 2,
      backgroundColor: '#FFA726',
      padding: 8,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
    },
    buttonTitle: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 24,
      textAlign: 'center',
    },
    entryContainer: {
      flex: 1,
      backgroundColor: '#1E1E1E',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#333'
    },
    entryTitle: {
      color: '#fff',
      fontSize: 26,
    },
    entryText: {
      color : '#fff',
      fontSize: 18,
    },
    entryItem: {
      width: 300,
      borderBottomWidth: 1,
      borderColor: '#ccc',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 8,
    },
  });