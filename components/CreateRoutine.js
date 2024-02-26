import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert, SafeAreaView } from 'react-native';
import styles from '../styles/createRoutine.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import exerciseData from '../exerciseData';
import { useRoute, useNavigation } from '@react-navigation/native'
import Icon from "react-native-vector-icons/Ionicons";

export default function CreateRoutineScreen({ route }) {
    const routes = useRoute();
    const navigation = useNavigation();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [routineName, setRoutineName] = useState('');
    const [customExercises, setCustomExercises] = useState([]);
    
    useEffect(() => {
      fetchCustomExercises();

      if(route.params && route.params.routineToUpdate) {
        const { name, exercises } = route.params.routineToUpdate;
        setRoutineName(name);
        setSelectedExercises(exercises);
      }
    }, []);

    const showRoutines = () => {
      navigation.navigate("Routines");
    }

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
  
    const handleSaveRoutine = async () => {
      try {
        if (routineName.trim() === '') {
          Alert.alert('Error', 'Please enter a name for your routine.');
          return;
        }
    
        const storedRoutines = await AsyncStorage.getItem('workoutRoutine');
        let existingRoutines = storedRoutines ? JSON.parse(storedRoutines) : [];
    
        if (!Array.isArray(existingRoutines)) {
          console.error('Data retrieved from AsyncStorage is not an array:', existingRoutines);
          existingRoutines = [];
        }
    
        const newRoutine = { name: routineName, exercises: selectedExercises };
    
        if (route.params && route.params.routineToUpdate) {
          existingRoutines = existingRoutines.map((routine) => {
            if (routine.name === route.params.routineToUpdate.name) {
              return newRoutine;
            }
            return routine;
          });
        } else {
          existingRoutines.push(newRoutine);
        }
    
        await AsyncStorage.setItem('workoutRoutine', JSON.stringify(existingRoutines));
        Alert.alert(
          'Routine Saved',
          'Your routine has been saved successfully.',
          [{ text: 'OK', onPress: () => showRoutines() }]
        );
      } catch (error) {
        console.error('Error saving routine:', error);
      }
    };

    const renderExercises = () => {
      const exercises = exerciseData[selectedCategory.toLowerCase()];

      return (
        <ScrollView>
          {exercises.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleExerciseSelection(item.name)}
            >
            <Text
              style={[
                styles.exerciseText,
                {
                  color: selectedExercises.includes(item.name) ? '#D37506' : 'white',
                },
              ]}
            >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    };

    const renderCustomExercises = () => {
      if (customExercises.length === 0) {
        return <Text style={styles.customText}>No custom exercises found</Text>;
      }
      return (
        <View style={styles.categoryContainer}>
          <TouchableOpacity onPress={() => handleCategoryToggle('Custom')}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryTitle}>Custom Exercises</Text>
              <Icon
                style={styles.arrowIcon}
                name={selectedCategory === 'Custom' ? 'chevron-up' : 'chevron-down'}
              />
            </View>
          </TouchableOpacity>
          {selectedCategory === 'Custom' && (
            <ScrollView>
              {customExercises.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleExerciseSelection(item.name)}
                >
                  <Text style={styles.exerciseText}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      );
    };

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
              <TextInput
                value={routineName}
                onChangeText={(text) => setRoutineName(text)}
                placeholder="Enter routine name"
                placeholderTextColor={'#fff'}
                style={styles.input}
            />
              {Object.keys(exerciseData).map((category) => (
              <View key={category} style={styles.categoryContainer}>
                <TouchableOpacity onPress={() => handleCategoryToggle(category)}>
                  <View style={styles.categoryHeader}>
                    <Text style={styles.categoryTitle}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Text>
                    <Icon style={styles.arrowIcon}
                    name={selectedCategory === category ? 'chevron-up' : 'chevron-down'}
                      />
                  </View>
                </TouchableOpacity>
                {selectedCategory === category && renderExercises()}
              </View>
                ))}
                {renderCustomExercises()}
                <View style={styles.selectedContainer}>
                <Text style={styles.selectedText}>Selected Exercises:</Text>
                {selectedExercises.map((exercise, index) => (
                    <Text key={index} style={styles.exerciseText}>
                        {exercise}
                    </Text>
                ))}
                </View>
                <TouchableOpacity onPress={handleSaveRoutine} style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Save Routine</Text>
                </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
  );
}

