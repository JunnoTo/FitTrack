import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#121212',
    },
    titleContainer:{
      flex: 1,
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: '#333',
      alignItems:'center',
      justifyContent:'space-between',
      paddingHorizontal: 20,
    },
    title:{
      fontSize: 25,
      color: '#ccc',
    },
    icon:{
      color: "#D37506",
      fontSize: 40,
    },
  })