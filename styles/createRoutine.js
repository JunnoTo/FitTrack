import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#292929',
    },
    scrollView:{
      padding: 20,
    },
    categoryContainer: {
      borderWidth: 1,
      borderColor: '#333',
      backgroundColor: '#1a1a1a',
      borderRadius: 5,
      marginVertical: 5,
      padding: 10,
    },
    categoryHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    categoryTitle: {
      fontSize: 16,
      color: '#D37506',
    },
    arrowIcon: {
      fontSize: 30,
      color: '#D37506',
    },
    exerciseContainer: {
      marginTop: 10,
    },
    exercise: {
      fontSize: 16,
      color: 'white',
      marginLeft: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 5,
      padding: 8,
      marginBottom: 10,
      color: 'white',
    },
    exerciseText:{
      color: 'white',
    },
    title: {
      fontSize: 20,
      color: '#D37506',
      fontWeight: 'bold',
      marginTop: 20,
    },
    exerciseText: {
      color: 'white',
    },
    saveButton: {
      backgroundColor: '#D37506',
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginTop: 20,
      alignSelf: 'center',
    },
    saveButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    customText: {
      color: '#fff',
      fontSize: 16,
    },
    selectedContainer: {
      borderWidth: 1,
    },
    selectedText:{
      fontSize: 20,
      color: '#D37506',
      fontWeight: 'bold',
    },
  });