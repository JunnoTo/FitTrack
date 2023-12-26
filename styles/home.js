import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212',
    },
    dateContainer: {
      alignItems: 'center',
    },
    date: {
      fontWeight: 'bold',
      fontSize: 18,
      color: '#fff',
      margin: 5,
    },
    workoutContainer: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: '#333',
      backgroundColor: '#1a1a1a', 
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      marginHorizontal: 10,
      marginBottom:10,
    },
    workoutTextContainer: {
      flex: 1,
      paddingRight: 10,
    },
    workoutTitle: {
      color: "#D37506",
      fontSize: 16,
      marginBottom: 5,
    },
    workoutDetails: {
      color: '#ccc', 
      fontSize: 14,
    },
    deleteButton: {
      padding: 10,
    },
    deleteIcon: {
      color: '#ff4d4d',
      fontSize: 25,
    },
    iconContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: '#1a1a1a',
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: '#333',
    },
    icon: {
      fontSize: 40,
      color: "#D37506",
    },
    arrowIcon: {
      fontSize: 30,
      color: "#D37506",
    },
    detailsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    workoutHeader:{
      alignItems: 'center',
    },
    workoutNotes:{
      color: '#ccc', 
      fontSize: 14,
      marginLeft: 50,
    },
    underline: {
      backgroundColor: "#D37506",
      height: 1,
      width: '85%',
      margin: 5,
      alignSelf: 'center',
    },
    footerSlot:{
      alignItems: 'center',
    },
    footerText: {
      color:'#ccc',
    },
    editIcon:{
      color: '#00ccff',
      fontSize: 25,
    },
    });