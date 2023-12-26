import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/showRoutines.js'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import exerciseData from '../exerciseData';
import Icon from "react-native-vector-icons/Ionicons";


export default function RoutineScreen() {
  const navigation = useNavigation();
  const [savedRoutines, setSavedRoutines] = useState([]);
  const [showExercises, setShowExercises] = useState([]);

  useEffect(() => {
    fetchRoutines();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchRoutines();
    }, [])
  );

  const toggleShowExercises = (routineIndex) => {
    setShowExercises(prevShowExercises => {
      const updatedShowExercises = [...prevShowExercises];
      updatedShowExercises[routineIndex] = !updatedShowExercises[routineIndex];
      return updatedShowExercises;
    });
  };

  const createRoutine = () => {
    navigation.navigate('CreateRoutine');
  };

  const updateRoutine = (routine) => {
    navigation.navigate('CreateRoutine', { routineToUpdate: routine });
  };

  const isCardioExercise = (exerciseName) => {
    const cardioExercises = exerciseData.cardio.map((exercise) => exercise.name);
    return cardioExercises.includes(exerciseName);
  };

  const handleExercisePress = (exercise) => {
    if (exercise) {
      const isCardio = isCardioExercise(exercise);
      if (isCardio) {
        navigation.navigate('TimeDistanceExercise', { exercise: exercise });
      } else {
        navigation.navigate('WeightExercise', { exercise: exercise });
      }
    }
  };

  const fetchRoutines = async () => {
    try {
      const storedRoutines = await AsyncStorage.getItem('workoutRoutine');
      if (storedRoutines !== null) {
        const parsedRoutines = JSON.parse(storedRoutines);
        if (Array.isArray(parsedRoutines)) {
          setSavedRoutines(parsedRoutines);
          setShowExercises(new Array(parsedRoutines.length).fill(false));
        } else {
          console.error('Stored routines are not in the expected format:', parsedRoutines);
        }
      }
    } catch (error) {
      console.error('Error fetching routines:', error);
    }
  };

  const deleteRoutine = async (routineName, routineIndex) => {
    try {
      const updatedRoutines = savedRoutines.filter((routine, index) => index !== routineIndex);

      setSavedRoutines(updatedRoutines);
      setShowExercises(prevShowExercises => {
        const updatedShowExercises = [...prevShowExercises];
        updatedShowExercises.splice(routineIndex, 1);
        return updatedShowExercises;
      });

      await AsyncStorage.setItem('workoutRoutine', JSON.stringify(updatedRoutines));
    } catch (error) {
      console.error('Error deleting routine: ', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {savedRoutines.length > 0 ? (
        savedRoutines.map((routine, index) => (
          <View key={index} style={styles.routineContainer}>
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={() => toggleShowExercises(index)}>
                <Icon
                  name={showExercises[index] ? 'chevron-up' : 'chevron-down'}
                  style={styles.arrowIcon}
                />
              </TouchableOpacity>
              <Text style={styles.routineTitle}>{routine.name}</Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity onPress={() => updateRoutine(routine)}>
                  <Icon name="pencil" style={styles.editIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteRoutine(routine.name, index)}>
                  <Icon name="trash" style={styles.deleteIcon} />
                </TouchableOpacity>
              </View>
            </View>
            {showExercises[index] && routine.exercises.map((exercise, exerciseIndex) => (
              <View key={exerciseIndex} style={styles.exerciseContainer}>
                <TouchableOpacity onPress={() => handleExercisePress(exercise)}>
                  <Text style={styles.exercise}>{exercise}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))
      ) : (
        <Text style={styles.title}>No saved routines found.</Text>
      )}

      <TouchableOpacity style={styles.createButton} onPress={createRoutine}>
        <Text style={styles.createButtonText}>Create Routine</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

