import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/core'

export default function CustomExercise({}) {
    const navigation = useNavigation()
    const [ name, setName ] = useState('');
    const [ category, setCategory ] = useState(null);
    const [ showDropdown, setShowDropdown ] = useState(false);
    const categories = ['Abs', 'Back', 'Biceps', 'Cardio', 'Chest', 'Legs', 'Shoulders', 'Triceps'];
    

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleSelectCategory = (item) => {
        setCategory(item);
        toggleDropdown();
    }

    const saveCustomExercise = async ( name, category) => {
        try{
            const existingWorkouts = await AsyncStorage.getItem('customExercises');
            let exercise = [];

            if(existingWorkouts) {
                exercise = JSON.parse(existingWorkouts);
            }

            const isNameUnique = exercise.every(exercise => exercise.name !== name);

            if (!isNameUnique){
                alert("Exercise with the same name already exists");
                return;
            }
            const exerciseData = {
                name,
                category,
            };
            exercise.push(exerciseData);
            await AsyncStorage.setItem('customExercises', JSON.stringify(exercise));

            if (category === 'Cardio') {
                navigation.navigate('TimeDistanceExercise' , {exercise: name})
            } else {
                navigation.navigate('WeightExercise', { exercise: name})
            }
        } catch (error) {
            console.log('Error saving exercise ', error);
        }
    };

    const handleSaveExercise = () => {
        if( name !== '' && category !== null){
        saveCustomExercise(name, category);
        console.log ('Name: ', name, 'Category: ', category);
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