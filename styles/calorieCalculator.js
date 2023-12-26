import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#121212'
    },
    step1:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: 20,
        position: 'relative',
    },
    button:{
        width: '70%',
        height: '20%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 10,
        backgroundColor: '#1a1a1a',
        flexDirection: 'row',
    },
    selectedButtonM:{
        backgroundColor: '#a6d6f5',
    },
    selectedButtonF:{
        backgroundColor: '#fcc7fa',
    },
    nextButton:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText:{
        fontSize: 30,
    },
    icon:{
        fontSize: 50,
        color: '#D37506',
    },
    iconM:{
        fontSize: 50,
        color: '#133b57',
    },
    iconF:{
        fontSize: 50,
        color: '#593658',
    },
    stepContainer1:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 20,
        position: 'absolute',
        bottom: 0,
        left: 10,
        right: 10,
    },
    stepContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        position: 'absolute',
        bottom: 20,
        left: 10,
        right: 10,
    },
    step2:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    inputContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginVertical: 30,
    },
    inputField:{
        width: '70%',
        height: 100,
        textAlign: 'center',
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 40,
        color: 'white',
    },
    detailText:{
        fontSize: 40,
        color: 'white',
        marginHorizontal: 20,
    },
    inputContainer2:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 0,
        marginLeft: 14,
    },
    step3:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    activityButton:{
        backgroundColor: '#D37506',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        width: '95%',
      },
      activityButtonText:{
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
      },
      step3Title:{
        fontSize: 24,
        color: 'white',
        marginBottom: 14,
      },
      selectedActivityButton:{
        backgroundColor: '#663002',
      },
      step4:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
      },
      result:{
        fontSize: 34,
        color: 'white',
      },
      note:{
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#e6dbba',
        padding: 15,
        marginTop: 20,
      },
})