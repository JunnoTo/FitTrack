import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function CustomExercise() {
    const [ name, setName ] = useState('');
    const [ category, setCategory ] = useState(null);
    const [ notes, setNotes ] = useState('');
    const [ showDropdown, setShowDropdown ] = useState(false);
    const categories = ['Abs', 'Back', 'Biceps', 'Cardio', 'Chest', 'Legs', 'Shoulders', 'Triceps'];

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleSelectCategory = (item) => {
        setCategory(item);
        toggleDropdown();
    }

    const saveCustomExercise = async ( name, category, notes ) => {
        try{
            const existingWorkouts = await AsyncStorage.getItem('customExercises');
            let exercise = [];

            if(existingWorkouts) {
                exercise = JSON.parse(existingWorkouts);
            }
            const exerciseData = {
                name,
                category,
                notes,
            };
            exercise.push(exerciseData);
            await AsyncStorage.setItem('customExercises', JSON.stringify(exercise));

            alert('Exercise saved!')
        } catch (error) {
            console.log('Error saving exercise ', error);
        }
    };

    const handleSaveExercise = () => {
        if( name !== '' && category !== null){
        saveCustomExercise(name, category, notes);
        console.log ('Name: ', name, 'Category: ', category, 'Notes: ', notes);
        } else {
            alert("Please fill in name and category");
        }
    };

  return (
    <View>
        <Text>New Exercise</Text>

        <TextInput
            placeholder='Name'
            value={String(name)}
            onChangeText={(text) => setName(text) }
        />

        <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
            <Text>{category || 'Select a category'}</Text>
        </TouchableOpacity>
        <Modal
            visible={showDropdown}
            transparent={true}
            animationType='fade'
            onRequestClose={toggleDropdown}
        >
            <View style={styles.dropdownContainer}>
                {categories.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.dropdownItem}
                        onPress={() => handleSelectCategory(item)}
                    >
                        <Text>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </Modal>
        
        <TextInput
            placeholder='Notes (Optional)'
            value={String(notes)}
            onChangeText={(text) => setNotes(text)}
        />

        <TouchableOpacity
            onPress={handleSaveExercise}>
                <Text>Save Exercise</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    dropdownButton: {
      padding: 10,
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 5,
    },
    dropdownContainer: {
      backgroundColor: 'white',
      marginTop: 30,
      padding: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: 'black',
    },
    dropdownItem: {
      padding: 10,
    },
  });