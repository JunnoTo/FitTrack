import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import styles from '../styles/customExercise.js'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/core'

export default function CustomExercise({}) {
    const navigation = useNavigation()
    const [ name, setName ] = useState('');
    const [ category, setCategory ] = useState(null);
    const [ showDropdown, setShowDropdown ] = useState(false);
    const categories = ['Abs', 'Back', 'Biceps', 'Cardio', 'Chest', 'Legs', 'Shoulders', 'Triceps'];
    
    const handleSelectCategory = (item) => {
        setCategory(item);
        setShowDropdown(false);
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
        } else {
            alert("Please fill in name and category");
        }
    };

  return (
    <View style={styles.container}>
        <TextInput
            style={styles.textInput}
            placeholder='Name'
            placeholderTextColor={'#ccc'}
            value={String(name)}
            onChangeText={(text) => setName(text) }
        />
        <View style={styles.dropdownParent}>
            <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setShowDropdown(!showDropdown)}
            >
            <Text style={styles.buttonText}>{category || 'Select a category'}</Text>
            </TouchableOpacity>
            {showDropdown && (
            <View style={styles.dropdownContainer}>
                {categories.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.dropdownItem}
                    onPress={() => handleSelectCategory(item)}
                >
                    <Text style={styles.dropdownText}>{item}</Text>
                </TouchableOpacity>
                ))}
            </View>
            )}
      </View>

        <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveExercise}>
                <Text style={styles.buttonTitle}>Save</Text>
        </TouchableOpacity>
    </View>
  )
    }
