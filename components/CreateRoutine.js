import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Alert, Touchable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import exerciseData from '../exerciseData';

export default function CreateRoutineScreen() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [routineName, setRoutineName] = useState('');
    const [customExercises, setCustomExercises] = useState([]);
    
    useEffect(() => {
      fetchCustomExercises();
    }, []);

    const fetchCustomExercises = async () => {
      try {
        const storedCustomExercises = await AsyncStorage.getItem('customExercises');
        if (storedCustomExercises) {
          const parsedCustomExercises = JSON.parse(storedCustomExercises);
          setCustomExercises(parsedCustomExercises);
        }
      } catch (error){
        console.error('Error fetching custom exercises: ', error);
      }
    };
  
    const handleCategoryToggle = (category) => {
      setSelectedCategory(category === selectedCategory ? null : category);
    };
  
    const handleExerciseSelection = (exercise) => {
      if (selectedExercises.includes(exercise)) {
        const updatedExercises = selectedExercises.filter((ex) => ex !== exercise);
        setSelectedExercises(updatedExercises);
      } else {
        setSelectedExercises([...selectedExercises, exercise]);
      }
    };
  
    const saveRoutine = async () => {
      try {
        const storedRoutines = await AsyncStorage.getItem('workoutRoutine');
        let existingRoutines = storedRoutines ? JSON.parse(storedRoutines) : [];
    
        if (!Array.isArray(existingRoutines)) {
          console.error('Data retrieved from AsyncStorage is not an array:', existingRoutines);
          existingRoutines = [];
        }
    
        const newRoutine = { name: routineName, exercises: selectedExercises };
        const updatedRoutines = [...existingRoutines, newRoutine];
    
        await AsyncStorage.setItem('workoutRoutine', JSON.stringify(updatedRoutines));
      } catch (error) {
        console.error('Error saving routine:', error);
      }
    };

    const renderExercises = () => {
      if (!selectedCategory) {
        return <Text>Select a category</Text>;
      }
  
    const exercises = exerciseData[selectedCategory.toLowerCase()];

    
      return (
        <View>
          <FlatList
            data={exercises}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleExerciseSelection(item.name)}>
                <Text style={{ textDecorationLine: selectedExercises.includes(item.name) ? 'line-through' : 'none' }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      );
    };
  
    const handleSaveRoutine = () => {
      if (!routineName) {
        Alert.alert('Routine Name Required', 'Please enter a name for your routine.');
        return;
      }
  
      saveRoutine();
      Alert.alert('Routine Saved', 'Your routine has been saved successfully.');
    };

    const renderCustomExercises = () => {
      if (customExercises.length === 0) {
        return <Text>No custom exercises found</Text>;
      }
      return (
        <View>
          <Text>Custom Exercises:</Text>
          {customExercises.map((exercise, index) => (
            <TouchableOpacity key={index} onPress={() => handleExerciseSelection(exercise.name)}>
              <Text>{exercise.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    };
  
    return (
      <View>
        <Text>Enter Routine Name:</Text>
        <TextInput
          value={routineName}
          onChangeText={(text) => setRoutineName(text)}
          placeholder="Enter routine name"
          style={{ borderWidth: 1, padding: 5, marginBottom: 10 }}
        />
        {Object.keys(exerciseData).map((category) => (
          <View key={category}>
            <TouchableOpacity onPress={() => handleCategoryToggle(category)}>
              <Text>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
            </TouchableOpacity>
            {selectedCategory === category && renderExercises()}
          </View>
        ))}
        {renderCustomExercises()}
          <Text>Selected Exercises:</Text>
          {selectedExercises.map((exercise, index) => (
            <Text key={index}>{exercise}</Text>
          ))}
        <TouchableOpacity onPress={handleSaveRoutine} style={{ backgroundColor: 'blue', padding: 10, margin: 10 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Save Routine</Text>
        </TouchableOpacity>
      </View>
    );
  }
