import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212',
      padding: 20,
      justifyContent: 'center',
      alignContent: 'center',
      borderWidth: 3,
      borderColor: "#D37506",
    },
    quoteContent: {
      alignItems: 'center',
      marginHorizontal: 20,
    },
    quoteContentText: {
      color: '#ccc',
      fontSize: 16,
      marginBottom: 5,
      textAlign: 'center',
    },
    quoteAuthorText: {
      color: '#ccc',
      fontSize: 14,
      fontStyle: 'italic',
      textAlign: 'center',
    },
    underline: {
      backgroundColor: "#D37506",
      height: 1,
      width: '85%',
      marginTop: 10,
      alignSelf: 'center',
    },
  });