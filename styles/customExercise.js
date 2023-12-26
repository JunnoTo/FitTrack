import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    dropdownButton: {
        marginTop: 20,
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width: '50%',
        alignItems: 'center',
    },
    dropdownContainer: {
        position: 'absolute',
        top: 60,
        left: '25%',
        backgroundColor: '#2e2e2e',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        width: '50%',
        zIndex: 999,
    },
    dropdownItem: {
        padding: 6,
        borderBottomWidth: 1,
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#fff',
        color: '#fff',
        fontSize: 22,
        margin: 10,
        marginTop: 90,
        padding: 5,
        marginHorizontal: 20,
    },
    dropdownParent: {
        position: 'relative',
        alignItems: 'center',
        flexDirection: 'column',
    },
    dropdownText:{
        color: '#fff',
        fontSize: 18,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    saveButton: {
        display: 'flex',
        borderWidth: 2,
        backgroundColor: '#FFA726',
        padding: 8,
        borderRadius: 10,
        marginHorizontal: 95,
        marginTop: 80,
    },
    buttonTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
      },
});