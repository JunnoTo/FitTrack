import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#292929',
    },
    title: {
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 50,
    },
    arrowIcon: {
      fontSize: 30,
      color: '#D37506',
    },
    routineContainer: {
      borderWidth: 1,
      borderColor: '#333',
      backgroundColor: '#1a1a1a',
      borderRadius: 5,
      margin: 10,
      padding: 10,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    routineTitle: {
      fontSize: 16,
      color: '#D37506',
    },
    actionButtons: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    editIcon: {
      color: '#00ccff',
      fontSize: 25,
      marginRight: 10,
    },
    deleteIcon: {
      color: '#ff4d4d',
      fontSize: 25,
    },
    exerciseContainer: {
      marginTop: 10,
    },
    createButton: {
      backgroundColor: '#D37506',
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginTop: 20,
      alignSelf: 'center',
    },
    createButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    exercise:{
      fontSize: 16,
      color: 'white',
      marginLeft: 5,
    }
  });