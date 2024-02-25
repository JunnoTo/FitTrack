import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212',
      padding: 20,
    },
    numberInputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    inputRow: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    numberInputTitle: {
      color: '#ccc',
      fontSize: 32,
      marginRight: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      marginTop: 5,
    },
    numberInputField: {
      fontSize: 30,
      color: '#ccc',
      width: 100,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#333',
      textAlign: 'center',
      marginHorizontal: 5,
    },
    textInput:{
      fontSize: 18,
      color: '#ccc',
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#333',
      padding: 10,
      marginTop: 10,
      marginBottom: 20,
    },
    saveEditButtonContainer:{
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    saveButton: {
      borderWidth: 2,
      backgroundColor: '#FFA726',
      padding: 8,
      borderRadius: 10,
    },
    editButton: {
      borderWidth: 2,
      backgroundColor: '#FF7043',
      padding: 8,
      borderRadius: 10,
    },
    buttonTitle: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 24,
      textAlign: 'center',
    },
    dateTitle: {
      color: '#FFA726',
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 5,
    },
    savedWorkoutContainer: {
      borderWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderColor: '#ccc',
      backgroundColor: '#1E1E1E',
      padding: 10,
      marginBottom: 10,
      borderRadius: 5,
    },
    selectedWorkoutContainer: {
      backgroundColor: 'grey', 
    },
    workoutText: {
      fontSize: 16,
      marginBottom: 5,
      color: '#ccc',
    },
    deleteButton: {
      color: '#FC4E19', 
      fontSize: 36,
      marginRight: 10,
    },
    tooltip: {
      width: '90%',
      backgroundColor: '#555',
      alignSelf: 'center',
      padding: 10,
      borderRadius: 5,
      position: 'absolute',
      bottom: 20,
      left: 40,
      right: 0,
      alignItems: 'center',
      zIndex: 999,
    },
    tooltipText: {
      color: '#fff',
      fontSize: 20,
    },
    chartButton:{
      borderWidth: 2,
      backgroundColor: '#FF7043',
      padding: 8,
      borderRadius: 10,
    }
  });